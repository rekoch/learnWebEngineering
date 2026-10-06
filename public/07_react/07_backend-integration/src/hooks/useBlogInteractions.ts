import { useEffect, useRef, useState } from "react";
import { loadInteractions, toggleAuthorFollow, toggleLike, toggleTopicFollow } from "../services/blogApi";
import type { BlogContext, InteractionData } from "../services/blogApi";

type RequestState = {
  data: InteractionData | null;
  pending: boolean;
  error: string;
};

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Die Backend-Anfrage ist fehlgeschlagen.";
}

export default function useBlogInteractions({ userId, blogPageId, authorEmail, topicName }: BlogContext) {
  const [state, setState] = useState<RequestState>({ data: null, pending: true, error: "" });
  const controllerRef = useRef<AbortController | null>(null);
  const busyRef = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    controllerRef.current = controller;
    busyRef.current = true;
    loadInteractions({ userId, blogPageId, authorEmail, topicName }, controller.signal)
      .then(data => {
        if (!controller.signal.aborted) setState({ data, pending: false, error: "" });
      })
      .catch(error => {
        if (!controller.signal.aborted) setState({ data: null, pending: false, error: errorMessage(error) });
      })
      .finally(() => {
        if (!controller.signal.aborted) busyRef.current = false;
      });
    return () => controller.abort();
  }, [userId, blogPageId, authorEmail, topicName]);

  async function runRequest(action?: (signal: AbortSignal) => Promise<void>) {
    const controller = controllerRef.current;
    if (!controller || controller.signal.aborted || busyRef.current) return;
    busyRef.current = true;
    setState(previous => ({ ...previous, pending: true, error: "" }));
    try {
      if (action) await action(controller.signal);
      const data = await loadInteractions({ userId, blogPageId, authorEmail, topicName }, controller.signal);
      if (!controller.signal.aborted) setState({ data, pending: false, error: "" });
    } catch (error) {
      if (!controller.signal.aborted) {
        setState(previous => ({ ...previous, pending: false, error: errorMessage(error) }));
      }
    } finally {
      if (!controller.signal.aborted) busyRef.current = false;
    }
  }

  const context = { userId, blogPageId, authorEmail, topicName };
  return {
    ...state,
    reload: () => void runRequest(),
    toggleLike: () => { if (state.data) void runRequest(signal => toggleLike(context, signal)); },
    toggleAuthor: () => { if (state.data) void runRequest(signal => toggleAuthorFollow(context, signal)); },
    toggleTopic: () => { if (state.data) void runRequest(signal => toggleTopicFollow(context, signal)); },
  };
}