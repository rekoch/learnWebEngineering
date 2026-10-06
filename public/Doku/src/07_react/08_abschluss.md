# Abschluss: Von JavaScript zu React

Unsere Blogseite kann wieder alles, was sie am Ende des JavaScript-Teils konnte: Vergleichsbalken darstellen, Beiträge liken und einer Autorin oder einem Thema folgen. Die Zustände werden weiterhin im selben Backend gespeichert. Für die Benutzerinnen und Benutzer ist die Seite damit weitgehend dieselbe geblieben. Für uns als Entwicklerinnen und Entwickler hat sich ihr Aufbau deutlich verändert.

Vergleiche dazu die beiden Endstände:

- [JavaScript mit Backend und Follow-Buttons](https://github.com/rekoch/learnWebEngineering/tree/main/public/03_javascript/06_followButtonsWithBackendIntegration)
- [React mit Komponenten und Backend](https://github.com/rekoch/learnWebEngineering/tree/main/public/07_react/07_backend-integration)

## Weniger selbst organisierter Datenfluss

Im JavaScript-Stand haben wir einen eigenen Observer eingesetzt. Ein Benutzerwechsel löste ein Event aus, verschiedene Handler abonnierten dieses Event und luden ihre Daten nach. Anschliessend mussten sie die passenden DOM-Elemente suchen und Buttontexte, CSS-Klassen und Zähler aktualisieren. Auch zuletzt ausgesendete Werte und das Zusammenspiel der Handler haben wir selbst verwaltet.

Im React-Stand brauchen wir diese zusätzliche Observer-Schicht nicht mehr. Der ausgewählte Benutzer und die Blogseiten-ID liegen in State. Wir geben sie als Props weiter, laden die zugehörigen Backend-Daten und aktualisieren den Zustand. React leitet daraus die Anzeige ab.

Statt bei jeder Änderung mehrere Stellen der Oberfläche von Hand anzupassen, beschreiben wir einmal, **wie die Oberfläche für den aktuellen Zustand aussehen soll**. Ein Button erhält beispielsweise seine Auswahl und seine Beschriftungen. Ändert sich die Auswahl, rendert React den passenden Text und das passende Aussehen.

Das macht den Datenfluss unserer Seite einfacher nachvollziehbar: Wir sehen, wo ein Wert liegt, welche Komponente ihn erhält und welcher Callback ihn verändern kann. Einen eigenen globalen Event-Verteiler müssen wir dafür nicht mehr pflegen.

## Wiederverwendbare Bausteine statt wiederholter Blöcke

Die Seite ist nicht mehr ein grosser HTML- bzw. JSX-Block mit danebenliegenden DOM-Skripten. `App` setzt klar benannte Bausteine zusammen.

Die Artikelvorschauen verwenden dieselbe Komponente mit unterschiedlichen Daten. `CaptionedImage` beschreibt den gemeinsamen Aufbau von Bild und Legende. `ComparisonTable` hält die Darstellung und die dazugehörige Balkenberechnung zusammen. `ToggleButton` kennt weder Autorinnen noch Themen, sondern nur Auswahl, Beschriftungen und eine Aktion.

Dadurch müssen wir Änderungen am gemeinsamen Aufbau nur noch einmal vornehmen. Ein weiterer Artikel braucht einen Datensatz statt einer neuen JSX-Kopie. Eine andere Vergleichstabelle braucht andere Messreihen, nicht eine Kopie des Tabellen-Skripts.

Die Komponenten haben dabei bewusst unterschiedlich viel Fachwissen. Eine Autorenanzeige darf wissen, was eine Autorin ist; der darin verwendete Toggle-Button muss es nicht wissen. Entscheidend sind klare Aufgaben und passende Schnittstellen, nicht möglichst viele kleine Dateien.

## Was weiterhin unsere Aufgabe bleibt

React nimmt uns nicht jede Entscheidung ab. Wir müssen weiterhin festlegen, wo State hingehört und welche Komponenten ihn gemeinsam verwenden. HTTP-Anfragen können fehlschlagen, Antworten verspätet eintreffen und Schreibvorgänge noch laufen.

Diese Abläufe bündeln wir im API-Service und im Hook `useBlogInteractions`. Die Anzeigekomponenten bleiben davon unabhängig: Sie erhalten Werte und Callbacks, ohne die Backend-Endpunkte zu kennen.

Auch ohne React könnte man JavaScript-Code sauber strukturieren und wiederverwenden. Der Vorteil in unserem React-Stand ist, dass Komponenten, State und Props einen gemeinsamen Rahmen für diese Arbeit bieten. Die Komplexität verschwindet nicht vollständig, aber wir müssen Darstellung und Datenänderungen weniger von Hand miteinander synchronisieren.

## Was du gelernt hast

Im React-Teil hast du die bestehende Seite schrittweise weiterentwickelt:

- Ein React-Projekt mit Vite und TypeScript aufbauen und HTML nach JSX übertragen.
- Mit `useState` Veränderungen darstellen und Klicks über Event-Handler verarbeiten.
- Komponenten mit klaren Aufgaben bilden und ihre Eingaben über typisierte Props beschreiben.
- Daten, Anzeige und Aktionen trennen; Bausteine über `children` und Callbacks zusammensetzen.
- Wiederholte Inhalte aus Daten mit `map` rendern und mit stabilen Keys identifizieren.
- Werte wie Balkenbreiten direkt aus Daten ableiten, statt sie aus dem DOM zu lesen oder unnötig als State zu speichern.
- Das vorhandene Backend über einen Service und einen eigenen Hook anbinden und dabei Laden, Fehler und Cleanup berücksichtigen.

Wir haben also nicht nur dieselbe Seite mit einer anderen Syntax geschrieben. Wir haben ihren Aufbau verändert: **Daten und Zustand beschreiben die Oberfläche, Komponenten machen ihre Bausteine wiederverwendbar.** Das ist die wichtigste Grundlage, auf der du weitere React-Anwendungen aufbauen kannst.