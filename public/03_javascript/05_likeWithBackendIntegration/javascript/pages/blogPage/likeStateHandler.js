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
  getLikesPerBlogPage,
  getIsLikingBlogPage,
  likeBlogPage,
  unlikeBlogPage,
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
      initLikeState();
    },
    true
  );
}

function observeBlogPageIdChange() {
  appObserver.subscribe(
    ObserverEvents.BLOG_PAGE_ID_CHANGED,
    async (data) => {
      blogPageId = data.blogPageId;
      initLikeState();
    },
    true
  );
}

async function initLikeState(){
  const likeStatus = await checkUserLikeStatus();
      if (likeStatus.success) {
        updateLikeButtonUi(likeStatus.liked);
        setLikeCounter();
      } else {
        console.error("Could not fetch like status:", likeStatus.error);
      }
}

function observeLikeEvents() {
  appObserver.subscribe(ObserverEvents.LIKE_BUTTON_CLICKED, async () => {
    toggleLikeState();
  });
}

async function toggleLikeState() {
  try {
    const likeStatus = await checkUserLikeStatus(blogPageId, currentUserId);
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

observeUserIdChange();
observeBlogPageIdChange();
observeLikeEvents();
