import { author, topic } from "../data/page";
import useBlogInteractions from "../hooks/useBlogInteractions";
import AuthorProfile from "./AuthorProfile";
import LikeSection from "./LikeSection";
import ToggleButton from "./ToggleButton";
import TopicFollowSection from "./TopicFollowSection";

type BlogInteractionsProps = {
  userId: string;
  blogPageId: string;
};

export default function BlogInteractions({ userId, blogPageId }: BlogInteractionsProps) {
  const { data, pending, error, reload, toggleLike, toggleAuthor, toggleTopic } = useBlogInteractions({
    userId, blogPageId, authorEmail: author.email, topicName: topic,
  });
  const disabled = pending || !data;

  return (
    <div aria-busy={pending}>
      {pending && <p role="status">Backend-Daten werden geladen …</p>}
      {error && (
        <div role="alert">
          <p>{error}</p>
          <button type="button" disabled={pending} onClick={reload}>Erneut laden</button>
        </div>
      )}
      {data && <LikeSection liked={data.liked} count={data.likeCount} onToggle={toggleLike} disabled={disabled} />}
      <AuthorProfile author={author}>
        <ToggleButton
          active={data?.followsAuthor ?? false}
          activeText="Autorin nicht mehr folgen"
          inactiveText="Autorin folgen"
          onToggle={toggleAuthor}
          disabled={disabled}
        />
      </AuthorProfile>
      <TopicFollowSection topic={topic}>
        <ToggleButton
          active={data?.followsTopic ?? false}
          activeText="Thema entfolgen"
          inactiveText="Thema folgen"
          onToggle={toggleTopic}
          disabled={disabled}
        />
      </TopicFollowSection>
    </div>
  );
}