import type { ArticlePreviewData } from "../data/articles";

type ArticlePreviewProps = {
  article: ArticlePreviewData;
  withTopBorder?: boolean;
};

export default function ArticlePreview({
  article,
  withTopBorder = true,
}: ArticlePreviewProps) {
  return (
    <article
      className={`d-flex flex-row border-bottom py-s ${withTopBorder ? "border-top" : ""}`}
    >
      <img
        src={article.image.src}
        alt={article.image.alt}
        className="flex-image-aside mr-s"
      />
      <div className="d-flex flex-column">
        <p className="content-category my-0 font-13">{article.category}</p>
        <h4 className="mt-xxs mb-0 font-20 font-weight-regular">
          {article.title}
        </h4>
        <p className="mt-xxs mb-0 font-13">von {article.author}</p>
      </div>
    </article>
  );
}