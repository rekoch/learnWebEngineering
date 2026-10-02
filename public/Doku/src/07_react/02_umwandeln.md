# Blogseite mit React und TypeScript

Im letzten Kapitel hast du gesehen, wie sich wiederverwendbare Oberflächen mit React bauen lassen. Jetzt nehmen wir unsere [Blogseite mit reaktiven Buttons](https://github.com/rekoch/learnWebEngineering/tree/main/public/03_javascript/03_buttonReactive) als Ausgangspunkt und übertragen sie Schritt für Schritt in ein React-Projekt.

## Ausgangslage

Die Seite enthält bereits interaktive Like- und Follow-Buttons. Ihre Zustände werden aber nur im Browser verändert. Es gibt noch keine Backend-Anbindung: Wenn du die Seite neu lädst, gehen die Änderungen verloren. Das ist für diesen ersten Schritt beabsichtigt. Wir wollen zunächst die bestehende Oberfläche und ihre Interaktionen mit React umsetzen.

Lade das Repository als ZIP über **Code > Download ZIP** herunter oder klone es. Der Starter-Code liegt im Ordner `public/03_javascript/03_buttonReactive`.

## React-Projekt erstellen

Für React verwenden wir Vite mit TypeScript. Öffne ein Terminal im Repository und erstelle ein neues Projekt:

```sh
npm create vite@latest public/07_react/mein-react-projekt -- --template react-ts
cd public/07_react/mein-react-projekt
npm install
npm run dev
```

Vite erstellt unter anderem `src/main.tsx` und `src/App.tsx`. `main.tsx` verbindet React mit dem HTML-Element `#root` in `index.html`. In `App.tsx` bauen wir die Seite.

## HTML nach JSX übertragen

Übernimm den Inhalt aus dem `<body>` des Starters in die Rückgabe von `App`. Die äussere HTML-Datei brauchst du nicht zu kopieren: `index.html` enthält weiterhin nur den Einstiegspunkt, und React rendert die Oberfläche in `#root`.

JSX sieht HTML ähnlich, hat aber ein paar eigene Regeln:

- Verwende `className` anstelle von `class`.
- Schliess Elemente ohne Inhalt selbst, zum Beispiel `<img />` und `<br />`.
- Schreibe Attribute in der JSX-Schreibweise, zum Beispiel `allowFullScreen`.
- Entferne das bisherige `javascript/main.js`. Die Interaktionen bauen wir mit React neu.

Die vorhandenen Styles kannst du zunächst weiterverwenden. Im Beispielprojekt werden sie in `App.tsx` aus dem Starter-Ordner importiert:

```tsx
import "../../../03_javascript/03_buttonReactive/main.css";
```

## Interaktionen mit State

Im bisherigen JavaScript suchen wir Buttons im DOM, registrieren Event-Listener und verändern danach Text, Klassen und `data-*`-Attribute direkt. In React beschreiben wir stattdessen, wie die Oberfläche abhängig vom Zustand aussehen soll.

Für den Like-Button brauchst du zum Beispiel einen Zustand für die Auswahl und einen für den Zähler:

```tsx
const [liked, setLiked] = useState(false);
const [likeCount, setLikeCount] = useState(59);
```

React und TypeScript leiten die Typen `boolean` und `number` hier aus den Startwerten ab. Beim Klick aktualisierst du die Zustände mit `setLiked` und `setLikeCount`. In JSX zeigst du abhängig von `liked` den passenden Text und mit `{likeCount}` den aktuellen Zähler an. Für «Autorin folgen» und «Thema folgen» funktioniert es nach demselben Prinzip: je ein boolescher Zustand und ein Click-Handler.

Der Zustand lebt vorerst nur im Arbeitsspeicher der Seite. Er wird weder gespeichert noch an einen Server geschickt. Die Backend-Anbindung kommt später.

## Eine grosse Komponente

Vorerst bleibt die ganze Blogseite in einer einzigen Komponente namens `App`. Auch wiederholte Artikel-Bausteine teilen wir noch nicht auf. So können wir uns zuerst darauf konzentrieren, wie JSX, TypeScript, State und Ereignisse zusammenspielen. In den folgenden Kapiteln zerlegen wir die Seite schrittweise in kleinere Komponenten und verwenden diese wieder.

Den vollständigen [React- und TypeScript-Endstand findest du hier](https://github.com/rekoch/learnWebEngineering/tree/main/public/07_react/02_react-mit-typescript). Vergleiche ihn mit deiner Umsetzung und achte besonders darauf, wie sich die drei Buttons anhand ihres jeweiligen States darstellen.
