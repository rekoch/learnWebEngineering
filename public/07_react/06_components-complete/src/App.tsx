import ArticlePreview from "./components/ArticlePreview";
import BlogContent from "./components/BlogContent";
import BlogInteractions from "./components/BlogInteractions";
import ProductSummary from "./components/ProductSummary";
import { relatedArticles } from "./data/articles";
import { product } from "./data/page";

export default function App() {
  return (
    <>
      <iframe
        src="https://www.youtube.com/embed/2DrxMxk-5Bk"
        title="Musikalische Überraschung"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <main className="content-max-width">
        <p className="content-category">Beispielbeitrag</p>
        <h1>Ein kleiner Garten mitten in der Stadt</h1>
        <h2>Ein paar Töpfe, etwas Erde und eine freie Ecke: Mehr braucht es für dieses kleine Balkonprojekt nicht.</h2>
        <p>Ich beginne mit Kräutern und schaue, wie sich die Ecke entwickelt.</p>
        <BlogContent />
        <ProductSummary product={product} />
        <BlogInteractions />
        <section>
          <h3>Weitere Ideen für deinen Balkon</h3>
          {relatedArticles.map((article, index) => (
            <ArticlePreview key={article.id} article={article} withTopBorder={index === 0} />
          ))}
        </section>
      </main>
    </>
  );
}