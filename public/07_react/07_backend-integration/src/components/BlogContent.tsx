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
          <p>Im Frühling zeigen die ersten Blüten, was auf wenig Platz wachsen kann.</p>
            <CaptionedImage src="https://picsum.photos/id/82/1200/800" alt="Ein Zweig mit rosa Blüten." caption="Rosa Blüten kündigen den Frühling an." />
          <p>Für den Anfang genügen Wasser, Licht und ein wenig Geduld.</p>
          <p>Auch ein kleiner Garten verändert sich mit den Jahreszeiten.</p>
            <CaptionedImage src="https://picsum.photos/id/995/1200/800" alt="Bunt gefärbte Blätter liegen auf dem Boden." caption="Bunte Blätter zeigen den Wechsel der Jahreszeit." />
        </section>

        <section>
          <h3>Drei Ideen für wenig Platz</h3>
          <p>Ich probiere verschiedene Anordnungen aus und lasse Platz zum Sitzen.</p>
          <ArticlePreview article={cornerArticle} />
          <h4>Eine Weinrebe am Balkon</h4>
          <p>Mit etwas Sonne reifen an den Ranken rote Trauben.</p>
              <p>Im Frühling zeigen die ersten Blüten, was auf wenig Platz wachsen kann.</p>
          <h4>Blumen für den Sommer</h4>
          <p>Ein blühender Zweig braucht nur einen passenden Platz und etwas Pflege.</p>
            <CaptionedImage src="https://picsum.photos/id/82/1200/800" alt="Ein Zweig mit rosa Blüten." caption="Rosa Blüten an einem Zweig." />
          <h4>Bohnen aus dem Topf</h4>
          <p>Wenn die Hülsen reif sind, pflücke ich die Bohnen direkt vom Balkon.</p>
            <CaptionedImage src="https://picsum.photos/id/627/1200/800" alt="Frisch gepflückte Bohnen." caption="Die Bohnen sind frisch geerntet." />
        </section>

        <section>
          <h3>Was im Alltag funktioniert</h3>
          <p>Ich beobachte, welche Pflanzen im Alltag wenig Platz brauchen.</p>
          <ComparisonTable title="Beispielwerte im Vergleich" series={gardenSeries} rows={gardenRows} note="Beispielwerte (höher ist besser)" />
          <p>Im Herbst zeigen die Blätter, wie sich der Garten verändert.</p>
            <CaptionedImage src="https://picsum.photos/id/995/1200/800" alt="Bunt gefärbte Blätter liegen auf dem Boden." caption="Bunte Blätter markieren den Wechsel der Jahreszeit." />
              <p>Ein blühender Zweig braucht nur einen passenden Platz und etwas Pflege.</p>

        <section>
          <h3>Trauben ernten und teilen</h3>
          <ArticlePreview article={eveningArticle} />
          <p>Nach dem Regen entdecke ich manchmal einen kleinen Pilz zwischen den Töpfen.</p>
            <CaptionedImage src="https://picsum.photos/id/977/1200/800" alt="Ein kleiner Pilz im Garten." caption="Nach dem Regen zeigt sich ein kleiner Pilz." />
          <p>Eine kleine Liste hilft mir, den Überblick zu behalten.</p>
        </section>

        <section>
              <p>Im Herbst zeigen die Blätter, wie sich der Garten verändert.</p>
          <p>Die erste Traubenernte passt in zwei Hände.</p>
            <CaptionedImage src="https://picsum.photos/id/674/1200/800" alt="Frisch geerntete Trauben in zwei Händen." caption="Die erste Traubenernte passt in zwei Hände." />
          <p>Eine kleine Liste hilft mir, den Überblick zu behalten.</p>
          <p>Zum Schluss räume ich die Werkzeuge wieder weg.</p>
        </section>

              <p>Nach dem Regen entdecke ich manchmal einen kleinen Pilz zwischen den Töpfen.</p>
          <h3>Fazit</h3>
          <p className="mt-xxs mb-xs"><strong>Ein Projekt für zwischendurch</strong></p>
          <p className="my-0">
            Eine grüne Ecke muss nicht gross sein. Mir gefällt, wie schnell hier
            etwas Neues entsteht.
          </p>
              <h3>Die erste Ernte</h3>
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