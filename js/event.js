import { state, eventCard, showToast } from "./layout.js";
import { events, applyChoice } from "./state.js";
const event = events[state.currentEvent % events.length];
document.querySelector("#app").innerHTML = `<article class="decision"><span class="tag">${event.category.toUpperCase()}</span><h2>${event.title}</h2><p>${event.story}</p><div class="illustration" aria-label="Illustration placeholder">A new scene is waiting to unfold</div><h3>Choices</h3>${eventCard(event)}<p class="consequence">Every choice changes something.</p></article>`;
document.querySelectorAll("[data-choice]").forEach(button => button.addEventListener("click", () => { const choice = applyChoice(state, Number(button.dataset.choice)); if (choice) { showToast(`${choice[0]} — your story has changed.`); window.setTimeout(() => { window.location.href = "index.html"; }, 400); } }));
