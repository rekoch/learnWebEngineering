const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export type BlogContext = {
  userId: string;
  blogPageId: string;
  authorEmail: string;
  topicName: string;
};

export type InteractionData = {
  liked: boolean;
  likeCount: number;
  followsAuthor: boolean;
  followsTopic: boolean;
};

async function request<Result>(path: string, signal: AbortSignal, method = "GET", body?: object): Promise<Result> {
  const response = await fetch(new URL(path, `${apiUrl.replace(/\/$/, "")}/`), {
    method,
    signal,
    ...(body && { headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }),
  });
  if (!response.ok) throw new Error(`Backend-Anfrage fehlgeschlagen (HTTP ${response.status}).`);
  return response.json();
}

function paths(context: BlogContext) {
  const user = encodeURIComponent(context.userId);
  const page = encodeURIComponent(context.blogPageId);
  return {
    likes: `likes/${page}`,
    likeState: `likes/state/${page}/user/${user}`,
    author: `author-follow/${encodeURIComponent(context.authorEmail)}/user/${user}`,
    topic: `topic-follow/${encodeURIComponent(context.topicName)}/user/${user}`,
  };
}

export async function loadInteractions(context: BlogContext, signal: AbortSignal): Promise<InteractionData> {
  const path = paths(context);
  const [count, like, author, topic] = await Promise.all([
    request<{ likeCount: number }>(path.likes, signal),
    request<{ liked: boolean }>(path.likeState, signal),
    request<{ isFollowedAuthor: boolean }>(path.author, signal),
    request<{ isFollowedTopic: boolean }>(path.topic, signal),
  ]);
  if (
    !Number.isInteger(count.likeCount) || count.likeCount < 0 ||
    typeof like.liked !== "boolean" || typeof author.isFollowedAuthor !== "boolean" ||
    typeof topic.isFollowedTopic !== "boolean"
  ) throw new Error("Das Backend hat ungültige Zustandsdaten geliefert.");
  return {
    liked: like.liked,
    likeCount: count.likeCount,
    followsAuthor: author.isFollowedAuthor,
    followsTopic: topic.isFollowedTopic,
  };
}

export async function toggleLike(context: BlogContext, signal: AbortSignal) {
  const path = paths(context);
  const state = await request<{ liked: boolean }>(path.likeState, signal);
  if (typeof state.liked !== "boolean") throw new Error("Ungültiger Like-Zustand.");
  await request(path.likes, signal, state.liked ? "DELETE" : "POST", {
    blogPageId: context.blogPageId, userId: context.userId,
  });
}

export async function toggleAuthorFollow(context: BlogContext, signal: AbortSignal) {
  const path = paths(context).author;
  const state = await request<{ isFollowedAuthor: boolean }>(path, signal);
  if (typeof state.isFollowedAuthor !== "boolean") throw new Error("Ungültiger Autoren-Follow-Zustand.");
  await request(path, signal, state.isFollowedAuthor ? "DELETE" : "POST", {
    authorEmail: context.authorEmail, userId: context.userId,
  });
}

export async function toggleTopicFollow(context: BlogContext, signal: AbortSignal) {
  const path = paths(context).topic;
  const state = await request<{ isFollowedTopic: boolean }>(path, signal);
  if (typeof state.isFollowedTopic !== "boolean") throw new Error("Ungültiger Themen-Follow-Zustand.");
  await request(path, signal, state.isFollowedTopic ? "DELETE" : "POST", {
    topicName: context.topicName, userId: context.userId,
  });
}