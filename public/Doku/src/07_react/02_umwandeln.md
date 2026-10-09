# Blogseite mit React und TypeScript

Im letzten Kapitel hast du React kennengelernt. Jetzt nehmen wir unsere [Blogseite mit reaktiven Buttons](https://github.com/rekoch/learnWebEngineering/tree/main/public/03_javascript/03_buttonReactive) als Ausgangspunkt und übertragen zunächst nur ihr HTML und CSS in ein React-Projekt. Die Buttons sind sichtbar, funktionieren in diesem Kapitel aber noch nicht.

## Ausgangslage

Der Starter enthält bereits interaktive Like- und Follow-Buttons. Ihre Funktionen lassen wir beim Übertragen bewusst weg. In diesem Kapitel konzentrieren wir uns auf den Projektaufbau und die Unterschiede zwischen HTML und JSX. Danach lernst du State kennen und setzt damit die Buttons um. Eine Backend-Anbindung kommt erst später.

Lade das Repository als ZIP über **Code > Download ZIP** herunter oder klone es. Der Starter-Code liegt im Ordner `public/03_javascript/03_buttonReactive`.

## React-Projekt erstellen

Für React verwenden wir Vite mit TypeScript. Öffne ein Terminal im Repository und erstelle ein neues Projekt:

```sh
npm create vite@latest public/07_react/mein-react-projekt -- --template react-ts
cd public/07_react/mein-react-projekt
npm install
npm run dev
```

Wähle "esLint" als Linter und bestätige die Ausführung mit npm.

Vite erstellt unter anderem `src/main.tsx` und `src/App.tsx`. `main.tsx` verbindet React mit dem HTML-Element `#root` in `index.html`. In `App.tsx` bauen wir die Seite.

## HTML nach JSX übertragen

Übernimm den Inhalt aus dem `<body>` des Starters in die Rückgabe von `App`. Die äussere HTML-Datei brauchst du nicht zu kopieren: `index.html` enthält weiterhin nur den Einstiegspunkt, und React rendert die Oberfläche in `#root`.

JSX sieht HTML ähnlich, hat aber ein paar eigene Regeln:

- Verwende `className` anstelle von `class`.
- Schliess Elemente ohne Inhalt selbst, zum Beispiel `<img />` und `<br />`.
- Schreibe Attribute in der JSX-Schreibweise, zum Beispiel `allowFullScreen`.
- Übernimm die bisherige Einbindung von `javascript/main.js` nicht. Die Interaktionen bauen wir später mit React neu. Vites Einstieg über `src/main.tsx` bleibt erhalten.

Ersetze den Beispielinhalt von `App.tsx` zunächst durch dieses Gerüst und füge das HTML anstelle des Absatzes ein:

```tsx
function App() {
	return (
		<>
			<p>Hier kommt der Inhalt der Blogseite hin.</p>
		</>
	);
}

export default App;
```

`App` ist eine Komponente: eine Funktion, die die Oberfläche als JSX zurückgibt. Die leeren Klammern `<>` und `</>` bilden ein Fragment. Damit kannst du mehrere Elemente zusammen zurückgeben, ohne ein zusätzliches HTML-Element um sie herum einzufügen. So können das Video und das `<main>`-Element wie bisher nebeneinander stehen.

## Styles
Lege in deinem React-Projekt den Ordner `src/css` an. Kopiere alle CSS-Dateien aus `public/03_javascript/03_buttonReactive/` dorthin, einschliesslich des vollständigen Unterordners `utilities`. Kopiere auch den ganzen Fontordner `public/02_html_css/fonts/` nach `src/css/fonts/`, inklusive der Fontdateien und ihrer Lizenz.

Die Struktur sieht danach so aus:

```text
src/
	css/
		main.css
		buttons.css
		fonts.css
		grid.css
		variables.css
		utilities/
		fonts/
			lato.css
			Lato-latin.woff2
			Lato-latin-ext.woff2
			OFL.txt
```

Passe in `src/css/fonts.css` den bisherigen Import auf `@import url("fonts/lato.css");` an. Die anderen CSS-Imports und die Fontpfade in `fonts/lato.css` bleiben relativ zu ihrer jeweiligen CSS-Datei. So liegen alle Styles und Fonts im React-Projekt, ohne Verweise auf die früheren Projektstände.

Entferne die Vite-Beispiel-CSS-Imports aus `App.tsx` und `main.tsx` und lösche die zugehörigen Dateien `src/App.css` und `src/index.css`. Importiere stattdessen nur in `main.tsx` unsere zentrale CSS-Datei:

```tsx
import "./css/main.css";
```

Diese Struktur behalten wir in allen folgenden React-Kapiteln bei. Weitere Styles kommen ebenfalls unter `src/css`; komponentenspezifische Styles legen wir später im Unterordner `components` ab und binden sie über `css/main.css` ein.

## Statische Buttons

Übernimm die Buttons mit ihren festen Texten und CSS-Klassen. Für den Like-Bereich sieht das zum Beispiel so aus:

```tsx
<section className="mt-xl mb-xxl text-center">
	<button
		type="button"
		className="primary mb-s font-small align-items-center text-center"
	>
		Dieser Beitrag gefällt mir!
	</button>
	<p className="mt-0 mb-m font-small">
		<span>59</span> Personen gefällt dieser Beitrag
	</p>
</section>
```

Auch «Autorin folgen» und «Thema folgen» bleiben zunächst statisch. Du brauchst hier weder `useState` noch `onClick` oder eigene Event-Listener.

Du kannst akutell die ganzen Imports und "use" am Anfang `app.tsx` entfernen. Achte darauf, dass du am Schluss keine Errors mehr hast. Visual Studio Code sollte dich gut untersützen können, die Fehler zu korrigieren die es nach dem kopieren-einfügen geben wird.

## Deinen Stand prüfen

Öffne die von `npm run dev` angezeigte Adresse im Browser und prüfe:

- Die Blogseite wird mit den übernommenen Styles angezeigt.
- Im Terminal und in der Browser-Konsole erscheinen keine Fehler.
- Die drei Buttons sind sichtbar. Ein Klick verändert weder ihren Text noch den Like-Zähler.

Auch die bisherige JavaScript-Anpassung der Tabellenbalken wird noch nicht ausgeführt. Wir haben nur die Oberfläche übertragen, nicht das Verhalten des Starters.

## Eine grosse Komponente

Vorerst bleibt die ganze Blogseite in einer einzigen Komponente namens `App`. Auch wiederholte Artikel-Bausteine teilen wir noch nicht auf. So können wir uns zuerst auf JSX konzentrieren. Später zerlegen wir die Seite schrittweise in kleinere Komponenten.

Den [statischen React- und TypeScript-Endstand findest du hier](https://github.com/rekoch/learnWebEngineering/tree/main/public/07_react/02_react-mit-typescript). Die nummerierten Projektordner sind Referenzstände. Du entwickelst dein eigenes Projekt in den nächsten Kapiteln weiter und musst es nicht neu erstellen.

Im [nächsten Kapitel](./03_state.md) lernst du an einem kleinen Beispiel, wie React Veränderungen mit State darstellt.
