# State in React

Unsere Blogseite wird jetzt von React dargestellt, ist aber noch statisch. Bevor wir ihre Buttons umsetzen, schauen wir uns an einem kleinen Zähler an, wie React mit veränderlichen Werten arbeitet.

## Was ist State?

State ist der Zustand, den sich eine Komponente zwischen ihren Aufrufen merkt. Das kann zum Beispiel ein Zählerstand sein oder die Information, ob du einem Thema folgst.

Im bisherigen JavaScript hast du nach einem Klick direkt Elemente im DOM verändert. In React änderst du stattdessen den State. React ruft die Komponente erneut auf, berechnet daraus die Oberfläche und aktualisiert die nötigen Stellen im DOM. Dieses Berechnen der Oberfläche nennt man Rendern.

## Ein kleiner Zähler

Sichere den Inhalt deiner bisherigen `App.tsx`, damit du danach zur Blogseite zurückkehren kannst. Ersetze ihn für dieses Experiment durch:

```tsx
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  return (
    <>
      <p>Zählerstand: {count}</p>
      <button type="button" onClick={increment}>
        Erhöhen
      </button>
    </>
  );
}

export default App;
```

Öffne die Seite im Browser. Der Zähler beginnt bei `0` und steigt mit jedem Klick um eins.

## Einen Zustand anlegen

`useState` ist eine Funktion von React. Solche Funktionen, mit denen du React-Funktionen in einer Komponente nutzt, heissen Hooks. Du importierst `useState` aus `react` und rufst es direkt am Anfang deiner Komponente auf, nicht innerhalb einer Bedingung, Schleife oder eines Click-Handlers.

```tsx
const [count, setCount] = useState(0);
```

`0` ist der Startwert. `useState` gibt ein Array mit zwei Einträgen zurück, die wir mit der Array-Destrukturierung in zwei Variablen aufteilen:

- `count` enthält den Wert für den aktuellen Renderdurchlauf.
- `setCount` ist die Funktion, mit der du einen neuen Wert an React übergibst.

Die Namen wählst du selbst. Üblich ist, die Änderungsfunktion mit `set` zu beginnen. TypeScript erkennt anhand des Startwerts, dass `count` eine Zahl ist.

## Den Wert anzeigen

Mit geschweiften Klammern kannst du einen JavaScript-Ausdruck in JSX einsetzen:

```tsx
<p>Zählerstand: {count}</p>
```

React zeigt dort den aktuellen Wert von `count` an. Du musst den Absatz weder mit `querySelector` suchen noch seinen Text selbst ändern.

## Auf einen Klick reagieren

```tsx
<button type="button" onClick={increment}>
  Erhöhen
</button>
```

Mit `onClick` übergibst du die Funktion, die React beim Klick aufrufen soll. Schreibe `onClick={increment}`, nicht `onClick={increment()}`: Die zweite Variante würde die Funktion bereits beim Rendern ausführen.

Im Handler fordert `setCount(count + 1)` eine Aktualisierung an. Beim nächsten Renderdurchlauf liefert `useState` den neuen Wert, und React zeigt ihn im Absatz an. Der Startwert `0` setzt den Zähler dabei nicht wieder zurück.

`setCount` verändert die Variable `count` im gerade laufenden Handler nicht sofort. Für diesen Aufruf bleibt sie der bisherige Wert. Der neue Wert steht beim nächsten Renderdurchlauf zur Verfügung.

Eine normale lokale Variable würde React weder zwischen den Aufrufen als State speichern noch bei einer Änderung zum erneuten Rendern veranlassen. Deshalb verwenden wir für Werte, die sich ändern und die Oberfläche beeinflussen, State.

## Selbst ausprobieren

1. Ändere den Startwert auf `5`.
2. Ergänze einen Button «Verringern», der den Zähler um eins reduziert.
3. Ergänze einen Button «Zurücksetzen», der mit `setCount(0)` den Wert auf null setzt.
4. Lade die Seite neu. Der Zähler beginnt wieder beim Startwert aus deinem Code.

State lebt hier nur im Arbeitsspeicher. Er wird nicht automatisch im Browser oder auf einem Server gespeichert.

Stelle nach dem Experiment deine statische Blogseite in `App.tsx` wieder her. Im [nächsten Kapitel](./04_buttons.md) verwenden wir State für ihre Like- und Follow-Buttons. Du bleibst dafür im selben React-Projekt.