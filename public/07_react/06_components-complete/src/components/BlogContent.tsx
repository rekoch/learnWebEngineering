import ArticlePreview from "./ArticlePreview";
import CaptionedImage from "./CaptionedImage";
import ComparisonTable from "./ComparisonTable";
import { gardenRows, gardenSeries } from "../data/comparison";
import { cornerArticle, eveningArticle } from "../data/articles";

function BlogContent() {
  return (
    <>
        <section>
          <h3>Der erste Blick auf den Balkon</h3>
          <p>Ein freier Nachmittag genügt, um eine neue Idee auszuprobieren.</p>
          <CaptionedImage src="https://picsum.photos/seed/beispiel-2645/1200/800" alt="Beispielbild zum Stadtgarten" caption="Ein Eindruck aus dem kleinen Stadtgarten." />
          <p>Für den Anfang genügen Wasser, Licht und ein wenig Geduld.</p>
          <p>So entsteht Schritt für Schritt eine grüne Ecke.</p>
          <CaptionedImage src="https://picsum.photos/seed/beispiel-6963/1200/800" alt="Beispielbild zum Stadtgarten" caption="Ein Eindruck aus dem kleinen Stadtgarten." />
        </section>

        <section>
          <h3>Drei Ideen für wenig Platz</h3>
          <p>Ich probiere verschiedene Anordnungen aus und lasse Platz zum Sitzen.</p>
          <ArticlePreview article={cornerArticle} />
          <h4>Kräuter am Fenster</h4>
          <p>Für den Anfang genügen Wasser, Licht und ein wenig Geduld.</p>
          <CaptionedImage src="https://picsum.photos/seed/beispiel-4013/1200/800" alt="Kräuter im Stadtgarten" caption="Ein Eindruck aus dem kleinen Stadtgarten." />
          <h4>Blumen für den Sommer</h4>
          <p>Mit einer kleinen Kiste und etwas Erde beginnt das Experiment.</p>
          <CaptionedImage src="https://picsum.photos/seed/beispiel-2658/1200/800" alt="Blumen im Stadtgarten" caption="Ein Eindruck aus dem kleinen Stadtgarten." />
          <h4>Gemüse im Topf</h4>
          <p>Nach ein paar Tagen zeigt sich, was hier gut wächst.</p>
          <CaptionedImage src="https://picsum.photos/seed/beispiel-6022/1200/800" alt="Gemüse im Stadtgarten" caption="Ein Eindruck aus dem kleinen Stadtgarten." />
        </section>

        <section>
          <h3>Was im Alltag funktioniert</h3>
          <p>Nach ein paar Tagen zeigt sich, was hier gut wächst.</p>
          <ComparisonTable title="Beispielwerte im Vergleich" series={gardenSeries} rows={gardenRows} note="Beispielwerte (höher ist besser)" />
          <p>So entsteht Schritt für Schritt eine grüne Ecke.</p>
          <CaptionedImage src="https://picsum.photos/seed/beispiel-9100/1200/800" alt="Beispielbild zum Stadtgarten" caption="Eine Idee für den Balkon." />
        </section>

        <section>
          <h3>Kleine Helfer für grosse Pläne</h3>
          <ArticlePreview article={eveningArticle} />
          <p>Auf dem Balkon ist wenig Platz, doch für ein paar Pflanzen reicht es.</p>
          <CaptionedImage src="https://picsum.photos/seed/beispiel-6827/1200/800" alt="Eine Idee für den Balkon" caption="Eine Idee für den Balkon." />
          <p>Eine kleine Liste hilft mir, den Überblick zu behalten.</p>
        </section>

        <section>
          <h3>Einfach anfangen</h3>
          <p>Stadtgarten A</p>
          <CaptionedImage src="https://picsum.photos/seed/beispiel-9100/1200/800" alt="Eine Momentaufnahme aus dem Beispielprojekt" caption="Eine Momentaufnahme aus dem Beispielprojekt." />
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

    </>
  );
}

export default BlogContent;