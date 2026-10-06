import type { ReactNode } from "react";

type TopicFollowSectionProps = {
  topic: string;
  children: ReactNode;
};

export default function TopicFollowSection({ topic, children }: TopicFollowSectionProps) {
  return (
    <section className="row-fixed-start-medium border-top py-s" aria-label="Thema">
      <div className="col-12 col-sm-start-2 col-sm-end-11">
        <p className="font-20 font-color-highlight my-0">{topic}</p>
        <p className="font-16 font-color-light my-0">Folge Themen, die dich interessieren.</p>
      </div>
      <div className="col-12 col-sm-start-auto col-sm-end-13 text-center">{children}</div>
    </section>
  );
}