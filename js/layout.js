import { loadState, saveState, newLife } from "./state.js";

export const state = loadState();
const pages = { index: "overview", timeline: "timeline", relationships: "relationships", career: "career", activities: "activities", education: "education", assets: "assets", settings: "settings", event: "event" };
const titles = { overview: "Your story so far", timeline: "Life timeline", relationships: "Relationships", career: "Career & money", activities: "Activities", education: "Education", assets: "Assets", settings: "Settings", event: "A moment that matters" };
const current = pages[location.pathname.split("/").pop().replace(".html", "")] || "overview";

export function shell() {
  document.body.innerHTML = `<div class="app-shell"><aside class="sidebar"><div class="brand-block"><a class="brand" href="index.html">trife</a><span>YOUR LIFE, YOUR STORY</span></div><nav class="main-nav" aria-label="Main navigation">
    <a href="index.html" data-page="overview"><span>◈</span> Overview</a><a href="timeline.html" data-page="timeline"><span>◷</span> Life timeline</a><a href="relationships.html" data-page="relationships"><span>♡</span> Relationships</a><a href="career.html" data-page="career"><span>⌁</span> Career &amp; money</a><a href="activities.html" data-page="activities"><span>✧</span> Activities</a><a href="education.html" data-page="education"><span>▣</span> Education</a><a href="assets.html" data-page="assets"><span>⌂</span> Assets</a><a href="settings.html" data-page="settings"><span>⚙</span> Settings</a>
  </nav><div class="profile-card"><div class="avatar avatar-lime">AM</div><div><strong id="profile-name"></strong><small id="profile-meta"></small></div></div></aside><main class="main-content"><header class="topbar"><div><span class="eyebrow">${new Date().toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).toUpperCase()}</span><h1>${titles[current]}</h1></div><button class="button button-primary" id="new-life" type="button">+ New life</button></header><div id="app" class="page-content"></div><footer>trife <span>·</span> Every choice changes something.</footer></main></div><div id="toast" class="toast" role="status" aria-live="polite"></div>`;
  document.querySelector(`[data-page="${current}"]`)?.classList.add("active");
  updateProfile();
  document.querySelector("#new-life").addEventListener("click", () => { if (!window.confirm("Start a new life? Your current story will reset, but your generation will increase.")) return; const next = newLife(state); Object.assign(state, next); updateProfile(); showToast("A new life begins."); window.location.href = "index.html"; });
}
export function updateProfile() { document.querySelector("#profile-name").textContent = state.name.toUpperCase(); document.querySelector("#profile-meta").textContent = `Age ${state.age} · Generation ${state.generation}`; }
export function showToast(message) { const toast = document.querySelector("#toast"); toast.textContent = message; toast.classList.add("show"); window.clearTimeout(showToast.timer); showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2800); }
export function statCard(icon, label, value, note, color) { return `<article class="stat-card"><div class="stat-icon ${color}">${icon}</div><h3>${value}</h3><p>${label} · ${note}</p></article>`; }
export function eventCard(event, compact = false) { return `<article class="event-card"><span class="tag">${event.category.toUpperCase()}</span><h2>${event.title}</h2><p>${event.story}</p><div class="choices">${event.choices.slice(0, compact ? 2 : 3).map((choice, index) => `<button class="choice ${index === 0 ? "primary" : ""}" data-choice="${index}"><span><strong>${choice[0]}</strong><small>${choice[1]}</small></span><b>↗</b></button>`).join("")}</div></article>`; }
export function listenChoices(onChoose) { document.addEventListener("click", (event) => { const button = event.target.closest("[data-choice]"); if (button) onChoose(Number(button.dataset.choice)); }); }
shell();
