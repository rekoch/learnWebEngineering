import type { ArticlePreviewData } from "../data/articles";
import SummaryCard from "./SummaryCard";

type ArticlePreviewProps = {
  article: ArticlePreviewData;
  withTopBorder?: boolean;
};

export default function ArticlePreview({
  article,
  withTopBorder = true,
}: ArticlePreviewProps) {
  return (
    <article>
      <SummaryCard
        image={article.image}
        className={withTopBorder ? "border-top" : ""}
      >
        <p className="content-category my-0 font-13">{article.category}</p>
        <h4 className="mt-xxs mb-0 font-20 font-weight-regular">
          {article.title}
        </h4>
        <p className="mt-xxs mb-0 font-13">von {article.author}</p>
      </SummaryCard>
    </article>
  );
}