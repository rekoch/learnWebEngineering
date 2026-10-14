# Web-Engineering-Tutor

Lokaler MCP-Server fuer den vorhandenen Kurs. Der KI-Assistent des MCP-Clients uebernimmt das Unterrichten. Der Server selbst verwendet kein Modell, benoetigt keinen API-Key, startet keine Shell-Befehle und veraendert keinen Lerncode. Er liefert Kursquellen, Aufgaben, Tutor-Regeln und einen lokalen Lernstand.

Die vollstaendige Anleitung fuer Lernende steht im [Buchkapitel zum KI-Tutor](../public/Doku/src/02_setup/aiTutor.md).

## Installation und Start

Voraussetzungen: Node.js ab 22.12 und npm. Im Repository-Hauptverzeichnis:

```sh
npm run tutor:install
npm run tutor:test
```

Uebertrage die Serverdefinition aus [mcp.vscode.json](mcp.vscode.json) in die MCP-Konfiguration deines VS-Code-Arbeitsbereichs. Erhalte dabei andere Servereintraege. VS Code muss das Repository als Arbeitsordner geoeffnet haben. Starte den Server ueber die MCP-Konfiguration und oeffne einen Agent-Chat mit freigegebenen Tutor-Werkzeugen. Die lokale VS-Code-Konfiguration wird im Repository absichtlich nicht versioniert; die Vorlage dagegen schon.

Beispielprompt:

> Starte den Web-Engineering-Tutor. Frage mich nach Themen, Niveau und meinem eigenen Projektordner. Pruefe zuerst meinen vorhandenen Lernstand. Ich moechte den Kurs interaktiv statt durch Lesen des Tutorials bearbeiten und die Aufgaben selbst loesen.

`npm run tutor:start` startet lediglich den MCP-Prozess fuer einen Client, keine Webseite und keinen selbstaendigen Terminal-Chat. Der Client startet und beendet den Server normalerweise selbst. Die MCP-Konfiguration verwendet `--silent`, damit npm keine Startbanner in den stdio-Protokollkanal schreibt.

## Werkzeuge

| Tool | Funktion |
| --- | --- |
| `list_topics` | Module und Voraussetzungen anzeigen |
| `start_tutor` | Erstes Profil erstellen und Tutor-Regeln liefern |
| `get_progress` | Profil, Plan, Ergebnisse und Tutor-Regeln laden |
| `update_profile` | Themen, Niveau und Arbeitsordner anpassen |
| `get_lesson` | Aktuelles oder gezielt gewaehltes Modul liefern |
| `get_course_material` | Originale Markdown-Quellen eines Moduls laden |
| `update_progress` | Beurteilung mit Kriterienbelegen speichern |
| `ask_ready` | Auswahl mit Schaltflaechen (fertig, Hinweis, kleiner, Pause) per MCP-Elicitation anzeigen; ohne Client-Unterstuetzung liefert es `available: false` und der Assistent fragt anders nach |

Themen: `html`, `css`, `javascript`, `typescript`, `react`, `backend`. Niveaus: `beginner`, `intermediate`, `experienced`. `topicLevels` erlaubt pro Thema ein anderes Niveau; nicht gesetzte Themen verwenden `level`. Bei `update_profile` ersetzt `topicLevels` die bisherigen Einzelwerte. `includePrerequisites` bestimmt, ob Voraussetzungen zum Plan hinzugefuegt werden. Ohne sie muss der Tutor vorhandene Kenntnisse und einen passenden Projektstart klaeren.

## Lernstand und Grenzen

Standard: `~/.learn-web-engineering/<workspace-hash>/progress.json`. Der Hash basiert auf dem absoluten Repository-/Workspace-Pfad, nicht auf persoenlichen Daten. `TUTOR_WORKSPACE` legt diesen Bezug fest; `TUTOR_STATE_DIR` kann stattdessen einen eigenen absoluten Speicherordner vorgeben. Verwende pro Speicherordner nur eine aktive Tutor-Serverinstanz. Verschieben des Repositorys aendert den Standard-Speicherort. Ein anderes Projekt sollte einen eigenen Speicherordner erhalten.

Status: `practiced` (bearbeitet), `verified` (vom Tutor geprueft), `skipped` (uebersprungen), `solution_shown` (Loesung erhalten). Fuer `verified` sind ein Beleg pro nummeriertem Kriterium, eine Pruefzusammenfassung und die dokumentierte Verstaendnisantwort erforderlich. Der Server validiert diese Angaben, prueft aber den Lerncode nicht selbst. Die Beurteilung ist keine unabhaengige Zertifizierung. Beim Wiederaufnehmen muss der Assistent den aktuellen Code erneut ansehen.

Nur der Lernstand wird geschrieben, mit restriktiven Dateirechten und atomarem Ersetzen. Beschaedigte Dateien werden nicht stillschweigend ueberschrieben. Sichere oder benenne die Fortschrittsdatei bei gestopptem Server um, wenn du bewusst neu anfangen willst. Der Server speichert keine Chat-Historie. Der KI-Client kann trotzdem Inhalte an seinen Modellanbieter senden; dessen Datenschutz- und Kostenregeln gelten.

Die Tutor-Regeln sind Anweisungen an das Modell, keine technische Zugriffssperre fuer den gesamten Agenten. Beschraenke dessen Werkzeuge und Freigaben entsprechend. Installationen, Tests und Builds laufen nur ueber freigegebene Client-Werkzeuge; der Server selbst fuehrt keinen Lerncode aus. Es gibt keinen Remote-HTTP-Endpunkt und keine Benutzerverwaltung. Firebase Hosting bleibt unveraendert.

## Inhalte pflegen

[src/curriculum.ts](src/curriculum.ts) enthaelt stabile Modul-IDs, Quellenverweise, Voraussetzungen und je Modul Ausgangsstand (`starter`, optional `fallbackStart`), kleines allgemeines Beispiel, Teilschritte (`steps`), Inspirationsquellen, Gesamtaufgabe, Hinweise und Kriterien sowie die Tutor-Regeln. Module orientieren sich an den Buchunterkapiteln; sehr umfangreiche Kapitel sind in mehrere Module geteilt. Das Niveau steuert nur das Tempo (`teachingStyles`): Einstieg ein Schritt, mittel ein bis zwei Schritte, erfahren das Gesamtziel. Fachtexte bleiben in den Buchquellen. Neue Fachkapitel auch hier zuordnen. Bestehende IDs nicht ohne Migration umbenennen, da Fortschritt darauf verweist; zeigt die aktuelle Lektion eines alten Lernstands auf eine entfernte ID, springt der Server beim Laden auf die naechste offene Lektion.

```sh
npm run tutor:test
```

Die Tests pruefen TypeScript, Quellenexistenz, Buchabdeckung, Themenfilter, Voraussetzungen, Speichern/Wiederaufnahme, Kriterienbelege, parallele Updates innerhalb einer Instanz und den echten MCP-stdio-Transport mit der VS-Code-Startkonfiguration. Sie ersetzen keinen manuellen didaktischen Durchlauf mit einem KI-Modell.