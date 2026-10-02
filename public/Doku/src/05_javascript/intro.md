# Einstieg

JavaScript hat eine recht interessante Geschichte hinter sich. Diese zeigt auch auf, wie früh JavaScript entstanden ist und eigentlich durch den Fortschritt des WWW geprägt wurde. Siehe auch [Wiki JavaScript Geschichte](https://de.wikipedia.org/wiki/JavaScript#Geschichte)

Wie viel hat JavaScript denn nun mit Java zu tun? Etwa so viel wie ein HotDog mit einem Hund → nichts!
Dies ist zwar nicht ganz korrekt. Wenn du die Geschichte auf Wikipedia nachliest, findest du heraus wieso. Die damals genannte Skriptsprache "LiveScript" sollte Java ansprechen können. Weil diese Einwicklung von Netscape (=Browser) und Sun (=Java) zusammen kreiert wurde, nannte man sie später JavaScript. Also eine Web-Skript-Sprache, welche Java zudienen soll. Vermutlich weisst du unterdessen, dass dies heute etwas anders funktioniert.

## Einführung JavaScript

- Einstieg nach [w3schools Einstieg](https://www.w3schools.com/js/default.asp) —> wir programmieren eine simple Funktion mit JavaScript.
- Auf welche Arten kann ein Script eingebunden werden [w3schools Einbinden JS](https://www.w3schools.com/js/js_whereto.asp)
- Was ist ein DOM? [w3schools DOM](https://www.w3schools.com/js/js_htmldom.asp)

### ECMA und JavaScript

Heute gibt es nebst JavaScript den Namen "EcmaScript". Vielleicht hast du davon gehört. ECMA Skript vor, was eine Skriptsprache für den Browser unterstützen soll. Es ist also eine Art Vorgabe. JavaScript ist eine Programmiersprache, die sich an diese Vorgabe möglichst hält. Die beiden Namen sind also nicht das gleiche, werden aber häufig gleich verwendet.

## Have Fun with JavaScript

Wie und wo kann Javascript genutzt werden?

- Direkt im Browser. Öffne dazu beispielsweise die Entwicklertools auf Chrome. Danach wechselst du dort auf „console". Direkt in diesem Fenster kannst du JavaScript schreiben und ausführen.
- Mit einer Lauftzeitumgebung wie dies bei Node der Fall ist. Auf dem Computer findest du „node.exe". Starte dies und code direkt drauf los.

### == und ===

Time to code. Juhuu. Starte auf deinem Windows oder Mac "node".
Gib auf der Konsole nun folgendes ein:

```javascript
0 == 0;
```

Überlege dir nun, was das Resultat ist. Mache nun jeweils das selbe, mit allen nachfolgenden Beispielen. Überlege dir immer VOR der Eingabe, was wohl das Resultat sein könnte:

```javascript
0 == new String("0");

0 == "0";

new String("0") == "0";

null == undefined;

"" == false;

1 == true;

"1" == true;

new String("66") == true;
```

Jetzt wiederhole die Schritte und benutze anstelle von `==` jeweils `===`

### Objekte und Funktionen

Verwende weiterhin jeweils node, um die Beispiele zu programmieren.

```javascript
var person = {};
//eingeben;
this.person;
//eingeben;
```

Was lernst du daraus? Mit {} konntest du einfach so ein Objekt erstellen.

JavaScript erstellt aus allem direkt ein Objekt. Damit lässt sich wunderbar ein Objekt auch erweitern. Entgegen bspw. Java, muss dieses Objekt nicht auf einer Klasse definieren.

Gib folgendes ein:

```javascript
this.person.name = "urs";
this.person;
```

Genau. Es hat funktioniert. Jetzt hast du einfach so deinem leeren Objekt kurzerhand ein neues Property angefügt und abgefüllt. Auch hier. Keine Klasse sagt, wie dein Objekt auszusehen hat. Ausserdem ist jedes Objekt immer komplett unabhängig von einem anderen.
Du hast eine Variable deklariert, jedoch keinen Wert vergeben. Solche Variablen sind in JavaScript zwar vorhanden, aber sind "undefined". Du darfst also nicht versuchen, auf ein weiteres Property zuzugreifen. Du wirst wohl noch oft den Fehler antreffen, dass du auf eine undefined Variable zugreifen willst.

### Funktionen

In JavaScript kannst du dir jedes Objekt wie eine Art HashMap in Java vorstellen. Du hast also eine Art Katalog, welcher definiert, welche Werte existieren und was dort abgespeichert ist. Die Werte können dabei andere Objekte oder auch Funktionen sein. Versuche folgendes:

```javascript
var person = {};
person.adress = { strasse: "ume egge", nummer: 2, ort: "hie" };
this.person;
person.sayHello = function () {
  return "hallo du";
};
this.person;
this.person.sayHello();
```

Funktionen können auf verschiedene Arten erstellt werden.

```javascript
function doIt() {
  return "no";
}
var doItMaybe = function () {
  return "still no";
};
var doItDefiniv = function stillBlocking() {
  return "I give up";
};
```

Erste Variante wird gehoistet und kann vorher schon benutzt werden. Andere Varianten nicht. Named hat Vorteile beim Debuggen. Führe alle Varianten mit () aus ->

- Kein grosser Unterschied
- Führe Variante 2 und 3 ohne () aus
- Der Name wird bei Variante 3 entsprechend angezeigt

In JavaScript ist wirklich ALLES ein Objekt. Sogar Funktionen. Lass es uns beweisen und gib folgendes ein:

```javascript
doItMaybe instanceOf Object
    doItMaybe.candidate = 'nid ig'
```

das erste wird `true` zurückgeben.

Was denkst, du was nun in doItMaybe drin ist wenn du es ausführst?
Auch ein Array verhält sich eigentlich genau gleich wie ein Objekt:

```javascript
var a = [];
    a[0] = 1;
    a; //-> Ausgabe prüfen
    a[100] = 100;
    //-> denkst du das geht?
    a; //-> Ausgabe prüfen
```

Hier musst du immer sehr darauf achten, wenn du bspw. einen Loop hast mit einer Schleifenvariable. Ein Fehler und deine Schleife läuft endlos.

### Higher Order Function

Eine Funktion kann eine Funktion enthalten. Ist dies der Fall, nennt man dieses Konstrukt eine "higher Order function". In Frameworks wie Angular oder React wirst du sehr häufig solche Konstrukte vorfinden.

```javascript
var higherOrderFunction = function (justANumber, func) {
    justANumber = justANumber * 1000;
    func(justANumber);
    }
    this.higherOrderFunction(10, function(answer){console.log(answer)};
```

Das ganze kann auch mit einer Arrow functions ausgeführt werden:

```javascript
this.higherOrderFunction(10, (answer) => console.log(answer));
```

### Let and const

In einem modernen JavasScript Umfeld soll immer `let` und `const` verwendet werden. Man kann Variablen auch mit dem Keyword `var` erstellen. Dies verursacht jedoch ungewünschte Effekte und soll nicht mehr gemacht werden);
