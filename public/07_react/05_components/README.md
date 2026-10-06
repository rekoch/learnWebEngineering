# Blogseite mit wiederverwendbaren Komponenten

Der Referenzstand zum Kapitel «Komponenten mit React». Ausgangspunkt ist `../04_buttons-mit-state`.

Die fünf Artikelvorschauen verwenden dieselbe `ArticlePreview`-Komponente. Ihre Anzeigedaten und der gemeinsame Typ stehen in `src/data/articles.ts`. Zwei Vorschauen werden einzeln eingesetzt; die drei weiteren werden mit `map` und stabilen Keys aus einer Liste gerendert. Die optionale Prop `withTopBorder` erhält die bisherigen Trennlinien.

Die Like- und Follow-Zustände bleiben unverändert in `App`. Eine Backend-Anbindung und weitere Komponenten für Autorin, Layout oder Buttons sind nicht Teil dieses Schritts.

## Starten

Führe im Projektordner aus:

```sh
npm install
npm run dev
```

Für die Prüfungen:

```sh
npm run build
npm run lint
```

Die Styles werden wie im vorherigen Referenzstand aus `../../03_javascript/03_buttonReactive` eingebunden. Starte das Projekt deshalb innerhalb des Repositorys.

## Prüfen

- Die fünf Vorschauen zeigen dieselben Inhalte wie im vorherigen Stand.
- Die Liste hat nur beim ersten Eintrag einen oberen Rand.
- Like und beide Follow-Buttons bleiben unabhängig und werden beim Neuladen zurückgesetzt.
- Ein weiterer Eintrag in `relatedArticles` erzeugt eine weitere Vorschau, ohne das JSX in `App` zu ändern.

Das Kapitel liegt unter `../../Doku/src/07_react/05_components.md`.