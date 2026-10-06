# Komponenten mit React

Unsere Blogseite reagiert inzwischen auf Klicks. Allerdings stehen der gesamte Inhalt und alle Buttons noch in `App`. Auch die Artikelvorschauen haben wir mehrmals als fast gleiches JSX geschrieben. Jetzt teilen wir die Seite in wiederverwendbare Bausteine auf.

Ausgangspunkt ist dein Endstand aus [Buttons mit React](./04_buttons.md). Du entwickelst dasselbe Projekt weiter. Zuerst überlegen wir, welche Grenzen sinnvoll sind. Danach setzen wir einen dieser Schnitte um: Die Artikelvorschauen werden zu einer eigenen Komponente mit einer gemeinsamen Datenstruktur.

## Was ist eine Komponente?

Eine Komponente beschreibt einen Teil der Oberfläche. In React schreiben wir dafür eine Funktion, die JSX zurückgibt. `App` ist also bereits eine Komponente. Neu ist, dass sie weitere, selbst geschriebene Komponenten verwendet.

Ein kleines Beispiel:

```tsx
type SectionTitleProps = {
  title: string;
};

function SectionTitle({ title }: SectionTitleProps) {
  return <h3>{title}</h3>;
}
```

In `App` könnten wir sie so einsetzen:

```tsx
<SectionTitle title="Drei Ideen für wenig Platz" />
<SectionTitle title="Einfach anfangen" />
```

`SectionTitle` ist die gemeinsame Beschreibung. Die beiden Verwendungen sind zwei Instanzen mit unterschiedlichen Eingaben. React rendert daraus zwei Überschriften; es erzeugt kein zusätzliches HTML-Element namens `<SectionTitle>`.

- Komponentennamen beginnen mit einem Grossbuchstaben. `<section>` bezeichnet ein HTML-Element, `<SectionTitle>` unsere Funktion.
- Die Eingaben heissen **Props**. Hier ist `title` eine Prop vom Typ `string`.
- `{ title }` im Funktionsparameter ist Destructuring: Wir holen `title` aus dem übergebenen Props-Objekt.
- `{title}` im JSX setzt den übergebenen Wert in die Ausgabe ein.

Wir verwenden die Komponente als `<SectionTitle ... />`, nicht als normalen Funktionsaufruf `SectionTitle(...)`. Definiere Komponenten ausserhalb von `App`, später am besten in eigenen Dateien. So bleibt ihre Definition über Renderdurchläufe hinweg dieselbe.

Props sind Eingaben und werden von der empfangenden Komponente nicht verändert. Soll sie eine Aktion auslösen, kann die übergeordnete Komponente ihr eine Funktion als Prop übergeben, beispielsweise `onToggle`. State beschreibt dagegen Werte, die sich während der Verwendung ändern. Jede Instanz einer Komponente mit eigenem State besitzt ihren eigenen Zustand.

Für eine einzelne Überschrift müssen wir nicht wirklich eine Komponente anlegen. Das Beispiel zeigt nur den Mechanismus. Ein sinnvoller Baustein braucht eine erkennbare Aufgabe, nicht bloss eine eigene Datei.

## Wo könnten wir unsere Seite aufteilen?

Schau dir `App.tsx` an, bevor du etwas verschiebst. Suche wiederholtes JSX, zusammengehörige Inhalte und Bereiche mit einer eigenen Aufgabe.

| Bereich | Mögliche Komponente | Aufgabe |
| --- | --- | --- |
| Die fünf kleinen Artikelvorschauen | `ArticlePreview` | Bild, Rubrik, Titel und Autorenzeile darstellen |
| Bilder mit Bildlegende | `CaptionedImage` | Ein Bild mit Alternativtext und Legende darstellen |
| Like-Bereich | `LikeSection` | Like-Auswahl und Zähler zusammenhalten |
| Autorinnenbereich | `AuthorProfile` | Die Informationen zur Autorin zusammenstellen |
| Themenbereich | `TopicFollowSection` | Thema und Follow-Aktion zusammenstellen |
| Die beiden Follow-Buttons | `ToggleButton` | Auswahl, Texte und Klickaktion anzeigen bzw. weitergeben |

Das sind Möglichkeiten, keine Liste, die wir sofort vollständig umsetzen müssen. Auch ein einmal verwendeter Bereich kann eine gute Komponente sein, wenn er eine klare Aufgabe kapselt. Umgekehrt muss nicht jedes `<p>` eine Komponente werden.

Überlege für jeden Vorschlag:

1. Welche Aufgabe hat der Baustein? Kannst du sie in einem Satz benennen?
2. Welche Eingaben braucht er? Welche Informationen braucht er ausdrücklich nicht?
3. Woher kommen die Daten und wer entscheidet, was beim Klick passiert?
4. Könnte derselbe Baustein an einer anderen Stelle mit anderen Daten funktionieren?

## «Je dümmer, desto wiederverwendbarer»

Mit «dumm» meinen wir hier: Eine Komponente weiss möglichst wenig über den konkreten Einsatzort. Sie bekommt die benötigten Werte und stellt sie dar. Sie muss nicht wissen, auf welcher Seite sie steht, woher die Daten kommen oder wie ein Backend funktioniert.

Eine `ArticlePreview` braucht beispielsweise Titel, Rubrik, Autorenname und Bild. Sie braucht weder den kompletten Blogbeitrag noch dessen Like-State. Sie sucht auch nicht selbst in einer globalen Artikelliste nach ihren Daten.

Bei einem generischen `ToggleButton` könnten der aktuelle Zustand, die beiden Beschriftungen und ein `onToggle`-Callback als Props ankommen. Ob damit einer Autorin oder einem Thema gefolgt wird, entscheidet der Aufrufer. Der Button zeigt die Auswahl an und meldet den Klick zurück.

Die Richtung ist also: **Daten nach unten, Aktionen über Callbacks zurück nach oben.**

Das ist eine Faustregel, kein Verbot von State oder Fachwissen. Ein `LikeSection` darf einen lokalen Like-Zustand verwalten; ein `AuthorProfile` darf eine Autorin kennen. State gehört dorthin, wo er gebraucht wird. Müssen mehrere Komponenten denselben Zustand verwenden, liegt er in einem gemeinsamen Elternbaustein. Wir versuchen nicht, jede Komponente um jeden Preis vollständig generisch zu machen.

## Autorin, Person oder nur Bild und Text?

Am Autorinnenbereich sieht man, wie die gewählte Grenze das nötige Wissen verändert:

| Schnitt | Was die Komponente weiss | Wo sie wiederverwendbar ist |
| --- | --- | --- |
| `AuthorProfile` | Autorin, redaktionelle Rolle, Kontakt und Follow-Aktion | Bei anderen Blogbeiträgen |
| `PersonProfile` | Eine Person mit Namen, Bild und Beschreibung | Auch bei Teammitgliedern oder Kontakten |
| `ImageText` | Ein Bild und daneben übergebener Inhalt | Auch bei Produkten oder Themen; nicht nur bei Personen |

Eine `AuthorProfile` könnte die Follow-Aktion und die Autoreninformationen zusammenstellen. Eine darunterliegende `PersonProfile` müsste nicht mehr wissen, dass die Person Artikel schreibt. Noch eine Ebene tiefer braucht das Layout nicht einmal mehr das Konzept «Person».

So könnte ein solcher generischer Layout-Baustein aussehen. Das ist ein Entwurfsbeispiel, noch kein Umbau unserer Seite:

```tsx
import type { ReactNode } from "react";

type ImageTextProps = {
  imageSrc: string;
  imageAlt: string;
  children: ReactNode;
};

function ImageText({ imageSrc, imageAlt, children }: ImageTextProps) {
  return (
    <div className="d-flex flex-row">
      <img src={imageSrc} alt={imageAlt} className="flex-image-aside mr-s" />
      <div className="d-flex flex-column">{children}</div>
    </div>
  );
}
```

`children` ist der Inhalt zwischen dem öffnenden und schliessenden Komponenten-Tag. `ReactNode` erlaubt React-Inhalte wie Text und JSX. Die Komponente legt nur das Bild-Text-Layout fest; was der Text bedeutet, entscheidet die aufrufende Stelle:

```tsx
<ImageText
  imageSrc="https://picsum.photos/seed/beispiel-5041/96/96"
  imageAlt="Nora Linden"
>
  <p>Nora Linden</p>
  <p>Redaktorin</p>
</ImageText>

<ImageText
  imageSrc="https://picsum.photos/seed/beispiel-999/1200/800"
  imageAlt="Gartenbox für den Stadtgarten"
>
  <p>Gartenbox</p>
  <p>24.90</p>
</ImageText>
```

Die Inhalte sind verschieden, die Anordnung ist dieselbe. Ob das Layout ein Profilbild rund darstellt oder ein Produktbild rechteckig, wäre eine weitere bewusste Designentscheidung. Unser vereinfachtes Beispiel übernimmt noch nicht das vollständige responsive Profil-Layout.

Mehr Ebenen sind nicht automatisch besser. Wenn eine universelle Komponente viele Sonderfälle wie `isAuthor`, `isProduct` und `showPrice` braucht, hat sie wieder viel Fachwissen angesammelt. Dann sind getrennte fachliche Komponenten oft verständlicher, die bei Bedarf einen kleinen Layout-Baustein teilen.

Für unser erstes Refactoring bleiben wir bei einer fachlichen `ArticlePreview`. Wir haben bereits fünf konkrete Verwendungen, und deren Aufbau ist fast gleich. Die generischen Profil- und Layout-Komponenten bleiben zunächst eine mögliche spätere Erweiterung.

## Schritt 1: Die Artikeldaten beschreiben

Mit «Artikel» meinen wir in diesem Refactoring die **kleinen Vorschauen**, nicht den gesamten langen Blogbeitrag. Für eine Vorschau brauchen wir nur die Werte, die sie anzeigt, sowie eine stabile Kennung für die spätere Liste.

Lege `src/data/articles.ts` an. Eine `.ts`-Datei reicht, weil sie kein JSX enthält:

```ts
export type ArticlePreviewData = {
  id: string;
  category: string;
  title: string;
  author: string;
  image: {
    src: string;
    alt: string;
  };
};

export const cornerArticle: ArticlePreviewData = {
  id: "lieblingsplatz",
  category: "Ideen & Alltag",
  title: "So wird aus einer Ecke ein Lieblingsplatz",
  author: "Nora Linden",
  image: {
    src: "https://picsum.photos/seed/beispiel-6834/1200/800",
    alt: "Beispielbild zum Stadtgarten",
  },
};
```

Der Typ legt die gemeinsame Struktur fest. TypeScript prüft beispielsweise, dass jeder Datensatz einen Titel und beide Bildangaben besitzt. `image` fasst zusammengehörige Werte in einem Objekt zusammen. `author` ist hier nur der angezeigte Name; wir brauchen dafür noch kein vollständiges Personenobjekt.

`id` bleibt für denselben Artikel gleich, auch wenn sein Titel oder seine Position geändert wird. Sie muss innerhalb der späteren Liste eindeutig sein. Unsere Daten bleiben vorerst lokal; wir führen weder einen Backend-Aufruf noch neuen State ein.

## Schritt 2: Die Vorschau herauslösen

Lege `src/components/ArticlePreview.tsx` an. Diese Datei enthält JSX und hat deshalb die Endung `.tsx`:

```tsx
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
```

Das ist das bisherige Vorschau-JSX mit einer Änderung: Die festen Inhalte kommen jetzt aus `article`. Wir übernehmen die CSS-Klassen, damit das Aussehen gleich bleibt.

`import type` importiert nur die TypeScript-Typbeschreibung. `ArticlePreviewProps` beschreibt die Schnittstelle der Komponente; `ArticlePreviewData` beschreibt dagegen die Daten eines Artikels. Nicht jede Prop muss Teil der Artikeldaten sein: Ob oben eine Trennlinie erscheint, ist eine Darstellungsentscheidung.

Das Fragezeichen in `withTopBorder?: boolean` macht die Prop optional. Ohne Angabe gilt der Standardwert `true`. Diese kleine Variante brauchen wir, weil die Vorschauen im Text und die erste Vorschau am Seitenende einen oberen Rand haben, die folgenden Listeneinträge aber nicht. So entstehen zwischen den Listeneinträgen keine doppelten Rahmen.

Die Komponente liest nur ihre Props. Sie hat keinen eigenen State, kennt keine Follow-Funktion und entscheidet nicht, welcher Artikel auf der Seite erscheint.

## Schritt 3: Die erste Verwendung ersetzen

Ergänze oben in `App.tsx` die Imports. `useState` und der bisherige CSS-Import bleiben erhalten:

```tsx
import ArticlePreview from "./components/ArticlePreview";
import { cornerArticle } from "./data/articles";
```

Ersetze im Abschnitt «Drei Ideen für wenig Platz» nur den bisherigen `<article>...</article>`-Block durch:

```tsx
<ArticlePreview article={cornerArticle} />
```

Die Überschrift, der Absatz davor und die Inhalte danach bleiben in `App`. Mit `{cornerArticle}` übergeben wir das Objekt, nicht den Text `"cornerArticle"`.

Prüfe diese erste Stelle im Browser: Bild, Rubrik, Titel und Autorenname müssen wie vorher aussehen. Die Buttons müssen weiterhin funktionieren. Das ist ein Refactoring: Wir ändern die Struktur des Codes, nicht das sichtbare Verhalten.

## Schritt 4: Dieselbe Komponente wiederverwenden

Ergänze in `src/data/articles.ts` den Datensatz für die zweite Vorschau:

```ts
export const eveningArticle: ArticlePreviewData = {
  id: "gruener-feierabend",
  category: "Beispielbeitrag",
  title: "Fünf Ideen für einen grünen Feierabend",
  author: "Nora Linden",
  image: {
    src: "https://picsum.photos/seed/beispiel-2727/1200/800",
    alt: "Beispielbild zum Stadtgarten",
  },
};
```

Erweitere den Datenimport in `App.tsx`:

```tsx
import { cornerArticle, eveningArticle } from "./data/articles";
```

Ersetze im Abschnitt «Kleine Helfer für grosse Pläne» ebenfalls nur den `<article>...</article>`-Block:

```tsx
<ArticlePreview article={eveningArticle} />
```

Beide Stellen verwenden nun dieselbe Komponente mit verschiedenen Daten. Wenn wir später den Aufbau der Vorschau ändern, ändern wir ihn nur noch in `ArticlePreview.tsx`.

## Schritt 5: Mehrere Artikel aus einer Liste rendern

Am Seitenende stehen drei weitere Vorschauen. Statt drei Komponentenaufrufe einzeln zu schreiben, beschreiben wir die Daten als Array. Ergänze in `src/data/articles.ts`:

```ts
export const relatedArticles: ArticlePreviewData[] = [
  {
    id: "kleines-beet",
    category: "Beispielbeitrag",
    title: "Ein kleines Beet, viele Möglichkeiten",
    author: "Nora Linden",
    image: {
      src: "https://picsum.photos/seed/beispiel-6917/1200/800",
      alt: "Beispielbild zum Stadtgarten",
    },
  },
  {
    id: "stadtgarten",
    category: "Beispielbeitrag",
    title: "Ein kleiner Garten mitten in der Stadt",
    author: "Nora Linden",
    image: {
      src: "https://picsum.photos/seed/beispiel-8022/1200/800",
      alt: "Beispielbild zum Stadtgarten",
    },
  },
  {
    id: "sonnige-fenster",
    category: "Beispielbeitrag",
    title: "Pflanzen für sonnige Fenster",
    author: "Nora Linden",
    image: {
      src: "https://picsum.photos/seed/beispiel-6731/1200/800",
      alt: "Beispielbild zum Stadtgarten",
    },
  },
];
```

`ArticlePreviewData[]` bedeutet: ein Array, dessen Einträge alle diese Datenstruktur besitzen. Vervollständige den Datenimport in `App.tsx`:

```tsx
import { cornerArticle, eveningArticle, relatedArticles } from "./data/articles";
```

Ersetze den Abschnitt «Weitere Ideen für deinen Balkon» durch:

```tsx
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
```

`map` ruft die übergebene Funktion für jeden Eintrag auf und sammelt deren Rückgaben in einem neuen Array. Hier entsteht aus jedem Artikelobjekt ein JSX-Element. React rendert diese Elemente nacheinander.

`key` ist eine besondere Angabe für React: Sie hilft, Einträge über Renderdurchläufe hinweg wiederzuerkennen, etwa wenn sie umsortiert werden. Sie wird nicht als normale Prop an `ArticlePreview` weitergegeben. Verwende eine stabile Kennung aus den Daten, nicht `Math.random()` oder den Array-Index. Sonst kann React bei Änderungen den Zustand einer Instanz dem falschen Eintrag zuordnen.

Den `index` verwenden wir hier nur für das Layout: Der erste Eintrag bekommt einen oberen Rand. Das ist eine Positionsfrage, keine Identität. Die Identität bleibt `article.id`.

## Was gehört jetzt wohin?

Der neue Aufbau ist:

```text
src/
  App.tsx
  main.tsx
  components/
    ArticlePreview.tsx
  data/
    articles.ts
```

- `App` stellt die Seite zusammen und entscheidet, welche Vorschauen an welcher Stelle erscheinen. Die bestehenden Button-Zustände bleiben hier.
- `articles.ts` enthält die typisierten Anzeigedaten, ohne JSX oder Interaktionslogik.
- `ArticlePreview` beschreibt einmalig, wie diese Daten angezeigt werden. Sie kennt den Einsatzort nicht.

Die Komponente weiss weiterhin, was eine Artikelvorschau ist. Das ist hier sinnvoll und macht ihren Namen und ihre Props verständlich. Sie ist nicht so generisch wie das frühere `ImageText`-Beispiel, aber deutlich unabhängiger als der fest eingebaute JSX-Block in `App`.

## Deinen Stand prüfen

Starte dein Projekt mit `npm run dev` und prüfe:

- Alle fünf Artikelvorschauen zeigen weiterhin dieselben Bilder und Texte an.
- Die Liste am Seitenende hat keine doppelten Trennlinien.
- Like und beide Follow-Buttons funktionieren unverändert und unabhängig voneinander. Ein Neuladen setzt ihren lokalen State weiterhin zurück.
- In der Browser-Konsole erscheint keine Warnung wegen fehlender Keys.
- `npm run build` und `npm run lint` laufen ohne Fehler durch.

Ergänze probeweise einen vierten Artikel in `relatedArticles`, mit eigener `id`. Er muss ohne zusätzliche JSX-Kopie am Seitenende erscheinen. Ändere dann seinen Titel im Datenobjekt: Nur diese Vorschau soll sich ändern. Entferne den Probeeintrag anschliessend wieder.

Überlege zum Abschluss am Autorinnenbereich: Welche Props hätte eine `AuthorProfile`? Was davon würde eine `PersonProfile` noch benötigen? Was bliebe für ein reines `ImageText` übrig? Entscheide bewusst, wie viel Wissen du auf welcher Ebene brauchst, statt möglichst viele kleine Dateien anzulegen.

Den [vollständigen Referenzstand mit Komponenten und Artikeldaten findest du hier](https://github.com/rekoch/learnWebEngineering/tree/main/public/07_react/05_components). Wir haben in diesem Schritt nur die Artikelvorschauen herausgelöst; weitere Komponenten können darauf aufbauen.

Im [nächsten Kapitel](./06_components_abschliessen.md) schliessen wir die Aufteilung mit Bildern, Vergleichstabelle und den interaktiven Bereichen ab.