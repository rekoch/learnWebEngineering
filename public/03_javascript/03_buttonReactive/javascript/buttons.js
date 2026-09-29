const likePageText = "Dieser Beitrag gefällt mir!";
const unlikePageText = "Dieser Beitrag gefällt mir nicht mehr";

const followAuthorText = "Autorin folgen";
const unfollowAuthorText = "Autorin nicht mehr folgen";

const followTopicText = "Thema folgen";
const unfollowTopicText = "Thema entfolgen";

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

document.querySelectorAll("button[data-button]").forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.dataset.button) {
      case "like_article":
        toggleLikeButtonState(button, likePageText, unlikePageText);
        break;
      case "follow_author":
        toggleButtonState(button, followAuthorText, unfollowAuthorText);
        break;
      case "follow_topic":
        toggleButtonState(button, followTopicText, unfollowTopicText);
        break;

      default:
        console.warn(`Unbekannter Button-Typ: ${button.dataset.button}`);
    }
  });
});

function toggleLikeButtonState(button, activationText, inactivatingText) {
  const currentState = button.dataset.buttonState;
  const likeCounter = document.getElementById("data-like-counter");
  let currentCount = parseInt(likeCounter.textContent);

  toggleButtonState(button, activationText, inactivatingText);

  if (currentState == "inactive") {
    button.prepend(brokenHeart);
    currentCount++;
  } else {
    button.prepend(filledHeart);
    currentCount--;
  }
  likeCounter.textContent = currentCount;
}

function toggleButtonState(button, activationText, inactivatingText) {
  const currentState = button.dataset.buttonState;
  button.classList.toggle("primary");
  if (currentState == "active") {
    button.textContent = activationText;
    button.dataset.buttonState = "inactive";
  } else {
    button.textContent = inactivatingText;
    button.dataset.buttonState = "active";
  }
}
