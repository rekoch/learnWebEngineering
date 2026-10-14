// Praktische Tipps aus den Buchkapiteln, pro Lektions-ID. Der Tutor streut sie beim passenden Teilschritt ein.
export const tips: Record<string, string[]> = {
  "setup-tools": [
    "In VS Code sind die Erweiterungen Live Server, Prettier, Path Intellisense und Highlight Matching Tag empfohlen.",
    "Aktiviere in den Einstellungen `editor.linkedEditing`, damit öffnende und schliessende Tags gleichzeitig umbenannt werden.",
    "Stelle Auto Save mindestens auf `onFocusChange`; optional kannst du das Formatieren beim Speichern einschalten.",
    "Setze in der `settings.json` den Live-Server-Wert für Debug Attach auf `true`, sonst klappt das Debuggen später nicht.",
    "Die Chrome-DevTools können mehr als die anderer Browser; du kannst Chrome später nur noch zur Fehlersuche nutzen."
  ],
  "html-first-page": [
    "Lege `index.html` an, tippe `!` und drücke Tab: Emmet erzeugt das komplette HTML-Grundgerüst.",
    "Rechtsklick auf `index.html` und «Open with Live Server» startet die Seite mit Live-Reload (Standard-Port 5500).",
    "Fehlt der Live-Server-Eintrag im Kontextmenü, ist die Erweiterung nicht installiert.",
    "Mit `liveServer.settings.CustomBrowser` auf `chrome` in der `settings.json` öffnet Live Server im richtigen Browser.",
    "Zum Üben der Tags eignet sich der HTML-Teil des freeCodeCamp-Kurses."
  ],
  "html-article-header": [
    "Öffne die Zielseite «Stadtgarten» in Chrome als Vorbild; ihre Bereiche sind verbindlich, das Thema ist frei.",
    "Pro Seite gibt es genau eine `h1`, danach `h2`, `h3` in sauberer Reihenfolge.",
    "Platzhaltertext erzeugst du in VS Code mit `lorem` + Tab.",
    "Struktur vor Design: erst nur das HTML-Gerüst bauen und im Browser testen, Styling kommt später."
  ],
  "html-article-content": [
    "Verwende semantische Tags wie `article`, `section` und `aside` statt nur `div`.",
    "Jedes Bild braucht ein `alt`-Attribut."
  ],
  "html-article-extras": [
    "Der Ordner `01_html` im Repository ist eine Struktur-Referenz und erst nach deiner eigenen Lösung gedacht.",
    "Struktur vor Design: Tabellen, Buttons und Boxen brauchen jetzt noch kein Aussehen.",
    "Autor:innen-Box, Thema und Tabelle werden in den späteren CSS- und JavaScript-Kapiteln gebraucht; baue sie also mit."
  ],
  "css-intro": [
    "DevTools öffnest du mit F12 oder per Rechtsklick auf «Untersuchen»; mit dem Auswahl-Werkzeug klickst du Elemente an.",
    "Unter «Styles» gewinnt die spezifischste, unterste Regel; durchgestrichene Regeln wurden überschrieben.",
    "Auch ohne eigenes CSS gibt es Styles: das «User Agent Stylesheet» des Browsers.",
    "Nutze die DevTools zum Live-Editieren, für «Computed Styles» und die Device-Simulation beim Responsive-Test.",
    "Im freeCodeCamp-CSS-Teil darfst du «Computer Basics» überspringen, wenn du sie schon kennst."
  ],
  "css-basics": [
    "Öffne die fertige Beispielseite in einem zweiten Tab und vergleiche deinen Stand nach jedem Kapitel.",
    "Gehe von grob nach fein vor wie bei Word: zuerst Ränder und Überschriften, Tabellen und Details später.",
    "Verknüpfe das CSS im `head` mit `<link rel=\"stylesheet\" href=\"main.css\">`.",
    "In den DevTools zeigt Orange die Margins und Grün die Paddings; der `body` hat standardmässig 8px Margin.",
    "Standardwerte des User-Agent-Stylesheets übersteuerst du mit eigenen Selektoren.",
    "Entferne feste Breite und Höhe des iFrames aus dem HTML und setze per CSS `aspect-ratio: 16 / 9`.",
    "Mit `max-width: 100%` und `height: auto` auf `img` sprengen Bilder das Layout nicht mehr."
  ],
  "css-font": [
    "Die Schrift der Vorlage findest du in den DevTools: Element untersuchen und die `font-family`-Zeile ablesen.",
    "Unter «Computed → Rendered Fonts» siehst du, welche Schrift der Browser wirklich nutzt.",
    "Lato bindest du lokal per `@font-face` ein, in einer eigenen `lato.css` im Fonts-Ordner.",
    "Werte wie `font-size`, `line-height` und `font-weight` liest du pro Element aus der Vorlage ab.",
    "Passen deine Überschriftenebenen (h2/h3) nicht zur Vorlage, passe beim Übernehmen der Werte die Ebenen an.",
    "`-webkit-font-smoothing: antialiased` ist nicht standardkonform, macht in Chrome aber einen sichtbaren Unterschied."
  ],
  "css-width": [
    "Suche in der Vorlage mit den DevTools das Element mit der `max-width` und übernimm den Wert.",
    "Umschliesse den Artikel mit einem `div` und einer Klasse für `max-width`; das Hero-Video braucht eine eigene Klasse.",
    "`margin: 0 auto` zentriert horizontal: 0 steht für oben/unten, `auto` für links/rechts."
  ],
  "css-rubrik": [
    "Lege eine Klasse an und setze sie überall im HTML, statt jede Rubrik einzeln zu stylen.",
    "`text-transform: uppercase` macht die Rubrik gross, ohne dass du den Text im HTML änderst."
  ],
  "css-buttons": [
    "Definiere zuerst den Standard-Button, dann die Abweichungen für «primary» und die States.",
    "Lagere Buttons in eine eigene `buttons.css` aus und importiere sie ganz oben im `main.css`.",
    "Mit CSS-Nesting (`&:hover`, `&.primary`) bleiben Varianten und States in einem Block übersichtlich.",
    "Setze `:focus-visible` gleich wie `:hover`, damit auch die Tastaturbedienung sichtbar ist.",
    "Ergänze im HTML `class=\"primary\"` überall, wo die Vorlage einen Primary-Button hat."
  ],
  "css-likes": [
    "Utility-First: Mehrere kleine Klassen wie `mt-s` oder `mb-m` statt eines Namens wie `blog-page-like-button`.",
    "Namensschema: `m` = margin, `t`/`b` = top/bottom, `x`/`y` = horizontal/vertikal, danach die Grösse (`s`, `m`, `l`, `xl`, `xxl`).",
    "Margins der Vorlage liest du in der Desktop-Ansicht mit den DevTools ab.",
    "Greift das User-Agent-Stylesheet dazwischen, hilft ein explizites `0`, z. B. `mt-0`.",
    "Setze `text-center` auf den `section`-Container, dann sind Button und Text zugleich zentriert.",
    "Das Herz-Icon ist ein SVG und kann optional bleiben."
  ],
  "css-variables": [
    "Wiederholte Abstandswerte legst du in `:root { --margin-s: 16px; }` ab und liest sie mit `var(--margin-s)`.",
    "Lagere die Variablen in `variables.css` aus und importiere sie im `main.css`.",
    "Prüfe nach dem Ersetzen den Like-Bereich, ob alle Abstände noch stimmen."
  ],
  "css-rwd-theory": [
    "Der Emmet-Shortcut `!` setzt bereits das Viewport-Meta-Tag; ohne es wird mobil herausgezoomt.",
    "Mobile First: Basis-CSS gilt für den kleinsten Screen, grössere Breiten ergänzt du mit `min-width`-Media-Queries.",
    "Setze `* { box-sizing: border-box; }`, damit Padding und Border die Spaltenbreiten nicht sprengen.",
    "Das `.row::after`-Clearfix ist nötig, weil Spalten mit `float` sonst aus der Zeile ausbrechen.",
    "Zum Üben von CSS Grid: das Spiel «CSS Grid Garden» (cssgridgarden.com) und der MDN Grid Guide.",
    "Ein Framework wie Bootstrap lohnt sich bei 12 Spalten und Standard-Design, ein eigenes Grid bei individuellem Design."
  ],
  "css-responsive": [
    "Mobile First: Ohne Breakpoint gilt Mobile; erst ab dem ersten Breakpoint schreibst du `@media (min-width: …)`.",
    "Breakpoints des Beispiels: bis 699px Mobile, ab 700px Tablet, ab 1000px Desktop.",
    "Ziehe in den DevTools die Fensterbreite auf und beobachte, ab wann das Design kippt.",
    "Mit einem Media Query direkt im `button`-Block übersteuerst du die Breite ab 700px.",
    "Hängst du fest, kannst du den Stand `06_variables` als Ausgangspunkt nutzen (nur auf ausdrücklichen Wunsch)."
  ],
  "css-preview": [
    "Zum Üben von Flexbox: «Flexbox Froggy» (flexboxfroggy.com) und der CSS-Tricks-Guide zu Flexbox.",
    "Setze `d-flex flex-row` auf das `article`; die Textspalte schachtelst du in ein `div` mit `d-flex flex-column`.",
    "Das Bild bekommt `flex: 0 1 30%`, `max-width: 144px` und `object-fit: cover`, damit es nicht verzerrt.",
    "Die Border liegt zwischen Padding und Margin; sind Linien zu nah am Text, korrigierst du mit Padding.",
    "Margin und Padding teilen sich dieselben Werte; lege sie als gemeinsame `--space-*`-Variablen ab.",
    "Zusatzelemente von einfach nach schwer: Bildlegende (`figure`, `figcaption`), Produkt-Kachel, Fazit-Box, Thema, Autor:innen-Box, Tabellen.",
    "Für Fazit-Box, Thema und Autor:innen-Box lohnt sich CSS Grid; Tabellen sind die Meister-Challenge."
  ],
  "js-basics": [
    "Lade das Repo als ZIP, entpacke es und öffne nur den Ordner `public/03_javascript/01_basics` in VS Code.",
    "Starte die Erklär-Dateien mit der VS-Code-Debug-Funktion, so siehst du Schritt für Schritt die Ausgabe.",
    "Führe Übungen mit `node dateiname.js` aus oder gehe sie mit dem Debugger durch.",
    "Im Browser findest du die Konsole unter DevTools → «console»; dort kannst du JavaScript direkt ausprobieren.",
    "Überlege dir bei Beispielen zu `==` und `===` das Ergebnis, bevor du es eingibst.",
    "Eine Variable ohne Wert ist `undefined`; der Zugriff auf deren Eigenschaften ist ein häufiger Fehler.",
    "Verwende immer `let` und `const`, nicht mehr `var`."
  ],
  "js-objects": [
    "Gib das ganze Objekt mit `console.log` aus, um seine Eigenschaften zu sehen."
  ],
  "js-functions": [
    "Nur `function doIt() {}` wird gehoistet und kann vor der Definition benutzt werden.",
    "Benannte Funktionen zeigen im Debugger ihren Namen."
  ],
  "js-loops": [
    "Schreibst du `a[100] = 100` in ein leeres Array, entstehen Lücken; Vorsicht bei Schleifen, sonst droht eine Endlosschleife.",
    "Ein DOM-Einstieg samt Hinweisen zum Einbinden von Scripts steht bei w3schools."
  ],
  "js-debugging": [
    "`console.log()` bleibt sinnvoll, wenn unklar ist, wann und wie oft ein Codestück aufgerufen wird.",
    "Chrome: DevTools → «Sources», Klick auf die Zeilennummer setzt einen Breakpoint, F10 geht Zeile für Zeile weiter.",
    "Mit der Maus über Variablen fahren zeigt ihren aktuellen Wert.",
    "Weisst du nicht, wo der Code liegt: In «Elements» Rechtsklick → «Break on» → «subtree modifications».",
    "Oder im Debugger «Event Listener Breakpoints» → «mouse» → «click», das stoppt bei jedem Klick.",
    "`debugger;` im Code ist eine eigene Stopp-Stelle; liefere es aber nie produktiv aus.",
    "VS Code: Befehlspalette (Cmd/Ctrl + Shift + P) → «Debug: Open Link» und die Live-Server-URL einfügen.",
    "Breakpoints setzt du per Klick am linken Rand; Step Over ist F8, Step Into F7.",
    "Variablenwerte kannst du im Debugger per Doppelklick ändern, um «Was wäre wenn?» zu simulieren.",
    "Klappt das Debuggen nicht, prüfe Debug Attach in den Settings (`true`) und die Live-Server-URL (Port 5500)."
  ],
  "js-callbacks": [
    "Merksatz: Eine Callback-Funktion bestimmt nicht, was passiert, sondern wann.",
    "`setTimeout()` simuliert lange Aktionen wie Server- oder Datenbankabfragen und macht Asynchronität sichtbar.",
    "`callback` ohne Klammern übergibt die Funktion, `callback()` ruft sie sofort auf.",
    "Arrow-Funktionen lassen dich die Callback-Funktion direkt inline schreiben und vermeiden Probleme mit `this`."
  ],
  "js-table-setup": [
    "Lade das Script am Seitenende mit `<script src=\"javascript/main.js\" type=\"module\"></script>`; ohne `type=\"module\"` geht `import` nicht.",
    "Teste die Einbindung mit `console.log(\"tables.js loaded\")` und prüfe die Ausgabe in der Console.",
    "Neue Dateien hängst du mit `import` in `main.js` ein und testest sie zuerst per Console-Ausgabe."
  ],
  "js-table-dom": [
    "Markiere Elemente mit Data-Attributen (z. B. `data-table-column`), statt allgemein nach `div` zu suchen.",
    "Die Breite von 100 % bekommt der höchste Wert; alle anderen leitest du prozentual davon ab.",
    "`col.innerText` ist Text; wandle ihn mit `Number()` um, sonst vergleichst du Strings.",
    "Das `style=\"width: …\"` im HTML kannst du als Rückfall stehen lassen, falls das JS nicht lädt.",
    "Beginne mit der ausführlichen Variante; die kompakte mit `Math.max(...)`, `Array.from` und Spread kommt später."
  ],
  "js-events": [
    "Ein erster Test mit `alert(...)` beim Klick zeigt, ob dein Listener am richtigen Button hängt.",
    "Der `click`-Event steht in der MDN-Doku nicht bei `HTMLButtonElement`, sondern weiter oben in der Vererbungskette (`Element`).",
    "Bei Events gilt oft «trial and error» oder Autocomplete, nicht stundenlanges Dokumentationslesen."
  ],
  "js-like": [
    "`button[data-button]` wählt nur Buttons mit diesem Attribut; den Wert liest du mit `button.dataset.button`.",
    "`classList.toggle(\"primary\")` setzt oder entfernt die Klasse in einem Schritt.",
    "IDs dürfen nur einmal pro HTML-Seite vorkommen; für die Like-Zahl nutzt du ein `<span>` mit ID.",
    "Gib Texte als Parameter in die Toggle-Funktion, statt sie darin fest zu verdrahten."
  ],
  "js-follow": [
    "Topic-Buttons kommen mehrfach auf der Seite vor; aktualisiere alle per `querySelectorAll` und einer Schleife.",
    "Unterscheide Autor- und Themen-Button über Data-Attribute (z. B. `data-button`)."
  ],
  "backend-run": [
    "Das Backend verlangt Node.js 26.10.0 (Bereich «Current»); die Version steht in `public/00_backend/.nvmrc`. Prüfe sie mit `node --version`.",
    "Ohne Admin-Rechte hilft die Anleitung «Install Node.js without admin access» (zwbetz.com).",
    "Erweitere in der `settings.json` `liveServer.settings.ignoreFiles` um `public/00_backend/**`, sonst lädt Live Server bei Backend-Änderungen neu (Komma in der Zeile davor beachten).",
    "Backend starten: im Ordner `public/00_backend` `npm install` und `npm run dev` (Port 3000); die API-Doku liegt unter `http://localhost:3000/api-docs/`.",
    "Für direkten Datenbankzugriff gibt es die Erweiterung «SQLite3 Editor»."
  ],
  "backend-fetch": [
    "Erscheint beim Laden keine Zahl, fehlt meist `await`; auch die Funktion muss `async` sein.",
    "Der Like-Zähler bleibt unsichtbar, solange `blogPageId` 0 ist und die Klasse `invisible` noch auf dem Element liegt.",
    "Beobachte den Ablauf mit `console.log` in der Console und prüfe Backend-Antworten im Network-Tab.",
    "Das Observer-`subscribe(..., true)` ruft den Handler auch nachträglich mit dem letzten Wert auf (Replay)."
  ],
  "backend-likes": [
    "`buttons.js` erkennt nur den Klick und sendet ein Event; die Like-Logik liegt komplett im `likeStateHandler.js`.",
    "Backend-Calls sind asynchron: setze `async` und `await` konsequent, auch in `toggleLikeState()`.",
    "Prüfe die Antwort auf `undefined`/`null`, bevor du `.liked` liest; `?.` allein macht «nicht vorhanden» und «false» ungewollt gleich.",
    "Packe riskante Backend-Aufrufe in `try/catch` und logge Fehler mit `console.error`.",
    "Kommt Code doppelt vor, lagere ihn in eine Funktion aus (DRY), z. B. `initLikeState()`.",
    "Teste den Wechsel der User-ID über das Eingabefeld oben rechts; der Like-Status muss mitwechseln."
  ],
  "backend-follow": [
    "`followStateHandler.js` ist vorbereitet, wird aber erst geladen, wenn du ihn in `blogPageMain.js` importierst.",
    "Autor-Daten liest du mit `button.dataset.authorEmail`, das Thema mit `button.dataset.topicName`.",
    "Teste ausgiebig: User-ID wechseln, Blog-Page-ID ändern, Reload (Persistenz) und mehrere Topic-Buttons synchron.",
    "Bei Fehlern prüfe die Console-Logs, den Network-Tab und den Observer-Eventfluss.",
    "Refactoring gehört zum Alltag: erst umsetzen, dann entdecken, dass es einfacher geht."
  ],
  "ts-basics": [
    "Der Browser versteht kein TypeScript; der Code wird in JavaScript «transpiliert», das braucht eine passende Entwicklungsumgebung.",
    "Eine kurze Einführung: «TypeScript für JavaScript-Erfahrene» auf typescriptlang.org (TypeScript in 5 Minuten).",
    "Lerne TypeScript am besten gleich im Projekt, z. B. mit React; VS Code unterstützt dich dabei gut.",
    "Anfangs kämpfst du mit Fehlern; nutze typescriptlang.org als Referenz."
  ],
  "react-intro": [
    "Für einen ersten Eindruck eignet sich das Tic-Tac-Toe-Tutorial auf react.dev/learn/tutorial-tic-tac-toe.",
    "JSX ist HTML-ähnlich im JavaScript; Komponenten sind wiederverwendbare Vorlagen mit Platzhaltern."
  ],
  "react-jsx": [
    "Projekt anlegen: `npm create vite@latest … -- --template react-ts`, dann `npm install` und `npm run dev`; bei Nachfrage wählst du esLint.",
    "JSX-Regeln: `className` statt `class`, Leer-Elemente selbst schliessen (`<img />`, `<br />`), `allowFullScreen` in JSX-Schreibweise.",
    "Kopiere nur den Inhalt des `<body>` in `App`; `index.html` und die Einbindung von `main.js` übernimmst du nicht.",
    "Mehrere Elemente gibst du mit einem Fragment `<>…</>` zurück.",
    "Entferne die Vite-Beispiel-CSS (`App.css`, `index.css`) samt Imports und importiere nur `./css/main.css` in `main.tsx`.",
    "VS Code hilft beim Korrigieren der Fehler nach dem Kopieren; am Ende sollten keine Errors mehr da sein.",
    "Die nummerierten Projektordner im Repo sind Referenzstände; du entwickelst dein eigenes Projekt weiter."
  ],
  "react-state": [
    "Rufe `useState` am Anfang der Komponente auf, nicht in Bedingungen, Schleifen oder Click-Handlern.",
    "Schreibe `onClick={increment}`, nicht `onClick={increment()}`; letzteres würde die Funktion schon beim Rendern ausführen.",
    "`setCount` ändert `count` im laufenden Handler nicht sofort; der neue Wert gilt erst beim nächsten Render.",
    "Normale lokale Variablen lösen kein Neurendern aus; für sichtbare, veränderliche Werte brauchst du State.",
    "Sichere vor dem Zähler-Experiment deine `App.tsx`; State bleibt nur im Arbeitsspeicher."
  ],
  "react-buttons": [
    "`!followsAuthor` kehrt einen Boolean um; so brauchst du pro Follow-Button nur einen Zustand.",
    "Mit `bedingung ? a : b` wählst du Text und CSS-Klasse aus dem State, statt `textContent` oder `classList` zu ändern.",
    "`aria-pressed` teilt Screenreadern mit, ob der Button aktiv ist.",
    "Im Handler beschreibt `liked` noch den alten Zustand: War es geliked, ziehst du eins ab, sonst zählst du eins dazu.",
    "Nutze für `className` mit festen und bedingten Klassen einen Template-String mit Backticks und `${…}`.",
    "Jeder Button braucht seinen eigenen State, damit sie unabhängig funktionieren."
  ],
  "react-components": [
    "Komponentennamen beginnen mit Grossbuchstaben, sonst hält React sie für HTML-Elemente.",
    "Merksatz: Daten gehen per Props nach unten, Aktionen per Callback (z. B. `onToggle`) nach oben.",
    "«Je dümmer, desto wiederverwendbarer»: Eine Komponente soll möglichst wenig über ihren Einsatzort wissen.",
    "Verwende in `map` einen stabilen `key` aus den Daten (`article.id`), nicht `Math.random()` oder den Index.",
    "`import type` importiert nur die Typbeschreibung; Dateien ohne JSX haben die Endung `.ts`, mit JSX `.tsx`.",
    "Definiere Komponenten ausserhalb von `App`, am besten in eigenen Dateien.",
    "Refactoring ändert nur die Struktur, nicht das Verhalten; prüfe nach jedem Schritt im Browser.",
    "Mit `npm run build` und `npm run lint` prüfst du am Ende, ob alles fehlerfrei durchläuft."
  ],
  "react-composition": [
    "Öffne die Lösungsdateien des Referenzstands erst nach deinem eigenen Versuch.",
    "Berechne Werte wie Balkenbreiten direkt aus den Props; ein `useState` oder `useEffect` dafür wäre falsch angesetzt.",
    "Bei `style` in JSX nutzt du ein Objekt und camelCase, z. B. `style={{ backgroundColor: … }}`.",
    "Importiere das alte `tables.js` nicht mehr; es würde erneut im DOM Styles setzen.",
    "Behandle Randfälle: Maximum 0 darf kein `NaN`/`Infinity` ergeben, leere Daten brauchen eine Meldung.",
    "Gib Komponenten wie `ToggleButton` keinen eigenen State, wenn der Zustand schon im Elternbaustein liegt.",
    "Teste Bausteine mit einer Probeänderung (anderer Themenname, Link statt Button, `disabled`) und entferne sie danach wieder.",
    "Komponentenstyles legst du in `src/css/components/` ab und bündelst sie in `components/components.css`."
  ],
  "react-backend": [
    "Starte das Backend separat (`cd public/00_backend`, `npm install`, `npm run dev`) und prüfe `http://localhost:3000/likes/2`; die Antwort muss JSON mit `likeCount` sein.",
    "Ist Port 3000 belegt (z. B. von mdBook): `PORT=3001 npm run dev` und `VITE_API_URL=http://localhost:3001` in `.env.local`; danach den Vite-Server neu starten.",
    "`VITE_`-Variablen sind im Browser sichtbar; lege dort nie Passwörter oder Geheimnisse ab.",
    "`fetch` wirft bei HTTP-Fehlern wie 500 nicht von selbst; prüfe `response.ok`.",
    "Nutze `encodeURIComponent` für Pfadwerte wie E-Mail-Adressen oder Themen mit Umlauten.",
    "Die Effect-Funktion selbst darf nicht `async` sein; räume mit `controller.abort()` auf und prüfe `signal.aborted`, bevor du State setzt.",
    "Im Entwicklungsmodus startet `StrictMode` Effects doppelt; das ist kein Grund, es zu entfernen.",
    "Die Benutzer- und Blogseiten-IDs simulieren nur eine Anmeldung und sind kein Login.",
    "Alternativen zum Selbstbauen: TanStack Query oder SWR für Serverdaten, Axios oder ky für HTTP.",
    "Vergleiche deinen Stand am Ende mit beiden Endständen: JS mit Backend und React mit Backend."
  ]
};
