import { useState } from "react";
import { author, topic } from "../data/page";
import AuthorProfile from "./AuthorProfile";
import LikeSection from "./LikeSection";
import ToggleButton from "./ToggleButton";
import TopicFollowSection from "./TopicFollowSection";

export default function BlogInteractions() {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(59);
  const [followsAuthor, setFollowsAuthor] = useState(false);
  const [followsTopic, setFollowsTopic] = useState(false);

  function toggleLike() {
    setLiked(!liked);
    setLikeCount(likeCount + (liked ? -1 : 1));
  }

  return (
    <>
      <LikeSection liked={liked} count={likeCount} onToggle={toggleLike} />
      <AuthorProfile author={author}>
        <ToggleButton
          active={followsAuthor}
          activeText="Autorin nicht mehr folgen"
          inactiveText="Autorin folgen"
          onToggle={() => setFollowsAuthor(!followsAuthor)}
        />
      </AuthorProfile>
      <TopicFollowSection topic={topic}>
        <ToggleButton
          active={followsTopic}
          activeText="Thema entfolgen"
          inactiveText="Thema folgen"
          onToggle={() => setFollowsTopic(!followsTopic)}
        />
      </TopicFollowSection>
    </>
  );
}