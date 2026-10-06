# Blogseite mit React und Backend

Der Referenzstand zum Kapitel «Das Backend wieder anbinden». Ausgangspunkt ist `../06_components-complete`.

Die Anzeige-Komponenten bleiben unverändert. `src/services/blogApi.ts` verwendet die bestehenden Like-, Autoren-Follow- und Themen-Follow-Endpunkte. `src/hooks/useBlogInteractions.ts` koordiniert Requests, bestätigte Daten, Klicksperren, Cleanup und Fehler. `ContextSelection` erlaubt Benutzer- und Blogseitenwechsel; gestartet wird mit Benutzer 1 und Seite 2.

Likes und Follows werden im vorhandenen SQLite-Backend gespeichert, nicht in lokalem Browser-State simuliert. Die ID-Auswahl ist keine Authentifizierung. Ein Neuladen setzt nur die Kontextauswahl auf 1 und 2 zurück, nicht die Backend-Daten.

## Starten

Starte zuerst `public/00_backend` in einem separaten Terminal nach dessen Anleitung. Verwende dort die Node-Version aus `.nvmrc` und `npm ci`, danach `npm run dev`. Die Standardadresse ist `http://localhost:3000`.

Falls Port 3000 durch einen anderen Server belegt ist, starte das Backend mit `PORT=3001 npm run dev` und setze im React-Projekt in `.env.local`:

```dotenv
VITE_API_URL=http://localhost:3001
```

Ohne Konfiguration gilt `http://localhost:3000`; `.env.example` enthält diese Standardadresse. Nach Änderungen den Vite-Server neu starten. `VITE_`-Variablen sind öffentlich und enthalten keine Geheimnisse.

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

- Der tatsächliche Like-Zähler und die Auswahlzustände werden geladen.
- Like, Autoren-Follow und Themen-Follow bleiben für denselben Kontext nach Neuladen gespeichert.
- Benutzerwechsel lädt benutzerspezifische Auswahl; Seitenwechsel betrifft Likes, nicht Follows zur selben Autorin bzw. zum selben Thema.
- Während Requests sind die Aktionen gesperrt; Fehler sind sichtbar und können mit «Erneut laden» behoben werden.
- Bilder, Artikelvorschauen und die Vergleichsbalken funktionieren unverändert.

Die Tests verwenden simulierte API-Antworten. Die Persistenzprüfung benötigt das echte Backend.

Das Kapitel liegt unter `../../Doku/src/07_react/07_backend.md`.