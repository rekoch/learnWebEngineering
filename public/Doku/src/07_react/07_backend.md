# Das Backend wieder anbinden

Unsere Seite ist jetzt in Komponenten aufgeteilt. Bilder, Artikelvorschauen und Vergleichstabelle funktionieren bereits. Likes und Follow-Auswahl sind aber noch lokale Zustände, die beim Neuladen verloren gehen. In diesem Kapitel ersetzen wir diese lokale Simulation durch die bestehende Backend-Anbindung.

Ausgangspunkt ist dein Stand nach [Die Seite in Komponenten aufteilen](./06_components_abschliessen.md). Ziel ist dieselbe Funktionalität wie im [letzten JavaScript-Endstand mit Follow-Buttons](https://github.com/rekoch/learnWebEngineering/tree/main/public/03_javascript/06_followButtonsWithBackendIntegration): gespeicherte Likes, der tatsächliche Like-Zähler und die gespeicherten Follow-Zustände der Autorin und des Themas, jeweils für die ausgewählte Benutzer-ID.

Der [React-Referenzstand mit Backend](https://github.com/rekoch/learnWebEngineering/tree/main/public/07_react/07_backend-integration) liegt in `public/07_react/07_backend-integration`. Wir verwenden dasselbe Backend, keine neue Datenbank und keinen neuen API-Vertrag.

## Was bleibt, was ändert sich?

`CaptionedImage`, `ComparisonTable`, `ArticlePreview`, `ProductSummary`, `AuthorProfile`, `TopicFollowSection`, `LikeSection` und `ToggleButton` bleiben unverändert. Keine dieser Anzeigekomponenten muss HTTP verstehen.

Neu kommen hinzu:

- ein API-Service für die vorhandenen Endpunkte,
- ein eigener Hook für Request-Abläufe, State, Ladezustand und Fehler,
- eine Auswahl für Benutzer- und Blogseiten-ID,
- die Verbindung zwischen diesem Hook und den vorhandenen Props in `BlogInteractions`.

Die früheren Observer und DOM-Handler importieren wir nicht. React-State und Props übernehmen den Datenfluss innerhalb der Oberfläche. HTTP bleibt weiterhin die Verbindung zum Backend.

## Backend starten und die Adresse prüfen

Starte das Backend in einem separaten Terminal. Verwende die in `public/00_backend/.nvmrc` festgelegte Node-Version; weitere Hinweise stehen in der Backend-Anleitung:

```sh
cd public/00_backend
nvm install
nvm use
npm ci
npm run dev
```

Die Standardadresse ist `http://localhost:3000`. Unter `http://localhost:3000/api-docs/` findest du die API-Dokumentation. Prüfe auch `http://localhost:3000/likes/2`: Die Antwort muss JSON mit `likeCount` sein, nicht eine HTML-Seite eines anderen Servers.

Ist Port `3000` beispielsweise durch mdBook belegt, starte das Backend stattdessen mit:

```sh
PORT=3001 npm run dev
```

Lege dann im **React-Projektordner**, neben `package.json`, eine `.env.local` an:

```dotenv
VITE_API_URL=http://localhost:3001
```

Ohne diese Angabe verwendet der Service `http://localhost:3000`. Im Referenzstand zeigt `.env.example` die Standardkonfiguration. Nach einer Änderung an den Umgebungsvariablen musst du den Vite-Server neu starten.

`VITE_`-Variablen sind im Browser sichtbar und werden beim Build eingebunden. Die API-Adresse darf darin stehen; Passwörter und andere Geheimnisse nicht. Auch für einen Produktionsbuild musst du die korrekte API-Adresse vor dem Build setzen.

In der Entwicklungsumgebung erlaubt das bestehende Backend Zugriffe von `localhost` und `127.0.0.1` mit verschiedenen Ports. Für einen späteren produktiven Betrieb muss dessen erlaubte Frontend-Adresse entsprechend konfiguriert werden. Wir ändern diese Backend-Regeln hier nicht.

## Die vorhandenen API-Verträge

Die IDs starten wie im JavaScript-Beispiel bei Benutzer `1` und Blogseite `2`. Die Autorin wird über `nora.linden@example.org`, das Thema über `Balkongarten` identifiziert.

| Funktion | HTTP-Anfrage | Relevante Antwort |
| --- | --- | --- |
| Like-Zähler laden | `GET /likes/{blogPageId}` | `{ likeCount: number }` |
| Like-Auswahl laden | `GET /likes/state/{blogPageId}/user/{userId}` | `{ liked: boolean }` |
| Liken / Like entfernen | `POST` / `DELETE /likes/{blogPageId}` | Bestätigung des Backends |
| Autorinnen-Follow laden | `GET /author-follow/{authorEmail}/user/{userId}` | `{ isFollowedAuthor: boolean }` |
| Autorin folgen / entfolgen | `POST` / `DELETE /author-follow/{authorEmail}/user/{userId}` | Bestätigung des Backends |
| Themen-Follow laden | `GET /topic-follow/{topicName}/user/{userId}` | `{ isFollowedTopic: boolean }` |
| Thema folgen / entfolgen | `POST` / `DELETE /topic-follow/{topicName}/user/{userId}` | Bestätigung des Backends |

Beim Liken und Entfernen des Likes gehören `blogPageId` und `userId` auch in den JSON-Body. Die Follow-Endpunkte verwenden ihre Pfadparameter; wir schicken dieselben Daten wie die früheren Services zusätzlich als JSON mit.

Autorinnen- und Themen-Follows sind benutzerbezogen, nicht blogseitenbezogen. Wechsle die Blogseiten-ID: Der Like-Zähler und die Like-Auswahl können wechseln, aber derselbe Benutzer folgt weiterhin derselben Autorin und demselben Thema.

Die IDs simulieren wie bisher einen Benutzerkontext. Sie sind **kein Login und keine Authentifizierung**. Auch die Blogseiten-ID wählt hier nur den Backend-Kontext; die lokale redaktionelle Beispielseite wird dadurch nicht zu einem anderen Artikel.

## Schritt 1: HTTP in einen Service kapseln

Lege `src/services/blogApi.ts` an:

```ts
{{#include ../../../07_react/07_backend-integration/src/services/blogApi.ts}}
```

Der Service importiert kein React. Er kennt nur Kontextdaten, URLs, Request-Methoden und Antworten.

Einige Entscheidungen sind wichtig:

- `request` prüft `response.ok`. `fetch` lehnt sein Promise bei einem HTTP-Fehler wie `500` nicht automatisch ab.
- `encodeURIComponent` schützt die einzelnen Pfadwerte, etwa eine E-Mail-Adresse oder ein Thema mit Leerzeichen und Umlauten.
- `loadInteractions` lädt die vier unabhängigen Zustandswerte mit `Promise.all`. Erst ein vollständiges Ergebnis wird an die Oberfläche übergeben.
- Der interne Typ `InteractionData` vereinheitlicht die unterschiedlichen Backend-Namen zu `followsAuthor` und `followsTopic`.
- TypeScript-Typen alleine überprüfen kein empfangenes JSON. Deshalb kontrollieren wir die verwendeten Werte zusätzlich zur Laufzeit.
- Der `AbortSignal` wird an `fetch` weitergegeben. Ein nicht mehr benötigter Request kann dadurch abgebrochen werden.

Wie im alten JavaScript-Stand fragen wir vor einer Änderung den aktuellen Auswahlzustand erneut ab. Daraus ergibt sich `POST` oder `DELETE`. Nach der bestätigten Änderung laden wir Auswahl und Zähler wieder vom Server. Wir berechnen den gespeicherten Zähler nicht einfach aus einem möglicherweise veralteten lokalen Wert.

Das ist keine atomare Transaktion zwischen mehreren Browsern: Zwischen Lesen und Schreiben kann ein anderer Client etwas ändern. Für unser Beispiel übernehmen wir den vorhandenen Backend-Vertrag; eine serverseitige atomare Toggle-Operation wäre eine separate API-Änderung.

## Schritt 2: Requests und State in einem Hook zusammenhalten

Ein **Custom Hook** ist eine Funktion, die mit `use` beginnt und andere Hooks verwenden darf. Er gibt hier keine Oberfläche zurück, sondern Zustandswerte und Aktionen, die eine Komponente verwenden kann.

Lege `src/hooks/useBlogInteractions.ts` an:

```ts
{{#include ../../../07_react/07_backend-integration/src/hooks/useBlogInteractions.ts}}
```

`data` beginnt als `null`: Wir kennen den gespeicherten Zustand noch nicht. Wir tun deshalb weder so, als wären alle Buttons sicher inaktiv, noch zeigen wir den früheren festen Zähler `59` als Backend-Ergebnis an.

`pending` zeigt an, dass ein Request läuft. `error` enthält eine verständliche Fehlermeldung. Diese Angaben sind State, weil sich die sichtbare Oberfläche danach richtet.

### Warum hier ein Effect nötig ist

Anders als bei der Tabelle synchronisieren wir jetzt mit einem **externen System**. Beim Einhängen der Komponente und bei einem geänderten Kontext müssen die gespeicherten Daten geladen werden. Das ist die Aufgabe von `useEffect`.

Die Effect-Funktion selbst ist nicht `async`, weil React von ihr eine Cleanup-Funktion erwartet, kein Promise. Sie startet `loadInteractions` und verarbeitet dessen Ergebnis. Ihre Abhängigkeiten nennen alle Kontextwerte, die für diese Anfrage relevant sind.

Beim Aufräumen ruft React `controller.abort()` auf. Zusätzlich prüfen die Promise-Handler `signal.aborted`, bevor sie State setzen. Eine späte Antwort für Benutzer `1` darf nicht die Anzeige für Benutzer `2` überschreiben.

Im Entwicklungsmodus kann `StrictMode` den Effect zum Prüfen starten, aufräumen und erneut starten. Das ist kein Grund, `StrictMode` zu entfernen. Unsere Cleanup-Funktion macht den Ablauf verträglich; Schreibzugriffe erfolgen nur nach einer Benutzeraktion, nicht im Effect.

### Warum Klicks kein Effect sind

Ein Klick startet direkt eine Aktion. Der Handler sperrt weitere Aktionen, schreibt über den Service und lädt danach den bestätigten Zustand. Dafür brauchen wir keinen zusätzlichen Effect, der einen «Button wurde geklickt»-State beobachtet.

`busyRef` verhindert auch zwei unmittelbar aufeinanderfolgende Aufrufe, bevor React den deaktivierten Button gerendert hat. Eine Ref behält einen Wert zwischen Renderdurchläufen, ohne selbst ein Rendern auszulösen. Die sichtbare Sperre kommt weiterhin aus `pending` im State. `controllerRef` hält den Controller für die laufende Instanz bereit.

Bei einem Fehler bleibt eine bereits bestätigte Anzeige erhalten; die Oberfläche erfindet keinen erfolgreichen neuen Zustand. «Erneut laden» holt den tatsächlichen Serverzustand. Das ist besonders wichtig, wenn der Schreibrequest erfolgreich war, aber das anschliessende Nachladen fehlschlug.

Ein Abbruch auf Clientseite kann eine bereits auf dem Server gespeicherte Änderung nicht zurücknehmen. Er verhindert vor allem, dass deren späte Antwort die inzwischen gewechselte Oberfläche überschreibt.

## Schritt 3: Die bestehenden Anzeigekomponenten verbinden

Ersetze `src/components/BlogInteractions.tsx` durch:

```tsx
{{#include ../../../07_react/07_backend-integration/src/components/BlogInteractions.tsx}}
```

Die vier lokalen `useState`-Aufrufe und die lokale Zählerberechnung sind weg. Der Hook liefert stattdessen Daten und Aktionen. `LikeSection` bekommt wie vorher Auswahl, Anzahl und Callback. Die beiden `ToggleButton`-Instanzen bekommen wie vorher Auswahl, Beschriftungen und Callback.

Genau dafür haben wir die Grenzen im letzten Kapitel gewählt. Die Anzeige muss nicht entscheiden, ob die Aktion lokalen State verändert oder eine HTTP-Anfrage ausführt.

Während des Ladens und Speicherns sind die Aktionen deaktiviert. Ohne erfolgreich geladene Daten bleibt der Like-Zähler verborgen. Fehler werden mit `role="alert"`, Ladehinweise mit `role="status"` zugänglich angezeigt.

Falls dasselbe Thema später an zwei Stellen angezeigt wird, verwende für beide Buttons denselben `data.followsTopic`-Wert und denselben `toggleTopic`-Callback aus **einer gemeinsamen Hook-Instanz**. Zwei getrennte Hooks würden eigene lokale Anzeigen besitzen und sich nach einem Klick nicht automatisch gegenseitig aktualisieren. In React lösen wir die frühere Suche nach allen passenden DOM-Buttons durch gemeinsam verwendeten State.

## Schritt 4: Benutzer- und Blogseitenwechsel

Lege `src/components/ContextSelection.tsx` an:

```tsx
{{#include ../../../07_react/07_backend-integration/src/components/ContextSelection.tsx}}
```

Die beiden Eingaben sind kontrolliert: Ihr Wert kommt aus State, `onChange` aktualisiert ihn. Erst beim Absenden des Formulars mit «Daten simulieren» oder Enter wird der neue Kontext übernommen. So lösen einzelne Tastendrücke nicht sofort Backend-Anfragen aus.

Das Formular akzeptiert positive ganze IDs. Es simuliert die Auswahl für die Übung und ist weiterhin kein Login. Ergänze die Styles in `src/css/components/ContextSelection.css`:

```css
{{#include ../../../07_react/07_backend-integration/src/css/components/ContextSelection.css}}
```

Ergänze am Anfang von `src/css/main.css` nach den bestehenden Imports:

```css
@import url("components/ContextSelection.css");
```

Alle Styles bleiben unter `src/css` und werden über den bestehenden Import in `main.tsx` geladen. In `ContextSelection.tsx` ist kein CSS-Import nötig.

Ersetze `App.tsx` durch den zusammengesetzten Endstand:

```tsx
{{#include ../../../07_react/07_backend-integration/src/App.tsx}}
```

`selection` gehört nach `App`, weil sowohl Formular als auch Interaktionsbereich diesen Kontext brauchen. Der redaktionelle Inhalt bleibt davon unabhängig.

Das Simulationsformular steht oberhalb des Videos und ausserhalb von `<main>`. Es dient nur zum Testen unterschiedlicher Benutzer- und Blogseiten-IDs und ist kein Bestandteil der eigentlichen Blogseite. «Daten simulieren» wechselt diesen Testkontext; die Zustandsdaten kommen weiterhin vom echten Backend.

Der `key` am Interaktionsbereich kombiniert Benutzer- und Blogseiten-ID. Bei einem Wechsel ersetzt React bewusst die bisherige Instanz: Deren Requests werden aufgeräumt, und die neue beginnt mit `data: null`. So erscheint nicht vorübergehend der alte Auswahlzustand als Zustand des neuen Benutzers.

Im aktuellen Beispiel sind Autorin und Thema feste Seitendaten. Würden auch sie auswählbar, müssten ihre Identitäten ebenfalls in diesen Key einfliessen. Der Hook wird hier zusammen mit dieser gezielten Instanzgrenze verwendet.

Ein Neuladen startet die Kontextauswahl wieder bei Benutzer `1` und Seite `2`, wie im alten Beispiel. Die Backend-Daten sind trotzdem gespeichert. Für einen zuvor ausgewählten anderen Benutzer oder eine andere Seite musst du denselben Kontext erneut auswählen.

## Der vollständige Datenfluss

```text
App: ausgewählter Benutzer und Blogseite
  -> BlogInteractions
     -> useBlogInteractions
        -> blogApi -> vorhandenes Backend -> SQLite
        <- bestätigte Daten
     -> Props an LikeSection und ToggleButton

Klick auf einen ToggleButton
  -> Callback aus BlogInteractions
  -> Hook sperrt Aktionen
  -> aktuellen Serverzustand lesen
  -> POST oder DELETE
  -> bestätigte Daten erneut laden
  -> State aktualisieren
  -> React rendert die neue Auswahl und den neuen Zähler
```

Die Tabelle bleibt dagegen rein datengetrieben und braucht weiterhin keinen Effect. Dass beide Komponenten JavaScript-Logik enthalten, bedeutet nicht, dass beide denselben Hook benötigen.

## Deinen Stand prüfen

Starte Backend und React-Projekt in getrennten Terminals. Prüfe zuerst in den Browser-Entwicklerwerkzeugen die Requests und anschliessend das Verhalten:

1. **Initiales Laden:** Für Benutzer `1` und Seite `2` erscheinen der tatsächliche Zähler und die gespeicherten Auswahlzustände. Keine feste `59` wird angenommen.
2. **Likes:** Ein Klick setzt oder entfernt den Like. Die Anzeige übernimmt den danach vom Backend gelieferten Zähler.
3. **Follow:** Autorinnen- und Themen-Follow lassen sich unabhängig ein- und ausschalten.
4. **Persistenz:** Lade die Seite neu. Für denselben Kontext bleibt die gespeicherte Auswahl bestehen.
5. **Benutzerwechsel:** Wechsle die Benutzer-ID. Der neue Benutzer bekommt seine eigenen Zustände; der Zähler bleibt die Anzahl aller Likes dieser Blogseite.
6. **Seitenwechsel:** Wechsle die Blogseiten-ID. Likes gehören zur neuen Seite; Autorinnen- und Themen-Follows bleiben für denselben Benutzer erhalten.
7. **Schnelle Wechsel:** Mit gedrosseltem Netzwerk darf eine alte Antwort nicht den neu gewählten Kontext überschreiben.
8. **Mehrfachklicks:** Während einer Anfrage sind die Buttons gesperrt. Ein schneller Doppelklick löst nicht zwei Schreibabläufe aus.
9. **Fehler:** Stoppe das Backend oder blockiere einen Request. Eine Fehlermeldung erscheint, ohne einen erfolgreichen Klick vorzutäuschen. Nach Wiederherstellung lädt «Erneut laden» den tatsächlichen Zustand.
10. **Darstellung:** Bilder, Vorschauen und Balken funktionieren weiterhin auch bei schmalem Fenster. Die Backend-Arbeit verändert die Vergleichstabelle nicht.

Im Referenzstand prüfen `npm test`, `npm run build` und `npm run lint` zusätzlich die verwendeten API-Verträge, HTTP-Fehler und ungültige Antworten. Die Service-Tests verwenden simulierte Antworten; die Persistenzprüfung oben benötigt ausdrücklich das echte Backend.

## Abschluss

Die Funktionen des früheren JavaScript-Endstands sind jetzt wieder vorhanden: Vergleichsbalken, Like-Auswahl und Zähler sowie beide gespeicherten Follow-Zustände. Neu ist die Struktur: Die Oberfläche setzt sich aus Komponenten zusammen, die Anzeige entsteht aus State und Props, und die Backend-Arbeit ist getrennt von der Darstellung.

Wir haben nicht einfach die alten DOM-Skripte in React geladen, sondern ihre Aufgaben in den React-Datenfluss übertragen. Die Component-Aufteilung ist damit abgeschlossen; weitere Bausteine sollten aus neuen Anforderungen entstehen, nicht aus dem Wunsch nach möglichst vielen Dateien.

Im [Abschlusskapitel](./08_abschluss.md) vergleichen wir die beiden Endstände und fassen zusammen, was wir im React-Teil gelernt haben.