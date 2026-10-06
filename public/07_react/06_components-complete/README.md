# Blogseite mit abgeschlossener Komponentenaufteilung

Der Referenzstand zum Kapitel «Die Seite in Komponenten aufteilen». Ausgangspunkt ist `../05_components`.

`CaptionedImage` bündelt Bild und Legende. `ComparisonTable` rendert beliebige Messreihen und Vergleichsgruppen und berechnet ihre Balkenbreiten aus den Daten. Sie behandelt Nullwerte und leere Daten ohne DOM-Manipulation. `ToggleButton`, `LikeSection`, `AuthorProfile`, `TopicFollowSection` und `ProductSummary` haben klar getrennte Darstellungsaufgaben. `BlogContent` enthält den redaktionellen Inhalt.

Die lokalen Like- und Follow-Zustände liegen in `BlogInteractions`. Eine Backend-Anbindung folgt erst im nächsten Referenzstand `../07_backend-integration`.

## Starten

Führe im Projektordner aus:

```sh
npm install
npm run dev
```

Für die Prüfungen:

```sh
npm test
npm run build
npm run lint
```

Die Styles werden wie im vorherigen Referenzstand aus `../../03_javascript/03_buttonReactive` eingebunden. Starte das Projekt deshalb innerhalb des Repositorys.

## Prüfen

- Acht Figures mit Legende und fünf Artikelvorschauen bleiben erhalten.
- Die sechs Balken verwenden ein gemeinsames Maximum von 2979.
- Andere Messreihen und zusätzliche Instanzen skalieren unabhängig voneinander.
- Nullwerte und leere Daten erzeugen keine ungültigen Breiten.
- Like und beide Follow-Buttons bleiben unabhängig und werden beim Neuladen zurückgesetzt.
- Ein weiterer Eintrag in `relatedArticles` erzeugt eine weitere Vorschau, ohne das JSX in `App` zu ändern.

Das Kapitel liegt unter `../../Doku/src/07_react/06_components_abschliessen.md`.