# Mit dem KI-Tutor lernen

Du kannst diesen Kurs entweder Kapitel für Kapitel lesen oder dieselben Themen interaktiv mit dem **Web-Engineering-Tutor** bearbeiten. Beide Wege verwenden die Kursunterlagen und führen dich beim Aufbau der Blogseite von HTML und CSS über JavaScript bis zu TypeScript, React und der Backend-Anbindung. Du kannst jederzeit zwischen Buch und Tutor wechseln.

Der Tutor erklärt ein Konzept, stellt dir eine Aufgabe und gibt Rückmeldung zu deinem Code. Du schreibst die Lösung selbst. Themen, Reihenfolge und Niveau bestimmst du mit. Die KI kann Fehler machen: Frage nach Begründungen und prüfe das Ergebnis im Browser oder mit passenden Tests.

## Voraussetzungen

- [VS Code](./vsCode.md) mit einem MCP-fähigen KI-Assistenten, zum Beispiel GitHub Copilot im Agent-Modus. Der Modellzugang kann ein Konto oder ein kostenpflichtiges Abo erfordern. Verfügbare Werkzeuge können von Einstellungen deiner Organisation abhängen.
- [Node.js und npm](./node.md), mindestens Node.js 22.12; empfohlen ist Node.js 24 LTS.
- Eine lokale Kopie des vollständigen [Kurs-Repositorys](https://github.com/rekoch/learnWebEngineering). Die gehostete Buchseite allein reicht nicht.
- Einen eigenen Arbeitsordner für deine Aufgaben. Bearbeite nicht die fertigen Referenzstände oder die Buchquellen.

MCP verbindet deinen KI-Assistenten mit den Kursinhalten und dem Lernstand. Der lokale Tutor-Server enthält kein eigenes Sprachmodell. Du brauchst dafür keinen zusätzlichen API-Key im Kursprojekt. Dein KI-Assistent benötigt weiterhin seinen Modellzugang und kann gelesene Inhalte an seinen Anbieter übertragen. Teile keine Passwörter, Tokens oder vertraulichen Daten mit ihm.

## Installation in VS Code

### 1. Repository öffnen

Klone das Repository oder lade es auf GitHub über **Code > Download ZIP** herunter und entpacke es. Öffne in VS Code den Repository-Hauptordner `learnWebEngineering`, nicht nur einen Unterordner. Darin müssen unter anderem `package.json`, `public` und `tutor` liegen.

### 2. Tutor installieren

Öffne ein Terminal im Repository-Hauptordner:

```sh
node --version
npm --version
npm run tutor:install
npm run tutor:test
```

Der letzte Befehl prüft den Server und seine Verbindung zu einem MCP-Client. Er benotet keine persönlichen Aufgaben. Für die Tutor-Installation brauchst du weder mdBook noch Firebase oder ein laufendes Backend. Für spätere Aufgaben gelten zusätzlich die Voraussetzungen des jeweiligen Kapitels.

### 3. MCP-Server eintragen

Lege im Repository-Hauptordner die Datei `.vscode/mcp.json` an. Eine Vorlage findest du im Repository unter `tutor/mcp.vscode.json`.

```json
{
  "servers": {
    "web-engineering-tutor": {
      "type": "stdio",
      "command": "npm",
      "args": ["--silent", "--prefix", "${workspaceFolder}/tutor", "start"],
      "env": {
        "TUTOR_WORKSPACE": "${workspaceFolder}"
      }
    }
  }
}
```

Falls die Datei bereits existiert, ergänze nur den Eintrag `web-engineering-tutor` im bestehenden `servers`-Objekt. Erhalte die anderen Server. `${workspaceFolder}` wird von VS Code ersetzt; trage dort nicht den eigenen Benutzernamen ein. Die lokale Konfigurationsdatei wird absichtlich nicht mit Git versioniert.

### 4. Server und Chat starten

Öffne `.vscode/mcp.json` und starte den Server über **Start** oberhalb seines Eintrags. Bestätige das Vertrauen in den lokalen Server nur, wenn du die Quelle geprüft hast. Alternativ findest du ihn über **MCP: List Servers** in der Befehlspalette; Bezeichnungen können je nach VS-Code-Version abweichen.

Öffne einen neuen KI-Chat im **Agent-Modus**. Prüfe in der Werkzeugauswahl, dass die Werkzeuge von `web-engineering-tutor` verfügbar und freigegeben sind. Du solltest beispielsweise `list_topics`, `get_progress` und `start_tutor` sehen.

Den Server musst du nicht zusätzlich mit `npm run tutor:start` im Terminal starten. Dieser Befehl wartet lediglich auf einen MCP-Client und öffnet keine Chatoberfläche oder Webseite. VS Code startet den Prozess für dich.

## Deine erste Lerneinheit

Starte zum Beispiel mit diesem Prompt:

> Starte den Web-Engineering-Tutor. Verwende zuerst get_progress und zeige mir die verfügbaren Themen. Ich möchte die Blogseite selbst entwickeln. Frage mich nach meinem Niveau und meinem eigenen Arbeitsordner. Gib mir Aufgaben und Hinweise, aber implementiere die Lösungen nicht für mich.

Der Tutor klärt mit dir:

- **Themen:** HTML, CSS, JavaScript, TypeScript, React oder Backend-Anbindung. Mehrere Themen sind möglich.
- **Niveau:** Einstieg (`beginner`), fortgeschritten (`intermediate`) oder erfahren (`experienced`). Das Niveau kann je Thema unterschiedlich sein.
- **Voraussetzungen:** Sollen notwendige Grundlagen in den Plan aufgenommen werden oder beherrschst du sie bereits?
- **Arbeitsordner:** Wo liegt dein eigenes Projekt? Nenne den absoluten Pfad. Falls es ausserhalb des geöffneten Workspace liegt, füge es als weiteren Workspace-Ordner hinzu oder öffne es für die freigegebenen Editor-Werkzeuge. Lass den Kursordner weiterhin geöffnet.

Für einen einfachen Einstieg kannst du im Kurs-Repository einen eigenen Ordner `lernprojekte/meine-blogseite` anlegen. Dieser Bereich ist von Git ausgeschlossen. Die fertigen Beispiele unter `public` bleiben unverändert. Bei React hilft dir der Tutor später, ein eigenes Vite-Projekt mit eigenständigen Styles anzulegen.

Ein möglicher Wunsch lautet:

> Ich kenne HTML und CSS bereits. Ich möchte JavaScript auf Einstiegsniveau lernen, danach TypeScript und React. Prüfe meine Vorkenntnisse kurz. Mein Arbeitsordner ist ... . Zeige mir den Plan, bevor wir anfangen.

Das Niveau verändert Erklärung, Aufgabengröße und Hilfestellung, nicht die Korrektheitserwartungen. Jedes Modul entspricht etwa einem Buchkapitel und ist in Teilschritte gegliedert. Auf Einstiegsniveau erhältst du jeweils einen Schritt, auf mittlerem Niveau ein bis zwei Schritte, auf erfahrenem Niveau das Gesamtziel. Zu jedem Schritt nennt dir der Tutor ein kleines Beispiel und Inspirationsquellen. Ist dir ein Schritt zu gross, sage zum Beispiel: *Mach den nächsten Schritt kleiner und zeige mir ein Beispiel.* Ein höheres Niveau markiert Grundlagen nicht automatisch als bestanden. Für spätere Module brauchst du ausserdem den passenden Code-Ausgangsstand; der Tutor soll ihn vor Beginn mit dir klären.

## So läuft das Lernen ab

1. Der Tutor lädt die passende Lektion aus diesem Kurs und erklärt kurz das Konzept.
2. Du erhältst eine Aufgabe mit beobachtbaren Zielen.
3. Du schreibst und prüfst deinen Code selbst.
4. Sobald du fertig bist, zeigt dir der Tutor eine Auswahl mit Schaltflächen: **Fertig, bitte prüfen**, **Ich brauche einen Hinweis**, **Schritt kleiner machen** oder **Noch nicht fertig / Pause**. Du musst nichts tippen. Unterstützt dein Client diese Abfrage nicht, fragt der Tutor stattdessen im Chat nach. Gib dem Assistenten bei Bedarf Zugriff auf deine Dateien und erlaube gezielte Tests oder Browserprüfungen.
5. Der Tutor prüft die Kriterien, fragt nach deinem Verständnis und speichert seine begründete Beurteilung.

Erlaubst du keine Code- oder Verhaltensprüfung, kann der Tutor erklären und Hinweise geben, aber keinen verlässlichen Prüferfolg behaupten. Ein erfolgreicher Build allein prüft beispielsweise noch nicht, ob ein Like-Button korrekt toggelt. Die Fortschrittsanzeige ist eine KI-Beurteilung, kein Zertifikat.

## Themen und Hilfe steuern

| Dein Wunsch | Beispielprompt |
| --- | --- |
| Lernplan sehen | Zeige meinen Plan und die nächste offene Aufgabe. |
| Kleine Hilfe | Gib mir nur einen kleinen Hinweis, noch keinen Code. |
| Mehr Unterstützung | Zerlege die aktuelle Aufgabe in kleinere Schritte. |
| Niveau ändern | Stelle React auf beginner; JavaScript bleibt intermediate. |
| Thema wechseln | Ich möchte CSS-Variablen lernen. Kläre zuerst Voraussetzungen und Ausgangsstand. |
| Verständnis prüfen | Stelle mir eine Frage zu meinem Code, bevor wir weitergehen. |
| Lösung ansehen | Ich möchte die vollständige Lösung sehen. Markiere das als Lösung erhalten. |
| Überspringen | Überspringe dieses Modul nach Rückfrage, ohne es als bestanden zu markieren. |

Der Tutor verändert deinen Code standardmäßig nicht. Falls du bewusst eine automatische Umsetzung oder das Kopieren eines vorbereiteten Projektstands wünschst, sage das ausdrücklich. Die Tutor-Regeln sind keine technische Zugriffssperre für den KI-Assistenten: Prüfe seine Werkzeugfreigaben und geplanten Aktionen. Installationen und Ausführung fremden Codes brauchen deine Zustimmung. Zugangsdaten und Deployments gehören nicht zum Tutor-Ablauf.

## Pause und Wiederaufnahme

Der Lernstand liegt lokal in deinem Benutzerverzeichnis unter `~/.learn-web-engineering/<workspace-hash>/progress.json`. Den konkreten Speicherordner kann der Tutor mit `get_progress` anzeigen. Dort stehen Themen, Niveau, eigener Projektpfad und die Beurteilung pro Modul. Der Server speichert keine komplette Chat-Historie; für die Historie deines KI-Clients gelten dessen eigene Einstellungen.

Der Status unterscheidet **bearbeitet**, **vom Tutor geprüft**, **übersprungen** und **Lösung erhalten**. Überspringen oder Anzeigen einer Lösung wird nicht als selbstständig bestanden gewertet.

Zum Fortsetzen öffnest du denselben Kurs-Workspace und startest einen neuen Agent-Chat:

> Setze meinen Web-Engineering-Tutor fort. Lade get_progress, prüfe den aktuellen Code in meinem Projekt und zeige mir die nächste offene Aufgabe.

Verwende pro Lernstand nur eine aktive Tutor-Serverinstanz. Verschiebst du das Kurs-Repository, ändert sich der Standard-Speicherort. Für ein unabhängiges zweites Lernprojekt kannst du in der MCP-Konfiguration zusätzlich `TUTOR_STATE_DIR` auf einen eigenen absoluten Ordner setzen. Starte den Server danach neu. Sichere deine Fortschrittsdatei bei gestopptem Server; der Projektcode wird dadurch nicht mitgesichert. Verwende für eigene Code-Checkpoints bei Bedarf Git in deinem Lernprojekt.

## Wenn etwas nicht funktioniert

- **Keine Tutor-Werkzeuge sichtbar:** Agent-Modus, Werkzeugauswahl und laufenden MCP-Server prüfen; nach dem Start einen neuen Chat öffnen.
- **Der Assistent antwortet nur allgemein:** Bitte ausdrücklich um `get_progress`, `list_topics` und danach `get_lesson`. Er soll Kursquellen über `get_course_material` laden.
- **npm oder tsx wird nicht gefunden:** Node-Version und Repository-Hauptordner prüfen; `npm run tutor:install` erneut ausführen. Nach einer Node-Installation VS Code neu starten.
- **Server startet nicht:** Die MCP-Ausgabe in VS Code ansehen und `npm run tutor:test` im Repository ausführen. Stelle sicher, dass `${workspaceFolder}` auf den Kursordner zeigt. Bei einem Multi-Root-Workspace kann ein expliziter absoluter Kursordnerpfad in `args` und `TUTOR_WORKSPACE` erforderlich sein.
- **Backend-Aufgabe scheitert:** Der Tutor-Server ist nicht das Kurs-Backend. Dieses musst du für die entsprechenden Lektionen separat nach Kursanleitung starten.
- **Lernstand fehlt:** Gleichen Workspace-Pfad und gegebenenfalls `TUTOR_STATE_DIR` prüfen. Ein neuer Chat allein löscht den Lernstand nicht.
- **Fortschrittsdatei ist beschädigt:** Server stoppen und Datei sichern. Repariere sie oder benenne sie für einen bewussten Neustart um. Der Server überschreibt fehlerhafte Daten nicht automatisch.

Das Buch bleibt deine Referenz: Du kannst jederzeit das passende Fachkapitel nachlesen und danach im Tutor weiterarbeiten.