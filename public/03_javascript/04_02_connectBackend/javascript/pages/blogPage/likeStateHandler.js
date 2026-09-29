/*
Diese Datei ist dafür zuständig, dass sämtliche Like-Zustände (Page liked / disliked) korrekt gehandhabt werden.

Du wirst hier folgende Funktionen implementieren:
- Beobachten von Änderungen der Benutzer-ID und der Blog-Seiten-ID
- Initialisieren des Like-Zustands für die Seite, wenn sich die Blog-Seiten-ID ändert
- Umschalten des Like-Zustands für die Seite, wenn der entsprechende Button geklickt wird
- Setzen des Button-Textes entsprechend dem aktuellen Like-Zustand

Dazu wirst du die Observer-Funktionalität nutzen, um auf Änderungen der Benutzer-ID und der Blog-Seiten-ID zu reagieren.
Die Observer-Funktionen sind bereits implementiert und reagieren auf die Events USER_ID_CHANGED und BLOG_PAGE_ID_CHANGED.

Ausserdem wurden die Texte für die Buttons bereits definiert welche du verwenden kannst um den Button-Text entsprechend dem Like-Zustand zu aktualisieren.

*/

import { appObserver, ObserverEvents } from "../../services/observer.js";
import {
  getLikesPerBlogPage
} from "../../services/blogPageLikes.js";


const likePageText = "Dieser Beitrag gefällt mir!";
const unlikePageText = "Dieser Beitrag gefällt mir nicht mehr";

const filledHeart = document.createElement("span");
filledHeart.innerHTML = `<svg
    fill="none" viewBox="0 0 16 16" width="16" height="16"
 class="svg-icon"><path fill="#fff" fill-rule="evenodd" d="M13.971 3.029a3.53 3.53 0 0 0-4.983 0L8 4.018l-.988-.989a3.53 3.53 0 0 0-4.983 0 3.54 3.54 0 0 0 0 4.991L8 14l5.972-5.98a3.54 3.54 0 0 0 0-4.991" clip-rule="evenodd"></path></svg>`;
filledHeart.classList.add("mr-s");

const brokenHeart = document.createElement("span");
brokenHeart.innerHTML = `<svg
    fill="none" viewBox="0 0 16 16" width="16" height="16"
    class="svg-icon">
    <path fill="#000" fill-rule="evenodd" d="M13.971 3.029a3.53 3.53 0 0 0-4.983 0L8 4.018l-.988-.989a3.53 3.53 0 0 0-4.983 0 3.54 3.54 0 0 0 0 4.991L8 14l5.972-5.98a3.54 3.54 0 0 0 0-4.991" clip-rule="evenodd"></path>
    <polyline points="6,4 8,8 7,10 9,12" stroke="#fff" stroke-width="1" fill="none"/>
</svg>`;
brokenHeart.classList.add("mr-s");

let blogPageId = 0;
let currentUserId = 0;

function observeUserIdChange() {
  appObserver.subscribe(
    ObserverEvents.USER_ID_CHANGED,
    async (data) => {
      currentUserId = data.userId;
      console.log("Current User ID in likeStateHandler:", currentUserId);
      // Hier kannst du weitere Aktionen hinzufügen, die bei einer Änderung der Benutzer-ID ausgeführt werden sollen
    },
    true
  );
}

function observeBlogPageIdChange() {
  appObserver.subscribe(
    ObserverEvents.BLOG_PAGE_ID_CHANGED,
    async (data) => {
      blogPageId = data.blogPageId;
      setLikeCounter();
    },
    true
  );
}

function observeLikeEvents() {
  appObserver.subscribe(ObserverEvents.BLOG_PAGE_LIKE_CHANGED, async () => {
    console.log(
      "Current Blog Page ID was like changed in likeStateHandler:",
      blogPageId
    );
    // hier kannst du darauf reagieren, wenn der Like State geändert wurde
  });
}

async function setLikeCounter() {
  if (blogPageId) {
    try {
      const response = await getLikesPerBlogPage(blogPageId);
      document.getElementById("data-like-counter").textContent =
        response.likeCount;
      document.getElementById("like-counter").classList.remove("invisible");
    } catch (error) {
      console.error("Error loading likes:", error);
    }
  }
}

observeUserIdChange();
observeBlogPageIdChange();
observeLikeEvents();