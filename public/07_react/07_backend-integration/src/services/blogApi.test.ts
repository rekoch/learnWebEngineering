import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { loadInteractions, toggleAuthorFollow, toggleLike, toggleTopicFollow } from "./blogApi";

const context = { userId: "1", blogPageId: "2", authorEmail: "nora+test@example.org", topicName: "Kräuter & Balkon" };
const fetchMock = vi.fn<typeof fetch>();
const response = (data: object) => new Response(JSON.stringify(data), { status: 200 });

beforeEach(() => { fetchMock.mockReset(); vi.stubGlobal("fetch", fetchMock); });
afterEach(() => vi.unstubAllGlobals());

describe("blogApi", () => {
  it("loads the existing four backend contracts with encoded identifiers", async () => {
    fetchMock
      .mockResolvedValueOnce(response({ likeCount: 7 }))
      .mockResolvedValueOnce(response({ liked: true }))
      .mockResolvedValueOnce(response({ isFollowedAuthor: false }))
      .mockResolvedValueOnce(response({ isFollowedTopic: true }));
    const signal = new AbortController().signal;
    expect(await loadInteractions(context, signal)).toEqual({ liked: true, likeCount: 7, followsAuthor: false, followsTopic: true });
    const paths = fetchMock.mock.calls.map(([url]) => new URL(String(url)).pathname);
    expect(paths).toEqual([
      "/likes/2", "/likes/state/2/user/1",
      "/author-follow/nora%2Btest%40example.org/user/1",
      "/topic-follow/Kr%C3%A4uter%20%26%20Balkon/user/1",
    ]);
    for (const [, options] of fetchMock.mock.calls) expect(options?.signal).toBe(signal);
  });

  it.each([false, true])("rechecks the server state before like mutation (%s)", async liked => {
    fetchMock.mockResolvedValueOnce(response({ liked })).mockResolvedValueOnce(response({ changes: 1 }));
    await toggleLike(context, new AbortController().signal);
    expect(fetchMock.mock.calls[1][1]).toMatchObject({
      method: liked ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogPageId: "2", userId: "1" }),
    });
  });

  it.each([false, true])("uses the author and topic follow contracts (%s)", async following => {
    fetchMock.mockResolvedValueOnce(response({ isFollowedAuthor: following })).mockResolvedValueOnce(response({ changes: 1 }));
    await toggleAuthorFollow(context, new AbortController().signal);
    expect(fetchMock.mock.calls[1][1]?.method).toBe(following ? "DELETE" : "POST");
    expect(fetchMock.mock.calls[1][1]?.body).toBe(JSON.stringify({ authorEmail: context.authorEmail, userId: "1" }));
    fetchMock.mockReset();
    fetchMock.mockResolvedValueOnce(response({ isFollowedTopic: following })).mockResolvedValueOnce(response({ changes: 1 }));
    await toggleTopicFollow(context, new AbortController().signal);
    expect(fetchMock.mock.calls[1][1]?.method).toBe(following ? "DELETE" : "POST");
    expect(fetchMock.mock.calls[1][1]?.body).toBe(JSON.stringify({ topicName: context.topicName, userId: "1" }));
  });

  it("reports HTTP failures without treating them as successful data", async () => {
    fetchMock.mockResolvedValue(new Response("Fehler", { status: 500 }));
    await expect(loadInteractions(context, new AbortController().signal)).rejects.toThrow("HTTP 500");
  });

  it("rejects malformed backend state instead of displaying it", async () => {
    fetchMock
      .mockResolvedValueOnce(response({ likeCount: "7" }))
      .mockResolvedValueOnce(response({ liked: true }))
      .mockResolvedValueOnce(response({ isFollowedAuthor: false }))
      .mockResolvedValueOnce(response({ isFollowedTopic: true }));
    await expect(loadInteractions(context, new AbortController().signal)).rejects.toThrow("ungültige Zustandsdaten");
  });
});