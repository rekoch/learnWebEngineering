import type { ReactNode } from "react";

type AuthorProfileProps = {
  author: {
    name: string;
    email: string;
    role: string;
    imageSrc: string;
    description: string;
  };
  children: ReactNode;
};

export default function AuthorProfile({ author, children }: AuthorProfileProps) {
  return (
    <section className="row-fixed-start-medium py-s border-top" aria-label="Autorin">
      <img src={author.imageSrc} alt={author.name} className="col-1 profile" />
      <div className="col-12 col-sm-start-2 col-sm-end-11 d-flex flex-column">
        <p className="font-20 font-color-highlight mt-0 mb-xxs">{author.name}</p>
        <p className="font-16 font-color-light my-0 mb-xxs">{author.role}</p>
        <a className="font-16 font-hyperlink my-0" href={`mailto:${author.email}`}>{author.email}</a>
        <p className="font-16 mt-xxs mb-0">{author.description}</p>
      </div>
      <div className="col-12 col-sm-start-auto col-sm-end-13 text-center">{children}</div>
    </section>
  );
}