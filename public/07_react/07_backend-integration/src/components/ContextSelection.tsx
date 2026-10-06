import { useState } from "react";
import type { SubmitEvent } from "react";
import "./ContextSelection.css";

type ContextSelectionProps = {
  userId: string;
  blogPageId: string;
  onSelect: (selection: { userId: string; blogPageId: string }) => void;
};

export default function ContextSelection({ userId, blogPageId, onSelect }: ContextSelectionProps) {
  const [userInput, setUserInput] = useState(userId);
  const [pageInput, setPageInput] = useState(blogPageId);
  const [error, setError] = useState("");

  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (![userInput, pageInput].every(value => Number.isSafeInteger(Number(value)) && Number(value) > 0)) {
      setError("Die IDs müssen positive ganze Zahlen sein.");
      return;
    }
    setError("");
    onSelect({ userId: String(Number(userInput)), blogPageId: String(Number(pageInput)) });
  }

  return (
    <form className="context-selection" aria-label="Daten simulieren" onSubmit={submit}>
      <label>Benutzer-ID
        <input type="number" min="1" step="1" required value={userInput} onChange={event => setUserInput(event.target.value)} />
      </label>
      <label>Blogseiten-ID
        <input type="number" min="1" step="1" required value={pageInput} onChange={event => setPageInput(event.target.value)} />
      </label>
      <button type="submit">Daten simulieren</button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}