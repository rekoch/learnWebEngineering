# Kursunterlagen
Für die Kursunterlagen gehe auf [Kursunterlagen](https://learn-web-engineering.web.app/Doku/book)

# Web Engineering Kurs - Beispielprojekte

Dieses Repository enthält verschiedene Beispielprojekte für einen Web-Engineering-Kurs: direkt aufrufbare HTML/CSS/JavaScript-Seiten, ein lokales Backend und React-Projekte mit TypeScript.

## Übersicht der Beispielseiten

Die HTML/CSS/JavaScript-Beispielseiten sind über Firebase Hosting erreichbar. Für React gibt es jeweils eine gebaute Demo zum Vergleichen und den Referenzcode hier auf GitHub. Die neuen Demo-URLs sind nach dem nächsten Hosting-Deployment verfügbar. Die Zahlen in den Ordnernamen kennzeichnen Code-Stände, nicht die automatisch vergebenen Kapitelnummern im Buch.

**Startseite:**  
  - [Welcome](https://learn-web-engineering.web.app/index.html)

**HTML:**  
  - [01 - html](https://learn-web-engineering.web.app/01_html/index.html)

**HTML mit CSS:**

  - [05 - like base completed](https://learn-web-engineering.web.app/02_html_css/05_like_base_complete/index.html)
  - [05 - like base with icon completed](https://learn-web-engineering.web.app/02_html_css/05_like_with_icon/index.html)
  - [06 - variables completed](https://learn-web-engineering.web.app/02_html_css/06_variables/index.html)
  - [07 - responsive completed](https://learn-web-engineering.web.app/02_html_css/07_responsive/index.html)
  - [08 - blog page preview completed](https://learn-web-engineering.web.app/02_html_css/08_blog_page_preview/index.html)
  - [09 - blog page completed](https://learn-web-engineering.web.app/02_html_css/09_blog_page_completed/index.html)


**HTML, CSS und Javascript:**

Die Backend-Beispiele benötigen für ihre API-Aufrufe zusätzlich ein laufendes lokales Backend.
- [01 - JavaScript-Grundlagen und Übungen (Code)](public/03_javascript/01_basics)
- [02 - table improvements](https://learn-web-engineering.web.app/03_javascript/02_tableImprovements/index.html)
- [03 - buttons reactive](https://learn-web-engineering.web.app/03_javascript/03_buttonReactive/index.html)
- [04_01 - Backend-Basisverbindung](https://learn-web-engineering.web.app/03_javascript/04_01_backendBaseConnection/index.html)
- [04 - backend](https://learn-web-engineering.web.app/03_javascript/04_02_connectBackend/index.html)
- [05 - like with Backend](https://learn-web-engineering.web.app/03_javascript/05_likeWithBackendIntegration/index.html)
- [06 - follow with Backend](https://learn-web-engineering.web.app/03_javascript/06_followButtonsWithBackendIntegration/index.html)

**TypeScript:**

- [Einstieg in TypeScript (Kursunterlagen)](https://learn-web-engineering.web.app/Doku/book/06_typescript/01_intro.html)

**React mit TypeScript:**

- [Einstieg in React (Kursunterlagen)](https://learn-web-engineering.web.app/Doku/book/07_react/01_intro.html)
- 02 - Blogseite mit React und TypeScript: [Demo](https://learn-web-engineering.web.app/demos/react/02_react-mit-typescript/) · [Code](public/07_react/02_react-mit-typescript)
- 04 - Buttons mit State: [Demo](https://learn-web-engineering.web.app/demos/react/04_buttons-mit-state/) · [Code](public/07_react/04_buttons-mit-state)
- 05 - Komponenten mit React: [Demo](https://learn-web-engineering.web.app/demos/react/05_components/) · [Code](public/07_react/05_components)
- 06 - Abgeschlossene Komponentenaufteilung: [Demo](https://learn-web-engineering.web.app/demos/react/06_components-complete/) · [Code](public/07_react/06_components-complete)
- 07 - Backend-Integration: [Demo](https://learn-web-engineering.web.app/demos/react/07_backend-integration/) · [Code](public/07_react/07_backend-integration)

Zum Starten im jeweiligen React-Projektordner `npm install` und danach `npm run dev` ausführen. Öffne die im Terminal angezeigte lokale URL. Die React-Projekte innerhalb dieses Repositorys starten, da sie gemeinsame Styles aus den vorherigen Beispielen verwenden. Der Stand mit Backend-Integration benötigt zusätzlich das lokale Backend.

Die gehostete Backend-Demo zeigt das Frontend, stellt aber keine API bereit. Ohne Konfiguration verwendet sie `http://localhost:3000` und ist online nur eingeschränkt nutzbar. Für eine vollständig funktionierende Online-Demo beim Build `VITE_API_URL` auf eine erreichbare HTTPS-API setzen; die API muss die Hosting-Adresse per CORS erlauben. Die anderen vier React-Demos benötigen kein Backend.

**Backend:**

- [Backend-Code](public/00_backend)
- [Backend installieren und starten](public/00_backend/readme.md)
- [Lokale API-Dokumentation](http://localhost:3000/api-docs/) (nach dem Backend-Start)

## Hosting bauen und veröffentlichen

Voraussetzungen: Node.js (für die aktuellen Vite-Versionen mindestens `22.12` oder `24`), npm und [mdBook](https://rust-lang.github.io/mdBook/guide/installation.html). Führe im Repository-Hauptverzeichnis aus:

```sh
npm run build:hosting
```

Der Befehl installiert die React-Abhängigkeiten aus den jeweiligen Lockfiles, baut das Buch und alle React-Demos und kopiert die statischen Beispiele nach `dist/hosting`. Jeder React-Stand erhält seinen eigenen Vite-Basispfad. Die Quellcode-Ordner bleiben unverändert; Backend-Code und React-Projektquellen werden nicht als Hosting-Dateien veröffentlicht. Die Build-Ausgabe ist nicht versioniert.

Für eine lokale Hosting-Vorschau nach dem Build:

```sh
npx firebase-tools emulators:start --only hosting
```

Zum Veröffentlichen mit angemeldetem Firebase-Konto und eingerichtetem Firebase-Projekt:

```sh
npx firebase-tools deploy --only hosting
```

Firebase verwendet `dist/hosting` und führt den gemeinsamen Build vor jedem Deployment automatisch aus. Ein vorheriger manueller Build ist dafür nicht erforderlich.

## Hinweise

- Die statischen Beispielseiten enthalten jeweils eine eigene `index.html` und die zugehörigen CSS- und gegebenenfalls JavaScript-Dateien. Sie benötigen keine Installation.
- Die [Startseite](public/index.html) bietet Links zu den statischen Beispielen und React-Demos; die vollständige Übersicht der Referenzstände findest du hier.
- React-Projekte und Backend benötigen Node.js und installierte Abhängigkeiten. Weitere Hinweise stehen in den jeweiligen Projekt-READMEs.
