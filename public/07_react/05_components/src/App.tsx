import { useState } from "react";
import ArticlePreview from "./components/ArticlePreview";
import { cornerArticle, eveningArticle, relatedArticles } from "./data/articles";
import "../../../03_javascript/03_buttonReactive/main.css";

function App() {
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
        <h2>
          Ein paar Töpfe, etwas Erde und eine freie Ecke: Mehr braucht es für
          dieses kleine Balkonprojekt nicht.
        </h2>
        <p>Ich beginne mit Kräutern und schaue, wie sich die Ecke entwickelt.</p>

        <section>
          <h3>Der erste Blick auf den Balkon</h3>
          <p>Ein freier Nachmittag genügt, um eine neue Idee auszuprobieren.</p>
          <figure className="my-0 mx-0">
            <img
              src="https://picsum.photos/seed/beispiel-2645/1200/800"
              alt="Beispielbild zum Stadtgarten"
            />
            <figcaption className="font-caption">
              Ein Eindruck aus dem kleinen Stadtgarten.
            </figcaption>
          </figure>
          <p>Für den Anfang genügen Wasser, Licht und ein wenig Geduld.</p>
          <p>So entsteht Schritt für Schritt eine grüne Ecke.</p>
          <figure className="my-0 mx-0">
            <img
              src="https://picsum.photos/seed/beispiel-6963/1200/800"
              alt="Beispielbild zum Stadtgarten"
            />
            <figcaption className="font-caption">
              Ein Eindruck aus dem kleinen Stadtgarten.
            </figcaption>
          </figure>
        </section>

        <section>
          <h3>Drei Ideen für wenig Platz</h3>
          <p>Ich probiere verschiedene Anordnungen aus und lasse Platz zum Sitzen.</p>
          <ArticlePreview article={cornerArticle} />
          <h4>Kräuter am Fenster</h4>
          <p>Für den Anfang genügen Wasser, Licht und ein wenig Geduld.</p>
          <figure className="my-0 mx-0">
            <img src="https://picsum.photos/seed/beispiel-4013/1200/800" alt="Kräuter im Stadtgarten" />
            <figcaption className="font-caption">Ein Eindruck aus dem kleinen Stadtgarten.</figcaption>
          </figure>
          <h4>Blumen für den Sommer</h4>
          <p>Mit einer kleinen Kiste und etwas Erde beginnt das Experiment.</p>
          <figure className="my-0 mx-0">
            <img src="https://picsum.photos/seed/beispiel-2658/1200/800" alt="Blumen im Stadtgarten" />
            <figcaption className="font-caption">Ein Eindruck aus dem kleinen Stadtgarten.</figcaption>
          </figure>
          <h4>Gemüse im Topf</h4>
          <p>Nach ein paar Tagen zeigt sich, was hier gut wächst.</p>
          <figure className="my-0 mx-0">
            <img src="https://picsum.photos/seed/beispiel-6022/1200/800" alt="Gemüse im Stadtgarten" />
            <figcaption className="font-caption">Ein Eindruck aus dem kleinen Stadtgarten.</figcaption>
          </figure>
        </section>

        <section>
          <h3>Was im Alltag funktioniert</h3>
          <p>Nach ein paar Tagen zeigt sich, was hier gut wächst.</p>
          <div data-table-name="benchmark">
            <h4 className="font-20 mb-s">Beispielwerte im Vergleich</h4>
            <div className="legend">
              <span className="legend-color-brown font-13 pl-s ml-xxs">Stadtgarten A</span>
              <span className="legend-color-yellow font-13 pl-s ml-xxs">Stadtgarten B</span>
              <span className="legend-color-red font-13 pl-s ml-xxs">Stadtgarten C</span>
            </div>
            <p className="font-16 font-weight-medium mb-xxs">Variante A</p>
            <p className="table-background-brown text-right mt-xxs mb-xxs pr-s py-xxs" data-table-column>720</p>
            <p className="table-background-yellow text-right mt-xxs mb-xxs pr-s py-xxs" data-table-column>789</p>
            <p className="table-background-red text-right mt-xxs mb-xxs pr-s py-xxs" data-table-column>1023</p>
            <p className="font-16 font-weight-medium mb-xxs">Variante B</p>
            <p className="table-background-brown text-right mt-xxs mb-xxs pr-s py-xxs" data-table-column>1916</p>
            <p className="table-background-yellow text-right mt-xxs mb-xxs pr-s py-xxs" data-table-column>1823</p>
            <p className="table-background-red text-right mt-xxs mb-xxs pr-s py-xxs" data-table-column>2979</p>
            <p className="font-13 font-color-light">Beispielwerte (höher ist besser)</p>
          </div>
          <p>So entsteht Schritt für Schritt eine grüne Ecke.</p>
          <figure className="my-0 mx-0">
            <img
              src="https://picsum.photos/seed/beispiel-9100/1200/800"
              alt="Beispielbild zum Stadtgarten"
            />
            <figcaption className="font-caption">Eine Idee für den Balkon.</figcaption>
          </figure>
        </section>

        <section>
          <h3>Kleine Helfer für grosse Pläne</h3>
          <ArticlePreview article={eveningArticle} />
          <p>Auf dem Balkon ist wenig Platz, doch für ein paar Pflanzen reicht es.</p>
          <figure className="my-0 mx-0">
            <img src="https://picsum.photos/seed/beispiel-6827/1200/800" alt="Eine Idee für den Balkon" />
            <figcaption className="font-caption">Eine Idee für den Balkon.</figcaption>
          </figure>
          <p>Eine kleine Liste hilft mir, den Überblick zu behalten.</p>
        </section>

        <section>
          <h3>Einfach anfangen</h3>
          <p>Stadtgarten A</p>
          <figure className="my-0 mx-0">
            <img src="https://picsum.photos/seed/beispiel-9100/1200/800" alt="Eine Momentaufnahme aus dem Beispielprojekt" />
            <figcaption className="font-caption">Eine Momentaufnahme aus dem Beispielprojekt.</figcaption>
          </figure>
          <p>Eine kleine Liste hilft mir, den Überblick zu behalten.</p>
          <p>Zum Schluss räume ich die Werkzeuge wieder weg.</p>
        </section>

        <section className="my-s">
          <h3>Fazit</h3>
          <p className="my-0">★★★★☆</p>
          <p className="mt-xxs mb-xs"><strong>Ein Projekt für zwischendurch</strong></p>
          <p className="my-0">
            Eine grüne Ecke muss nicht gross sein. Mir gefällt, wie schnell hier
            etwas Neues entsteht.
          </p>
          <p>Im nächsten Jahr probiere ich vielleicht eine andere Sorte aus.</p>
          <p>Für dieses Beispiel sind alle Angaben frei erfunden.</p>
          <div className="row align-items-start">
            <ul className="col-12 col-sm-6" aria-label="Vorteile">
              <li>vielseitig auf wenig Platz</li>
              <li>leicht zu pflegen</li>
              <li>wenig Zubehör nötig</li>
              <li>passt in den Alltag</li>
              <li>viele Gestaltungsideen</li>
            </ul>
            <ul className="col-12 col-sm-6" aria-label="Nachteile">
              <li>regelmässig giessen</li>
              <li>Sonne beachten</li>
              <li>wenig Platz für grosse Töpfe</li>
            </ul>
          </div>
        </section>

        <section className="border-top py-s px-s border-bottom row">
          <img
            src="https://picsum.photos/seed/beispiel-999/1200/800"
            alt="Gartenbox für den Stadtgarten"
            className="col-4"
          />
          <div className="col-8 d-flex flex-column">
            <p className="my-0 product-label">im Überblick</p>
            <p className="mt-xxs mb-0 font-13 font-color-highlight">Gartenbox</p>
            <p className="my-0 font-16"><strong>24.90</strong></p>
            <p className="my-0 font-16"><strong>Stadtgarten A</strong> Gartenbox</p>
            <p className="my-0 font-13 font-color-light">Klein, Grün</p>
            <p className="mt-xs font-13">★★★★☆ 4</p>
          </div>
        </section>

        <section className="mt-xl mb-xxl text-center">
          <button
            type="button"
            aria-pressed={liked}
            className={`mb-s font-small align-items-center text-center ${liked ? "" : "primary"}`}
            onClick={toggleLike}
          >
            {liked ? "Dieser Beitrag gefällt mir nicht mehr" : "Dieser Beitrag gefällt mir!"}
          </button>
          <p className="mt-0 mb-m font-small">
            <span>{likeCount}</span> Personen gefällt dieser Beitrag
          </p>
        </section>

        <section className="row-fixed-start-medium py-s border-top">
          <img
            src="https://picsum.photos/seed/beispiel-5041/96/96"
            alt="Nora Linden"
            className="col-1 profile"
          />
          <div className="col-12 col-sm-start-2 col-sm-end-11 d-flex flex-column">
            <p className="font-20 font-color-highlight mt-0 mb-xxs">Nora Linden</p>
            <p className="font-16 font-color-light my-0 mb-xxs">Redaktorin</p>
            <a className="font-16 font-hyperlink my-0" href="mailto:nora.linden@example.org">
              nora.linden@example.org
            </a>
            <p className="font-16 mt-xxs mb-0">
              Ich sammle gern einfache Ideen für den Alltag und schreibe über
              kleine Projekte.
            </p>
          </div>
          <div className="col-12 col-sm-start-auto col-sm-end-13 text-center">
            <button
              type="button"
              aria-pressed={followsAuthor}
              className={followsAuthor ? "" : "primary"}
              onClick={() => setFollowsAuthor(!followsAuthor)}
            >
              {followsAuthor ? "Autorin nicht mehr folgen" : "Autorin folgen"}
            </button>
          </div>
        </section>

        <section className="row-fixed-start-medium border-top py-s">
          <div className="col-12 col-sm-start-2 col-sm-end-11">
            <p className="font-20 font-color-highlight my-0">Balkongarten</p>
            <p className="font-16 font-color-light my-0">Folge Themen, die dich interessieren.</p>
          </div>
          <div className="col-12 col-sm-start-auto col-sm-end-13 text-center">
            <button
              type="button"
              aria-pressed={followsTopic}
              className={followsTopic ? "" : "primary"}
              onClick={() => setFollowsTopic(!followsTopic)}
            >
              {followsTopic ? "Thema entfolgen" : "Thema folgen"}
            </button>
          </div>
        </section>

        <section>
          <h3>Weitere Ideen für deinen Balkon</h3>
          {relatedArticles.map((article, index) => (
            <ArticlePreview
              key={article.id}
              article={article}
              withTopBorder={index === 0}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default App;