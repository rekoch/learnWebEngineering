# Like-Funktion wiederherstellen

## Überblick

Mit [connect the backend](./backendConnect.html) hast du dafür gesorgt, dass Like-Counter-Daten aus dem Backend stammen. Der Button selbst funktioniert aber noch nicht korrekt. Wir implementieren die Like-Verwaltung in zwei Schritten:

### Ziele:

1. **Blog-Page liken** - mit korrekter UI und Backend-Verbindung
2. **Blog-Page entliken** - mit korrekter UI und Backend-Verbindung
3. **User-ID-Wechsel** - korrekte Reaktion auf Benutzer-Änderungen

---

## Like & Dislike Implementation

### Toggle-Logik verstehen

Like und Dislike sind sehr ähnlich - wir **togglen** zwischen den Zuständen:

1. **Aktuellen Zustand abfragen** (geliked oder nicht?)
2. **Zustand umkehren** (like → unlike, unlike → like)
3. **UI entsprechend aktualisieren**

### Architektur-Entscheidung

Das File `likeStateHandler.js` soll erneut die Haupt Verantwortung dafür übernehmen. Wir haben auch ein File `button.js`. Dies soll einzig und alleine feststellen, dass der Button gedrückt wurde und danach alles weitere dem `likeStateHandler.js` überlassen.

**File-Aufgabenverteilung:**

- `buttons.js` - **Nur** Button-Klick erkennen und Event versenden
- `likeStateHandler.js` - **Komplette** Like-Logik verwalten

Um so eine Aufgabe zu delegieren, gibt es grundsätzlich verschiedene Möglichkeiten.

1. Wir stellen eine Funktion bereit über "export" die danach von anderen direkt genutzt werden kann
2. Wir versenden einen Event und kümmern uns nicht darum, welches File sich der Aufgabe animmt.

Da wir bereits ein Event System zur Verfügung haben, setzen wir Variante 2 um. Diese lässt mehr Spielraum zu.

**Event-basierte Kommunikation:**

- Option 1: Direkte Funktionsaufrufe (enger gekoppelt)
- **Option 2**: Event versenden (flexibler, entkoppelter)

---

## Like Event versenden

Im `button.js` File überwachen wir bereits, ob ein Button geklickt wird. Was uns dort noch fehlt ist der Versand unseres Events, damit wir danach im `likeStateHandler.js` darauf reagieren können.

### Button.js erweitern

**Observer und Events importieren:**

```javascript
import { appObserver, ObserverEvents } from "../../services/observer.js";
```

**Event bei Button-Klick versenden:**

```javascript
document.querySelectorAll("button[data-button]").forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.dataset.button) {
      case "like_article":
        appObserver.emit(ObserverEvents.LIKE_BUTTON_CLICKED);
        break;
      // ... andere Cases
    }
  });
});
```

### Test der Event-Übertragung

1. **Seite mit LiveServer starten**
2. **Like Button klicken**
3. **Console beobachten** - Zahlen-Output sollte sich erhöhen

> **Erfolg**: LikeStateHandler empfängt und verarbeitet dein Event!

---

## Like Event verarbeiten

Du siehst im Console.log wo der Event bereits empfangen wird. Im `likeStateHandler.js` um Zeile 70 rum. Jetzt müssen wir noch die Logik erweitern, damit es auch das macht, was wir uns erhoffen. Nämlich von dislike auf like und zurück ändern, je nach aktuellem Zustand.

Gehe zur function `observeLikeEvents()` und ersetze die zuvor implementiere Code Stelle durch den Aufruf einer neuen Funktion die wir `toggleLikeState()` nennen und im Observer aufrufen.

### Toggle-State-Funktion erstellen

**Observer-Funktion erweitern:**

```javascript
function observeLikeEvents() {
  appObserver.subscribe(ObserverEvents.LIKE_BUTTON_CLICKED, async () => {
    toggleLikeState();
  });
}

async function toggleLikeState() {
  // Logik kommt hier rein
}
```

### Aktuellen Like-Status abfragen

Damit wir nun wissen, was wir tun müssen, brauchen wir den aktuellen Zustand des Likes (hat die Userin die Page geliked oder nicht)? Wir machen so was ähnliches schon im `observeBlogPageIdChange` bzw. im `setLikeCounter`. Als erstes holen wir uns den Zustand aus dem Backend. Denke daran, dass wir wieder alles asynchron haben. Erweitere die Funktion wo nötig mit `async`

**Import der benötigten Services:**

```javascript
import {
  getLikesPerBlogPage,
  getIsLikingBlogPage,
  likeBlogPage,
  unlikeBlogPage,
} from "../../services/blogPageLikes.js";
```

**Like-Status für User abfragen:**

```javascript
async function toggleLikeState() {
  const doesUserLikeBlogPageResponse = await getIsLikingBlogPage(
    blogPageId,
    currentUserId
  );

  if (doesUserLikeBlogPageResponse.liked) {
    // User hat bereits geliked → Unlike
  } else {
    // User hat noch nicht geliked → Like
  }
}
```

### Backend-Status ändern

Jetzt können wir direkt dem Backend mitteilen, dass sich der Zustand geändert hat.

```javascript
async function toggleLikeState() {
  const doesUserLikeBlogPageResponse = await getIsLikingBlogPage(
    blogPageId,
    currentUserId
  );

  if (doesUserLikeBlogPageResponse.liked) {
    await unlikeBlogPage(blogPageId, currentUserId);
  } else {
    await likeBlogPage(blogPageId, currentUserId);
  }
}
```

---

## UI-Updates implementieren

Das UI braucht noch etwas mehr, damit es jeweils korrekt ist.

### Button-UI-Update-Funktion

```javascript
function updateLikeButtonUi(isLiked) {
  const likeButton = document.querySelector(
    "button[data-button='like_article']"
  );

  if (isLiked) {
    likeButton.classList.remove("primary");
    likeButton.innerHTML = unlikePageText;
    likeButton.prepend(brokenHeart.cloneNode(true));
  } else {
    likeButton.classList.add("primary");
    likeButton.innerHTML = likePageText;
    likeButton.prepend(filledHeart.cloneNode(true));
  }
}
```

#### Erklärungen

- damit die Funktion weiss, was zu tun ist, nimmt sie ein Boolean Argument `isLiked`entgegen
- basierend auf dem Wert, wird entweder der like oder der dislike Zustand angeschrieben
- die Texte sind bereits als `const`im File vorhanden
- die CSS Klasse `primary` muss entfernt oder hinzugefügt werden

### Toggle-Funktion komplettieren

Zuletzt passe den Aufruf im `toggleLikeState()`an. Am Schluss ergänze den `setLikeCounter()` Aufruf, der unabhängig des Zustands genutzt werden kann.

```javascript
async function toggleLikeState() {
  const doesUserLikeBlogPageResponse = await getIsLikingBlogPage(
    blogPageId,
    currentUserId
  );

  if (doesUserLikeBlogPageResponse.liked) {
    await unlikeBlogPage(blogPageId, currentUserId);
    updateLikeButtonUi(false);
  } else {
    await likeBlogPage(blogPageId, currentUserId);
    updateLikeButtonUi(true);
  }

  setLikeCounter(); // Counter aktualisieren
}
```

### Funktionstest

**Backend und Frontend starten** und Like-Button testen!

---

## Error Handling implementieren

Obwohl der Code funktioniert, könnten Fehler im Backend dazu führen, dass wir nicht sauber darauf reagieren. Ein try-catch um die potentiell problematischen Stellen hilft uns hier. Zudem wollen wir sicher gehen, dass wir mit `.liked` nicht auf ein allfällig nicht vorhandenes Objekt zugreifen.

Dafür umschliessen wir den ganzen Code oben mit einem try und fangen Errors im Catch und geben sie in der Console aus.

### Try-Catch für Robustheit

```javascript
async function toggleLikeState() {
  try {
    const doesUserLikeBlogPageResponse = await getIsLikingBlogPage(
      blogPageId,
      currentUserId
    );

    if (doesUserLikeBlogPageResponse.liked) {
      await unlikeBlogPage(blogPageId, currentUserId);
      updateLikeButtonUi(false);
    } else {
      await likeBlogPage(blogPageId, currentUserId);
      updateLikeButtonUi(true);
    }

    setLikeCounter();
  } catch (error) {
    console.error("Error toggling like state:", error);
  }
}
```

### prüfen auf undefined

Für den Fall, dass die response komplett leer / undefined ist, machen wir nichts. Nutzen wir den ? Operator bspw. `if (doesUserLikeBlogPageResponse.?liked)` würde das technisch funktionieren und keinen Fehler mehr geben. In Kombination mit einem if hat es aber zur Folge, dass sowohl bei (nicht vorhanden) wie auch (not liked) ein false ergibt und unsere Logik damit unsauber wäre. Wir prüfen also separat ob es vorhanden ist und stoppen alle weiteren Arbeiten, falls nicht. Das kannst du direkt nach dem abwarten der response machen.

```javascript
async function toggleLikeState() {
  try {
    const doesUserLikeBlogPageResponse = await getIsLikingBlogPage(
      blogPageId,
      currentUserId
    );

    if (!doesUserLikeBlogPageResponse) {
      return; // Keine Response erhalten
    }

    if (doesUserLikeBlogPageResponse.liked) {
      await unlikeBlogPage(blogPageId, currentUserId);
      updateLikeButtonUi(false);
    } else {
      await likeBlogPage(blogPageId, currentUserId);
      updateLikeButtonUi(true);
    }

    setLikeCounter();
  } catch (error) {
    console.error("Error toggling like state:", error);
  }
}
```

---

## User-ID-Wechsel handhaben

Aktuell berücksichtigt die Logik nur eine statische UserId aus dem `likeStateHandler.js`, die mit 0 gesetzt ist. Ein Wechsel der UserId wird nicht berücksichtigt. Zudem ist der initiale Stand beim Laden der Page potentiell falsch, da dies noch nicht korrekt geladen wird.

### User-Change Observer erweitern

**Bestehende Observer-Funktion finden:**

```javascript
function observeUserIdChange() {
  appObserver.subscribe(
    ObserverEvents.USER_ID_CHANGED,
    async (data) => {
      currentUserId = data.userId;
      console.log("Current User ID in likeStateHandler:", currentUserId);
      // Hier Like-Status für neuen User laden
    },
    true // Replay-Funktion für Initial-State
  );
}
```

### Like-Status-Check-Funktion erstellen

Auch hier ist es ähnlich wie mit der Blog Page Id. Die UserId wird initial schon im `main.js` gesetzt. Weil das Abo mit "true" am schluss auch Daten erhält, wenn es erst nachträglich das Abo bezieht, kriegen wir ganz sicher auch einen Initial-State und können darauf reagieren.

Jetzt müssen wir im Prinzip nur herausfinden, welches der aktuelle State ist und das UI entsprechend korrekt darstellen.

Diesen Teil aus der vorherigen Methode macht genau das was wir erneut brauchen:

```javascript
const doesUserLikeBlogPageResponse = await getIsLikingBlogPage(
  blogPageId,
  currentUserId
);
if (!doesUserLikeBlogPageResponse) {
  return;
}
```

Wie so oft… wenn es nach "ich kann das nochmals brauchen" klingt, dann schreit es danach, die Funktionalität in eine separate Funktion auszulagern.

**Wiederverwendbare Status-Check-Funktion:**

Damit wir "von aussen" wissen, ob es einen Fehler gab oder ob die Antwort "true / false" ist, müssen wir unsere neue Funktion etwas smarter gestalten. Da wir im JavaScript ohne weiteres und jederzeit ein Objekt erstellen können, machen wir genau das. Wir erweitern die Antwort der Funktion um:
`{success: boolean, liked: boolean, error: string}`

Als erstes nutzen wir das, wenn die "response" undefined / null ist. Dann hat irgendwie was nicht geklappt und wir können nicht sagen, ob eine Userin die Page liked oder nicht.

```javascript
async function checkUserLikeStatus() {
  try {
    const response = await getIsLikingBlogPage(blogPageId, currentUserId);

    if (response === undefined || response === null) {
      return { success: false, liked: false, error: "No response received" };
    }
  } catch (error) {
    return { success: false, liked: false, error: error.message };
  }
}
```
Mit return `{}` erstellen wir ein Objekt, füllen es mit den Properties ab und geben dies zurück. Das ist das coole an JavaScript. Kein "boilerplate" nötig wo wir zuerst mal den definieren müssen, wie das Objekt aussieht. Auf der anderen Seite haben wir auf der "aufrufenden" Seite keine Ahnung, was wir eigentlich als Antwort kriegen…

Das selbe gilt wenn wir in den "catch" laufen. Wir wissen es hat was nicht geklappt und können die Antwort aus dem error direkt weitergeben.

```javascript
async function checkUserLikeStatus() {
  try {
    const response = await getIsLikingBlogPage(blogPageId, currentUserId);

    if (response === undefined || response === null) {
      return { success: false, liked: false, error: "No response received" };
    }

  } catch (error) {
    return { success: false, liked: false, error: error.message };
  }
}
```

Wenn es weder "catch" noch undefined / null gewesen ist, hat es wohl funktioniert. Also geben wir ein `sucess:true`, den like state aus der response sowie keine Fehlermeldung == null zurück.

```javascript
async function checkUserLikeStatus() {
  try {
    const response = await getIsLikingBlogPage(blogPageId, currentUserId);

    if (response === undefined || response === null) {
      return { success: false, liked: false, error: "No response received" };
    }

    return { success: true, liked: response.liked, error: null };

  } catch (error) {
    return { success: false, liked: false, error: error.message };
  }
}
```

### Toggle-Funktion refactoren

**Status-Check-Funktion verwenden:**

```javascript
async function toggleLikeState() {
  try {
    const likeStatus = await checkUserLikeStatus();

    if (!likeStatus.success) {
      console.error("Could not determine like status:", likeStatus.error);
      return;
    }

    if (likeStatus.liked) {
      await unlikeBlogPage(blogPageId, currentUserId);
      updateLikeButtonUi(false);
    } else {
      await likeBlogPage(blogPageId, currentUserId);
      updateLikeButtonUi(true);
    }

    setLikeCounter();
  } catch (error) {
    console.error("Error toggling like state:", error);
  }
}
```

#### Erklärungen
- wir nutzen neu den `likeStatus`um zu wissen, ob wir abbrechen oder nicht
- mit dem `.`kannst du auf die Properties eines Objekts zugreifen. Hier für den status `likeStatus.success`, den like zustand `likeStatus.liked` und fehlermeldung `likeStatus.error`

### Like State updaten und initialiseren
Jetzt haben wir die Basis erarbeitet, um die Logik in unserer Changed User ID Logik wieder zu verwenden. Gehe zur Funktion `observeUserIdChange()` wo wir nun als erstes unsere neue Funktion `checkUserLikeStatus` aufrufen und analog zu vorher weiter verarbeiten.

```javascript
const likeStatus = await checkUserLikeStatus();
```

Wenn der Status success ist, können wir direkt das UI updaten und wenn nicht, machen wir nichts bzw. können noch eine Meldung in der Console ausgeben. Zudem rufe noch die `setLikeCounter` auf. Damit haben wir bereits alles gemacht, um bei einem change der userID alles korrekt zu machen. Starte alles inklusive Backend und teste etwas. Du kannst nun oben rechts die userID anpassen und schauen was passiert.

Dein Code im `observeUserIdChange()` sollte ungefähr so aussehen.

```javascript
function observeUserIdChange() {
  appObserver.subscribe(
    ObserverEvents.USER_ID_CHANGED,
    async (data) => {
      currentUserId = data.userId;
      const likeStatus = await checkUserLikeStatus();
      if (likeStatus.success) {
        updateLikeButtonUi(likeStatus.liked);
        setLikeCounter();
      } else {
        console.error("Could not fetch like status:", likeStatus.error);
      }
    },
    true
  );
}
```

Was noch fehlt ist das selbe, wenn die blog page id ändert. Dies ist in unserem Fall eigentlich nicht möglich, aber wir wollen den Init über das Main.js nutzen, wo die Blog Page ID gesetzt wird. So ist beim Laden sichergestellt, dass der Like State stimmt.

Ergänze daher auch die Funktion `observeBlogPageIdChange()` mit dem Setzen des likeStatus und des counters.

> Dir fällt sicher auf, dass wir wiederum Code in zwei Methoden haben, der deckungsgleich ist. Das Laden des States und das Setzen.

**DRY-Prinzip - Wiederverwendbare Init-Funktion:**

Don't repeat yourself. Legen wir dies so zusammen, dass wir es wieder verwenden können. Mittels einer neuen Funktion `initLikeState()` fassen wir die gemeinsame Logik zusammen und nutzen danach diese.

```javascript
async function initLikeState() {
  const likeStatus = await checkUserLikeStatus();

  if (likeStatus.success) {
    updateLikeButtonUi(likeStatus.liked);
    setLikeCounter();
  } else {
    console.error("Could not fetch like status:", likeStatus.error);
  }
}
```

### Observer-Funktionen finalisieren

**User-ID-Change Observer:**

```javascript
function observeUserIdChange() {
  appObserver.subscribe(
    ObserverEvents.USER_ID_CHANGED,
    async (data) => {
      currentUserId = data.userId;
      await initLikeState();
    },
    true
  );
}
```

**Blog-Page-ID-Change Observer:**

```javascript
function observeBlogPageIdChange() {
  appObserver.subscribe(
    ObserverEvents.BLOG_PAGE_ID_CHANGED,
    async (data) => {
      blogPageId = data.blogPageId;
      await initLikeState();
    },
    true
  );
}
```

---

## Endergebnis

### Implementierte Features

1. **Like/Unlike Toggle** - Backend-synchronisiert
2. **UI-Updates** - Button-Text und Icon-Änderungen
3. **Counter-Updates** - Automatische Zähler-Aktualisierung
4. **User-Switching** - Korrekte Like-Status-Anzeige pro User
5. **Error Handling** - Robuste Fehlerbehandlung
6. **DRY Code** - Wiederverwendbare Funktionen

### Vollständiger Test

**Test-Szenarios:**

1. Like/Unlike mit verschiedenen Users
2. User-ID-Wechsel oben rechts
3. Backend-Verbindung aktiv
4. Counter-Updates in Echtzeit

**Die Like-Funktionalität ist jetzt vollständig implementiert!**
