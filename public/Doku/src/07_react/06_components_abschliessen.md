# Die Seite in Komponenten aufteilen

Im [letzten Kapitel](./05_components.md) haben wir die Artikelvorschauen herausgelöst. Jetzt schliessen wir die Aufteilung unserer Seite ab. Wir bauen einen Bildbaustein, führen Darstellung und Berechnung der Vergleichstabelle zusammen und trennen die interaktiven Bereiche vom redaktionellen Inhalt.

Ausgangspunkt ist dein eigener Stand nach [Komponenten mit React](./05_components.md). Du brauchst kein neues Vite-Projekt. Der [Referenzstand zu diesem Kapitel](https://github.com/rekoch/learnWebEngineering/tree/main/public/07_react/06_components-complete) liegt im Ordner `public/07_react/06_components-complete`. Er enthält auch die Lösungen zu den Übungen. Arbeite zunächst in deinem eigenen Projekt und öffne die jeweiligen Lösungsdateien erst nach deinem eigenen Versuch und den angegebenen Prüfungen.

In diesem Kapitel nimmt die Hilfestellung schrittweise ab:

- **Nachbauen und verstehen:** Bildbaustein, Tabelle, Toggle-Button und Autorinnenprofil setzen wir gemeinsam um.
- **Mit Anleitung umsetzen:** Den Like-Bereich löst du mit vorgegebenen Props und Arbeitsschritten selbst heraus.
- **Eigenständig lösen:** Für Themenbereich und Produktübersicht erhältst du Anforderungen und Prüfkriterien, aber kein fertiges Komponenten-JSX.

Bei den Übungen übernimmst du das vorhandene HTML und die CSS-Klassen aus deinem bisherigen `App.tsx`. Die Aufgabe ist nicht, das Design neu zu erfinden, sondern die Komponentengrenze festzulegen, feste Werte durch Props zu ersetzen und den Baustein einzubinden. Notiere jeweils vor dem Programmieren seine Aufgabe und seine Eingaben.

## Ein Bild mit Bildlegende

Unsere Seite enthält acht `<figure>`-Blöcke mit demselben Aufbau: ein Bild und eine Bildlegende. Nur Quelle, Alternativtext und Legende unterscheiden sich. Dieser Baustein braucht weder Artikelwissen noch State.

Lege `src/components/CaptionedImage.tsx` an:

```tsx
{{#include ../../../07_react/06_components-complete/src/components/CaptionedImage.tsx}}
```

Die Komponente erhält alle drei Angaben als Props. `alt` und `caption` haben unterschiedliche Aufgaben: Der Alternativtext beschreibt das Bild für Menschen, die es nicht sehen können; die Legende gehört zum sichtbaren redaktionellen Inhalt. Deshalb machen wir daraus nicht dieselbe Eingabe.

Importiere `CaptionedImage` in `App.tsx` und ersetze zuerst den ersten vollständigen `<figure>...</figure>`-Block:

```tsx
<CaptionedImage
  src="https://picsum.photos/seed/beispiel-2645/1200/800"
  alt="Beispielbild zum Stadtgarten"
  caption="Ein Eindruck aus dem kleinen Stadtgarten."
/>
```

Prüfe Bild und Legende im Browser. Ersetze danach die sieben anderen Figures nach demselben Prinzip. Die kleinen Bilder in Artikelvorschauen sowie das Profil- und Produktbild gehören nicht zu diesen Figures und bleiben vorerst an ihren bisherigen Stellen.

## Die Tabelle ist mehr als ihr HTML

Die bisherige «Tabelle» ist eine Gruppe horizontaler Vergleichsbalken, keine klassische HTML-Tabelle mit Zellen. Wir behalten diese Darstellung und nennen den Baustein `ComparisonTable`.

Im [JavaScript-Endstand](https://github.com/rekoch/learnWebEngineering/blob/main/public/03_javascript/06_followButtonsWithBackendIntegration/javascript/pages/blogPage/tables.js) hat `tables.js`:

1. über `querySelectorAll` die Tabelle und ihre Balken gesucht,
2. über `innerText` die Zahlen aus dem DOM gelesen,
3. den grössten Wert der ganzen Tabelle ermittelt,
4. für jeden Balken `style.width` gesetzt.

Die Regel behalten wir bei: Der grösste Wert entspricht `100 %`, alle anderen werden dazu ins Verhältnis gesetzt. Bei unseren Daten ist `2979` das Maximum. Der Balken für `720` ist damit ungefähr `24.2 %` breit.

In React haben wir die Zahlen bereits als Daten. Wir müssen sie nicht erst als Text rendern und anschliessend wieder aus dem DOM auslesen. **Die Komponente berechnet die Breiten aus ihren Props und gibt Zahlen, Legende und Styles gemeinsam zurück.**

## Ein wiederverwendbarer Datenvertrag

Welche Informationen gehören zur Tabelle, welche nur zu unserem konkreten Stadtgarten-Beispiel?

- Eine **Messreihe** hat eine stabile ID, eine Bezeichnung und eine Farbe. Sie erscheint in der Legende und in jeder Vergleichsgruppe.
- Eine **Zeile bzw. Vergleichsgruppe** hat eine stabile ID, eine Bezeichnung und Werte für die Messreihen.
- Titel und optionaler Hinweis kommen ebenfalls von aussen.
- Die Berechnung kennt keine Produktnamen und benötigt weder Benutzer-ID noch Backend.

Wir schreiben die Typen direkt in `ComparisonTable.tsx`, weil sie die Schnittstelle der Komponente beschreiben. Lege dazu `src/components/ComparisonTable.tsx` mit unseren konkreten Typen an:


```ts
export type ComparisonSeries = {
  id: string;
  label: string;
  color: string;
};

export type ComparisonRow = {
  id: string;
  label: string;
  values: Record<string, number>;
};
```

`Record<string, number>` beschreibt ein Objekt mit Zeichenketten als Schlüsseln und Zahlen als Werten. Wir verwenden die IDs der Messreihen als Schlüssel, zum Beispiel `values["garden-a"]`. So hängt die Zuordnung nicht von einer zufälligen Array-Reihenfolge ab.

Lege `src/data/comparison.ts` mit unseren konkreten Daten an:

```ts
{{#include ../../../07_react/06_components-complete/src/data/comparison.ts}}
```

Für die Farben verwenden wir die bestehenden CSS-Variablen aus `src/css/variables.css`: `var(--brand-brown)`, `var(--brand-yellow)` und `var(--brand-red)`. So behalten Balken und Legende die Farben des bisherigen HTML- und CSS-Stands. Die wiederverwendbare Komponente erhält weiterhin nur eine CSS-Farbe als Prop; auch ein Hexwert wäre möglich.

Die IDs jeder Messreihe und jeder Zeile müssen innerhalb ihrer jeweiligen Liste eindeutig sein. Ein Tippfehler in einem `values`-Schlüssel wird bei diesem offenen `Record`-Typ nicht automatisch erkannt; kontrolliere deshalb die Zuordnung. Für eine unbekannte Messreihe verwenden wir bewusst den Wert `0`.

## Darstellung und Berechnung zusammenführen

Ergänze `src/components/ComparisonTable.tsx`:

```tsx
{{#include ../../../07_react/06_components-complete/src/components/ComparisonTable.tsx}}
```

Die Berechnung steht vor der JSX-Rückgabe. `flatMap` sammelt die Werte aller Zeilen in einer flachen Liste. `Math.max(0, ...werte)` bestimmt daraus das gemeinsame Maximum; die zusätzliche `0` sorgt dafür, dass auch bei leeren Daten ein sinnvolles Ergebnis entsteht.

`getBarWidth` ist eine kleine Hilfsfunktion im selben Modul. Sie gehört zur Aufgabe der Tabelle, aber braucht keine eigene React-Komponente. Die Zahlen bleiben die Quelle der Wahrheit; die Balkenbreite ist ein **abgeleiteter Wert**.

Wichtig sind die Randfälle:

- Bei einem Maximum von `0` ergeben alle Balken `0 %`, nicht `NaN` oder `Infinity`.
- Fehlende Werte werden als `0` behandelt.
- Negative und nicht endliche Zahlen werden für diese Darstellung als `0` behandelt. Der Baustein ist bewusst für nicht negative Vergleichswerte gedacht, nicht für Gewinn-und-Verlust-Diagramme.
- Bei leeren Zeilen oder Messreihen erscheint eine Meldung statt einer bedeutungslosen Grafik.

Ein `useState` für das Maximum wäre unnötig: Es lässt sich jederzeit aus den Props berechnen. Auch ein `useEffect` wäre hier falsch angesetzt. Wir synchronisieren nichts mit einem externen System; wir berechnen lediglich die Ausgabe. Wenn sich die Daten ändern, berechnet der nächste Renderdurchlauf die Breiten neu.

Das React-Attribut `style` erhält ein Objekt, etwa `style={{ width: "50%" }}`. Bei `backgroundColor` gilt die JavaScript-Schreibweise statt des CSS-Namens `background-color`.

Lege für die Tabellenstyles den Unterordner `src/css/components` und darin `ComparisonTable.css` an:

```css
{{#include ../../../07_react/06_components-complete/src/css/components/ComparisonTable.css}}
```

Lege im selben Ordner die Einstiegsdatei `src/css/components/components.css` an. Sie bündelt die Styles dieses Ordners, genau wie `utilities/utilities.css`:

```css
{{#include ../../../07_react/06_components-complete/src/css/components/components.css}}
```

Importiere in `src/css/main.css` nach den bestehenden Imports nur diese Einstiegsdatei:

```css
@import url("components/components.css");
```

Weitere Komponentenstyles werden später in `components/components.css` ergänzt, nicht einzeln in `main.css`. Jeder CSS-Ordner verwaltet seine eigenen Imports. Der einzige CSS-Import in TypeScript bleibt `import "./css/main.css";` in `main.tsx`. Die Komponente selbst importiert keine CSS-Datei.

Die Werte stehen neben dem Balken statt in ihm. Dadurch bleiben auch kleine Werte und Nullwerte lesbar. Jede Balkenzeile hat ausserdem eine zugängliche Beschriftung mit Gruppenname, Messreihe und Wert; die Farbe ist nicht die einzige Information. Die vorhandenen allgemeinen Schriftklassen verwenden wir weiter.

Ersetze in `App.tsx` den bisherigen `<div data-table-name="benchmark">...</div>`-Block und ergänze die Imports für Komponente und Daten:

```tsx
<ComparisonTable
  title="Beispielwerte im Vergleich"
  series={gardenSeries}
  rows={gardenRows}
  note="Beispielwerte (höher ist besser)"
/>
```

Importiere das alte `tables.js` nicht. Es würde erneut Elemente suchen und Styles ausserhalb von React verändern. Wir haben seine fachliche Berechnung übertragen, nicht seine DOM-Manipulation.

## Dieselbe Tabelle für andere Daten

Die Schnittstelle erlaubt andere Namen, Farben und beliebig viele Messreihen. Auch die Anzahl der Vergleichsgruppen ist nicht festgeschrieben:

```tsx
<ComparisonTable
  title="Ernte in Gramm"
  series={[
    { id: "herbs", label: "Kräuter", color: "#3a8561" },
    { id: "tomatoes", label: "Tomaten", color: "#c95353" },
  ]}
  rows={[
    { id: "june", label: "Juni", values: { herbs: 80, tomatoes: 120 } },
    { id: "july", label: "Juli", values: { herbs: 100, tomatoes: 240 } },
  ]}
  note="Monatliche Ernte; alle Werte in Gramm"
/>
```

Diese zweite Instanz bestimmt ihr eigenes Maximum von `240`. Die erste Tabelle behält ihr Maximum von `2979`. Es gibt weder globale Variablen noch einen DOM-Selektor, der beide versehentlich zusammenfasst.

Vergleiche nur Werte mit einer gemeinsamen Einheit und einer sinnvoll gemeinsamen Skala. Eine Tabelle mit Metern in einer Gruppe und Kilogramm in einer anderen würde durch die gemeinsame Skalierung eine irreführende Aussage machen. Wiederverwendbarkeit hebt fachliche Voraussetzungen nicht auf.

## Ein Button ohne Follow-Wissen

Unsere Buttons wiederholen die Entscheidung zwischen aktivem und inaktivem Text, `aria-pressed` und der CSS-Klasse `primary`. Das ist eine gute gemeinsame Aufgabe. Lege `src/components/ToggleButton.tsx` an:

```tsx
{{#include ../../../07_react/06_components-complete/src/components/ToggleButton.tsx}}
```

Der Button kennt nur Auswahl, Beschriftungen und eine Aktion. Er weiss nicht, ob jemand einen Beitrag likt, einer Autorin folgt oder ein Thema auswählt. Er besitzt keinen eigenen State: Sonst hätten wir zwei konkurrierende Quellen für denselben Auswahlzustand.

`onToggle` ist eine Funktion als Prop. `onClick={onToggle}` führt sie nicht beim Rendern aus, sondern übergibt sie für den späteren Klick. `disabled` bereitet den Baustein auch auf Situationen vor, in denen eine Aktion noch nicht verfügbar ist.

## Übung 1: Den Like-Bereich mit Anleitung herauslösen

Erstelle `src/components/LikeSection.tsx`. Der Baustein soll den vorhandenen Like-Button und den Zähler zusammen darstellen. Die Zustandsänderung bleibt ausserhalb der Komponente. Diese Schnittstelle ist vorgegeben:

```ts
type LikeSectionProps = {
  liked: boolean;
  count: number;
  onToggle: () => void;
  disabled?: boolean;
};
```

1. Suche in `App.tsx` den Abschnitt mit Like-Button und Zähler. Verschiebe sein JSX in die neue Komponente und exportiere sie als Standardexport.
2. Ersetze den bisherigen Button durch `ToggleButton`. Ordne `liked`, `onToggle` und `disabled` den passenden Props zu. Die beiden Beschriftungen bleiben die bisherigen Like-Texte.
3. Zeige beim Zähler `count` an. Die Komponente berechnet keine neue Anzahl und enthält weder `useState` noch die Like-Funktion.
4. Kennzeichne den Bereich mit `aria-label="Beitrag liken"` und den Zähler mit `aria-live="polite"`, damit Änderungen angekündigt werden können.
5. Importiere `LikeSection` in `App.tsx` und übergib die bestehenden Zustände sowie die bestehende Like-Funktion. Entferne dort das ersetzte JSX, aber noch nicht den State.

**Prüfe deinen Baustein:** Ein Klick erhöht den Zähler von `59` auf `60`, ein weiterer setzt ihn auf `59` zurück. Beschriftung und Auswahl wechseln mit. Übergib probeweise `disabled`: Der Button darf dann weder Auswahl noch Zähler verändern. Entferne diese Probe danach wieder.

Erkläre anschliessend in eigenen Worten: Warum braucht `LikeSection` keinen eigenen Like-State? Warum erhält `ToggleButton` keinen Zähler? `LikeSection` weiss, was Likes sind, und setzt Button und Zähler zusammen. `ToggleButton` weiss das nicht. Unterschiedlich viel Fachwissen auf verschiedenen Ebenen ist hier beabsichtigt.

## Profil und Thema mit einem Platz für Aktionen

Die Autorinnenanzeige braucht Namen, Bild, Kontakt und Beschreibung. Ob daneben ein lokaler Follow-Button, ein Backend-Button oder eine andere Aktion steht, muss sie nicht entscheiden.

Lege `src/components/AuthorProfile.tsx` an:

```tsx
{{#include ../../../07_react/06_components-complete/src/components/AuthorProfile.tsx}}
```

Über `children` füllen wir den Platz für die Aktion. Das ist **Komposition**: Ein Baustein setzt sich aus anderen zusammen, ohne alle ihre Einzelheiten zu kennen.

Für unsere eine Profilvariante brauchen wir noch keine weitere Ebene `PersonProfile` und keinen universellen Layout-Baustein. Die mögliche tiefere Aufteilung aus dem letzten Kapitel bleibt sinnvoll, sobald mehrere echte Einsatzfälle sie rechtfertigen.

## Übung 2: Den Themenbereich eigenständig aufteilen

Setze jetzt `src/components/TopicFollowSection.tsx` ohne Lösungsvorlage um. Untersuche dafür den bestehenden Themenabschnitt in deinem `App.tsx` und wende die Idee der Komposition an.

**Anforderungen:**

- Die Komponente erhält den Themennamen als `topic: string` und einen Aktionsplatz als `children: ReactNode`. Sie hat einen Standardexport.
- Sie zeigt den übergebenen Namen und den bestehenden Hinweistext an. Behalte das responsive Layout und die CSS-Klassen des Themenabschnitts bei; beschrifte den Abschnitt mit `aria-label="Thema"`.
- Der Aufrufer setzt den Follow-Button in den Aktionsplatz ein. Der Baustein selbst importiert weder `ToggleButton` noch `useState` und kennt keine Follow-Funktion.
- Ersetze den bisherigen Themenabschnitt in `App.tsx` durch deine Komponente. Der bestehende Follow-State und sein Callback bleiben zunächst in `App`.

Entscheide selbst, welche HTML-Elemente zur Themenanzeige gehören und welche zur übergebenen Aktion. Schreibe den Props-Typ, die JSX-Rückgabe und die Verwendung selbst; für diese Aufgabe gibt es hier keinen fertigen Codeblock.

**Prüfe deinen Baustein:**

1. Übergib vorübergehend einen anderen Themennamen. Er muss ohne Änderung an der Komponente erscheinen.
2. Ersetze am Aufruf den Follow-Button vorübergehend durch einen einfachen Link. Er muss im selben Aktionsbereich erscheinen, ohne dass du `TopicFollowSection` anpasst.
3. Setze den Follow-Button wieder ein. Themen-Follow und Autorinnen-Follow müssen unabhängig funktionieren, auch bei schmalem Browserfenster.

Entferne die Probeänderungen. Begründe, warum eine zusätzliche Prop `followsTopic` hier nicht nötig ist.

## State und Seitendaten zuordnen

Lege die Anzeigedaten für Autorin, Thema und Produkt in `src/data/page.ts` ab:

```ts
{{#include ../../../07_react/06_components-complete/src/data/page.ts}}
```

## Übung 3: Eine Produktübersicht eigenständig entwerfen

Löse den bisherigen Produktblock als `src/components/ProductSummary.tsx` heraus. Anders als bei der ersten Übung bestimmst du den Props-Typ und die Umsetzung selbst. Für die spätere Zusammenstellung ist nur vereinbart: Die Komponente hat einen Standardexport und erhält das Produktobjekt über eine Prop namens `product`.

**Anforderungen:**

- Stelle Produktname, Marke, Preis, Details, Bewertung und Bild aus dem übergebenen Objekt dar. Verwende den Alternativtext aus den Daten.
- Definiere einen passenden TypeScript-Typ für die benötigten Produktfelder. Orientiere dich an `product` aus `src/data/page.ts`; die vorhandenen Preis- und Bewertungsangaben sind bereits formatierte Zeichenketten.
- Behalte die bisherigen HTML-Elemente und CSS-Klassen des Produktblocks bei und beschrifte den Abschnitt mit `aria-label="Produkt"`.
- Importiere den konkreten Produktdatensatz nicht in der Komponente. Sie erhält ihn vom Aufrufer und enthält keinen State, keine Backend-Abfrage und keine fest eingebauten Angaben zur Gartenbox.
- Ersetze den Produktblock in `App.tsx` durch deine Komponente und übergib dort den Datensatz.

**Prüfe deinen Baustein:** Lege am Aufruf vorübergehend ein zweites Produktobjekt mit anderen Angaben an und rendere beide Produkte gleichzeitig. Alle Angaben einschliesslich Bild und Alternativtext müssen zum jeweiligen Produkt gehören. Dafür darfst du die Komponente nicht verändern. Prüfe ausserdem das Layout bei schmalem Browserfenster und entferne danach die zusätzliche Instanz.

Erkläre zum Abschluss: Weshalb erhält die Produktübersicht Daten über Props, obwohl wir auf unserer Seite nur ein Produkt zeigen? Welche Angaben wären für ihre Darstellungsaufgabe unnötig?

## Die Interaktionen zusammenführen

Verschiebe die vier bestehenden Zustände und die Like-Funktion aus `App` in die neue `src/components/BlogInteractions.tsx`. Hier setzen wir die fachlichen Bereiche und ihre Aktionen zusammen:

```tsx
{{#include ../../../07_react/06_components-complete/src/components/BlogInteractions.tsx}}
```

Die Anzeigekomponenten erhalten Werte und Callbacks. Die Entscheidung, wie ein Zustand geändert wird, bleibt in `BlogInteractions`. Diese Grenze wird im nächsten Kapitel wichtig: Wir tauschen dort den lokalen Zustand gegen Backend-Daten aus, ohne Profil, Themenanzeige oder Toggle-Button neu zu schreiben.

## App stellt die Seite zusammen

Lege `src/components/BlogContent.tsx` an und verschiebe die redaktionellen Abschnitte vom ersten Balkonabschnitt bis einschliesslich Fazit dorthin. Dazu gehören auch die beiden Artikelvorschauen im Text, die acht `CaptionedImage`-Aufrufe und die `ComparisonTable`. Gib diese Abschnitte als Fragment zurück, ohne ein weiteres `<main>` um sie herum.

Die Imports für Bilder, Tabelle und die zwei einzelnen Artikeldatensätze ziehen ebenfalls mit um. Innerhalb von `components` lautet der Import beispielsweise `./CaptionedImage`, für Daten `../data/comparison`. `BlogContent` braucht kein `useState`.

Entferne die verschobenen Inhalte und Zustände aus `App.tsx`. Vergleiche den folgenden Endstand erst, wenn deine drei Übungskomponenten eingebunden sind und ihre Prüfungen bestehen. Er zeigt die Zusammenstellung, nicht die Implementierung deiner Bausteine:

```tsx
{{#include ../../../07_react/06_components-complete/src/App.tsx}}
```

Der Komponentenbaum macht die Zuständigkeiten sichtbar:

```text
App
  BlogContent
    CaptionedImage (mehrfach)
    ArticlePreview (mehrfach)
    ComparisonTable
  ProductSummary
  BlogInteractions (lokaler State)
    LikeSection
      ToggleButton
    AuthorProfile
      ToggleButton als children
    TopicFollowSection
      ToggleButton als children
  ArticlePreview (Liste)
```

Damit ist die Aufteilung für diese Seite abgeschlossen. Wir lassen den redaktionellen Text bewusst als zusammengehörigen Inhalt stehen. Es gibt keinen Nutzen darin, jede Überschrift oder jeden Absatz in eine eigene Datei zu verschieben.

## Deinen Stand prüfen

- Die drei Übungskomponenten bestehen ihre jeweiligen Prüfungen. Du kannst ihre Props und die Platzierung des State begründen, bevor du sie mit dem Referenzstand vergleichst.
- Alle acht Bilder mit Legende und alle fünf Artikelvorschauen sind weiterhin vorhanden.
- Die Tabelle zeigt sechs Werte; `2979` hat den längsten Balken. Die anderen Gruppen verwenden dasselbe Maximum.
- Setze probeweise alle Vergleichswerte auf `0`: Die Werte bleiben lesbar, und es entstehen keine ungültigen Breiten.
- Setze `rows` auf `[]`: Die Komponente zeigt die Meldung für fehlende Daten.
- Ergänze probeweise die zweite Vergleichstabelle: Beide skalieren unabhängig voneinander.
- Like und beide Follow-Buttons funktionieren wie zuvor. Ein Neuladen setzt ihre lokalen Zustände weiterhin zurück.
- Prüfe die Seite auch bei schmalem Browserfenster: Texte und Werte dürfen nicht abgeschnitten werden.

Entferne anschliessend die Probeänderungen. Im Referenzstand kannst du ausserdem `npm test`, `npm run build` und `npm run lint` ausführen. Die Tests prüfen die gemeinsame Skalierung, Nullwerte, leere Daten und unabhängige Instanzen.

Im [nächsten Kapitel](./07_backend.md) verbinden wir diese Komponenten wieder mit dem vorhandenen Backend.