# Buttons mit React

Im Kapitel [State in React](./03_state.md) hast du State an einem Zähler kennengelernt. Jetzt verwenden wir ihn für die drei Buttons unserer Blogseite. Ausgangspunkt ist deine statische `App` aus [Blogseite mit React und TypeScript](./02_umwandeln.md); das Zählerexperiment gehört nicht mehr hinein.

Wir beginnen mit einem Follow-Button, der nur einen booleschen Zustand braucht. Danach ergänzen wir den Like-Button mit seinem Zähler. Alle Zustände bleiben vorerst lokal, ohne Backend-Anbindung.

## Autorin folgen

Importiere `useState` am Anfang von `App.tsx`, zusätzlich zum vorhandenen CSS-Import:

```tsx
import { useState } from "react";
```

Lege in der Funktion `App`, vor dem `return`, einen Zustand an:

```tsx
const [followsAuthor, setFollowsAuthor] = useState(false);

function toggleAuthorFollow() {
  setFollowsAuthor(!followsAuthor);
}
```

`false` bedeutet, dass du der Autorin noch nicht folgst. Das Ausrufezeichen kehrt den booleschen Wert um: Aus `false` wird `true`, aus `true` wird `false`.

Ersetze den bisherigen Button «Autorin folgen» durch:

```tsx
<button
  type="button"
  aria-pressed={followsAuthor}
  className={followsAuthor ? "" : "primary"}
  onClick={toggleAuthorFollow}
>
  {followsAuthor ? "Autorin nicht mehr folgen" : "Autorin folgen"}
</button>
```

Der Ausdruck `bedingung ? wertWennWahr : wertWennFalsch` wählt abhängig vom Zustand einen Wert aus. So verändern sich der Text und die CSS-Klasse zusammen. `aria-pressed` teilt auch assistiven Technologien mit, ob der Button ausgewählt ist.

Klicke zweimal auf den Button: Zuerst muss er den Folgezustand anzeigen, danach wieder den Ausgangszustand. Dafür ändern wir weder `textContent` noch `classList` direkt. React leitet beides aus `followsAuthor` ab.

## Thema folgen

Setze «Thema folgen» nach demselben Prinzip um. Verwende dafür einen eigenen Zustand, damit die beiden Buttons unabhängig voneinander funktionieren:

```tsx
const [followsTopic, setFollowsTopic] = useState(false);

function toggleTopicFollow() {
  setFollowsTopic(!followsTopic);
}
```

Der zugehörige Button sieht so aus:

```tsx
<button
  type="button"
  aria-pressed={followsTopic}
  className={followsTopic ? "" : "primary"}
  onClick={toggleTopicFollow}
>
  {followsTopic ? "Thema entfolgen" : "Thema folgen"}
</button>
```

Prüfe, dass ein Klick auf diesen Button den Autorinnen-Button nicht verändert.

## Beitrag liken

Beim Like-Bereich verändern sich sowohl die Auswahl als auch der Zähler. Lege dafür zwei weitere Zustände und einen Handler in `App` vor dem `return` an:

```tsx
const [liked, setLiked] = useState(false);
const [likeCount, setLikeCount] = useState(59);

function toggleLike() {
  setLiked(!liked);
  setLikeCount(likeCount + (liked ? -1 : 1));
}
```

Beim Klick beschreibt `liked` noch den Zustand des aktuellen Renderdurchlaufs. War der Beitrag bereits gelikt, ziehen wir eins ab. War er nicht gelikt, zählen wir eins dazu. `setLiked(!liked)` fordert die neue Auswahl an, verändert aber die Variable `liked` in diesem Handler nicht sofort.

Ersetze den statischen Like-Bereich durch:

```tsx
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
```

Für `className` verwenden wir hier einen Template-String mit Backticks. Die festen CSS-Klassen bleiben erhalten; `${...}` fügt abhängig vom Zustand die Klasse `primary` hinzu oder einen leeren Text.

## Deinen Stand prüfen

- Der erste Like-Klick verändert den Zähler von `59` auf `60`, den Buttontext und das Aussehen.
- Ein weiterer Like-Klick stellt den Ausgangszustand wieder her.
- Die beiden Follow-Buttons lassen sich unabhängig voneinander ein- und ausschalten.
- Nach dem Neuladen stehen alle Buttons und der Zähler wieder auf ihren Startwerten. Das ist ohne Speicherung beabsichtigt.

Die ganze Seite bleibt vorerst in `App`. Im [nächsten Kapitel](./05_components.md) teilen wir die Artikelvorschauen in wiederverwendbare Komponenten auf.

Den [Endstand mit reaktiven Buttons findest du hier](https://github.com/rekoch/learnWebEngineering/tree/main/public/07_react/04_buttons-mit-state). Im Referenzcode stehen die kurzen Follow-Handler direkt in `onClick`, zum Beispiel `onClick={() => setFollowsAuthor(!followsAuthor)}`. Diese Pfeilfunktion wird ebenfalls erst beim Klick ausgeführt und hat dieselbe Wirkung wie der benannte Handler oben.