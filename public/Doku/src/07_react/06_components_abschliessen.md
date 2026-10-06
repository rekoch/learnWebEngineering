# Die Seite in Komponenten aufteilen

Im [letzten Kapitel](./05_components.md) haben wir die Artikelvorschauen herausgelöst. Jetzt schliessen wir die Aufteilung unserer Seite ab. Wir bauen einen Bildbaustein, führen Darstellung und Berechnung der Vergleichstabelle zusammen und trennen die interaktiven Bereiche vom redaktionellen Inhalt.

Ausgangspunkt ist dein eigener Stand nach Kapitel 05. Du brauchst kein neues Vite-Projekt. Der [Referenzstand zu diesem Kapitel](https://github.com/rekoch/learnWebEngineering/tree/main/public/07_react/06_components-complete) liegt im Ordner `public/07_react/06_components-complete`.

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

Wir schreiben die Typen direkt in `ComparisonTable.tsx`, weil sie die Schnittstelle der Komponente beschreiben:

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

Die IDs jeder Messreihe und jeder Zeile müssen innerhalb ihrer jeweiligen Liste eindeutig sein. Ein Tippfehler in einem `values`-Schlüssel wird bei diesem offenen `Record`-Typ nicht automatisch erkannt; kontrolliere deshalb die Zuordnung. Für eine unbekannte Messreihe verwenden wir bewusst den Wert `0`.

## Darstellung und Berechnung zusammenführen

Lege `src/components/ComparisonTable.tsx` an:

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

Lege daneben `src/components/ComparisonTable.css` an:

```css
{{#include ../../../07_react/06_components-complete/src/components/ComparisonTable.css}}
```

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

Lege den fachlichen Like-Bereich in `src/components/LikeSection.tsx` an:

```tsx
{{#include ../../../07_react/06_components-complete/src/components/LikeSection.tsx}}
```

`LikeSection` weiss, was Likes sind, und setzt Button und Zähler zusammen. `ToggleButton` weiss das nicht. Unterschiedlich viel Fachwissen auf verschiedenen Ebenen ist hier beabsichtigt.

## Profil und Thema mit einem Platz für Aktionen

Die Autorinnenanzeige braucht Namen, Bild, Kontakt und Beschreibung. Ob daneben ein lokaler Follow-Button, ein Backend-Button oder eine andere Aktion steht, muss sie nicht entscheiden.

Lege `src/components/AuthorProfile.tsx` an:

```tsx
{{#include ../../../07_react/06_components-complete/src/components/AuthorProfile.tsx}}
```

Über `children` füllen wir den Platz für die Aktion. Das ist **Komposition**: Ein Baustein setzt sich aus anderen zusammen, ohne alle ihre Einzelheiten zu kennen. Beim Thema verwenden wir dieselbe Idee in `src/components/TopicFollowSection.tsx`:

```tsx
{{#include ../../../07_react/06_components-complete/src/components/TopicFollowSection.tsx}}
```

Für unsere eine Profilvariante brauchen wir noch keine weitere Ebene `PersonProfile` und keinen universellen Layout-Baustein. Die mögliche tiefere Aufteilung aus dem letzten Kapitel bleibt sinnvoll, sobald mehrere echte Einsatzfälle sie rechtfertigen.

## State und Seitendaten zuordnen

Lege die Anzeigedaten für Autorin, Thema und Produkt in `src/data/page.ts` ab:

```ts
{{#include ../../../07_react/06_components-complete/src/data/page.ts}}
```

Den Produktblock lösen wir als `src/components/ProductSummary.tsx` heraus. Er hat die eigene Aufgabe, ein Produkt kompakt darzustellen:

```tsx
{{#include ../../../07_react/06_components-complete/src/components/ProductSummary.tsx}}
```

Verschiebe die vier bestehenden Zustände und die Like-Funktion aus `App` in die neue `src/components/BlogInteractions.tsx`. Hier setzen wir die fachlichen Bereiche und ihre Aktionen zusammen:

```tsx
{{#include ../../../07_react/06_components-complete/src/components/BlogInteractions.tsx}}
```

Die Anzeigekomponenten erhalten Werte und Callbacks. Die Entscheidung, wie ein Zustand geändert wird, bleibt in `BlogInteractions`. Diese Grenze wird im nächsten Kapitel wichtig: Wir tauschen dort den lokalen Zustand gegen Backend-Daten aus, ohne Profil, Themenanzeige oder Toggle-Button neu zu schreiben.

## App stellt die Seite zusammen

Lege `src/components/BlogContent.tsx` an und verschiebe die redaktionellen Abschnitte vom ersten Balkonabschnitt bis einschliesslich Fazit dorthin. Dazu gehören auch die beiden Artikelvorschauen im Text, die acht `CaptionedImage`-Aufrufe und die `ComparisonTable`. Gib diese Abschnitte als Fragment zurück, ohne ein weiteres `<main>` um sie herum.

Die Imports für Bilder, Tabelle und die zwei einzelnen Artikeldatensätze ziehen ebenfalls mit um. Innerhalb von `components` lautet der Import beispielsweise `./CaptionedImage`, für Daten `../data/comparison`. `BlogContent` braucht kein `useState`.

Entferne die verschobenen Inhalte und Zustände aus `App.tsx`. Der Endstand sieht so aus:

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

- Alle acht Bilder mit Legende und alle fünf Artikelvorschauen sind weiterhin vorhanden.
- Die Tabelle zeigt sechs Werte; `2979` hat den längsten Balken. Die anderen Gruppen verwenden dasselbe Maximum.
- Setze probeweise alle Vergleichswerte auf `0`: Die Werte bleiben lesbar, und es entstehen keine ungültigen Breiten.
- Setze `rows` auf `[]`: Die Komponente zeigt die Meldung für fehlende Daten.
- Ergänze probeweise die zweite Vergleichstabelle: Beide skalieren unabhängig voneinander.
- Like und beide Follow-Buttons funktionieren wie zuvor. Ein Neuladen setzt ihre lokalen Zustände weiterhin zurück.
- Prüfe die Seite auch bei schmalem Browserfenster: Texte und Werte dürfen nicht abgeschnitten werden.

Entferne anschliessend die Probeänderungen. Im Referenzstand kannst du ausserdem `npm test`, `npm run build` und `npm run lint` ausführen. Die Tests prüfen die gemeinsame Skalierung, Nullwerte, leere Daten und unabhängige Instanzen.

Im [nächsten Kapitel](./07_backend.md) verbinden wir diese Komponenten wieder mit dem vorhandenen Backend.