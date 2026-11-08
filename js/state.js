const STORAGE_KEY = "trife-life-state";

export const events = [
  { category: "Friendship", title: "An unexpected invitation", timelineTitle: "Jamie invites you on a road trip", story: "Your friend Jamie texts you about a weekend road trip. The plan sounds exciting, but you've got a big project due on Monday.", choices: [["Go on the adventure", "Make memories with Jamie", { happiness: 8, health: 3, money: -120 }], ["Stay home and focus", "Get ahead on your project", { smarts: 6, money: 150, happiness: -3 }], ["Suggest a compromise", "Join for one day, then get back", { happiness: 3, smarts: 2, money: -50 }]] },
  { category: "Career", title: "A chance to shine", story: "Your manager asks you to present your latest work to the leadership team. It is a big opportunity, but the spotlight feels intimidating.", choices: [["Say yes and prepare", "Turn nerves into momentum", { smarts: 6, happiness: 3, money: 250 }], ["Let someone else present", "Keep a lower profile", { happiness: -2, health: 2 }]] },
  { category: "Health", title: "A reset for your routine", story: "You have been running on caffeine and late nights. Today, your body is asking for a little more care.", choices: [["Take a proper day off", "Rest is productive too", { health: 9, happiness: 4, money: -80 }], ["Push through the week", "You can rest later", { money: 180, health: -8, happiness: -4 }]] },
  { category: "Family", title: "Sunday at home", story: "A family member calls to invite you over for dinner. It has been a while since everyone sat around the same table.", choices: [["Make the time", "Reconnect over a home-cooked meal", { happiness: 8, health: 2, money: -35 }], ["Call instead", "Stay in and catch up remotely", { happiness: 2, smarts: 1 }]] },
  { category: "Career", title: "The side project", story: "A small idea you have been sketching could become a useful tool. You have an evening free to explore it.", choices: [["Build a prototype", "See where the idea takes you", { smarts: 8, happiness: 3, health: -2 }], ["File it for later", "Protect your evening", { health: 5, happiness: 2 }]] },
  { category: "Friendship", title: "A difficult conversation", story: "Jamie seems distant lately. You can feel a conversation waiting to happen.", choices: [["Ask what is going on", "Make space for honesty", { happiness: 6, health: 2 }], ["Give them room", "Trust the friendship can breathe", { health: 3, happiness: -1 }]] },
  { category: "Health", title: "Fresh air", story: "The weather is perfect for a walk, but your sofa is making a strong case for staying home.", choices: [["Go for the walk", "A little movement, a lot of clarity", { health: 7, happiness: 5 }], ["Stay cozy", "A quiet evening sounds good", { happiness: 3, health: -1 }]] },
  { category: "Family", title: "A thoughtful gift", story: "You spot something that would make your parent's week. It costs a little more than you planned to spend.", choices: [["Send the gift", "Show up in a small, meaningful way", { happiness: 7, money: -100 }], ["Write a note", "Sometimes words are enough", { happiness: 4, smarts: 1 }]] }
];

const initialState = {
  name: "Alex Morgan", age: 24, generation: 1, currentEvent: 0,
  stats: { health: 92, happiness: 78, smarts: 64, money: 12450 },
  timeline: [
    { age: 24, title: "Moved into a new apartment", category: "Career", time: "2 WEEKS AGO", detail: "A place that finally feels like yours." },
    { age: 24, title: "Started a new job", category: "Career", time: "1 MONTH AGO", detail: "A fresh challenge and a team full of possibility." },
    { age: 23, title: "Met Jamie at a concert", category: "Relationships", time: "3 MONTHS AGO", detail: "One song, one conversation, a friendship begins." },
    { age: 22, title: "Graduated from university", category: "Education", time: "LAST YEAR", detail: "You closed one chapter and opened another." }
  ],
  relationships: [
    { name: "Jamie Parker", initials: "JP", relation: "Best friend", description: "Always ready for an adventure.", score: 94, color: "lime" },
    { name: "Sam Kim", initials: "SK", relation: "Close friend", description: "Your go-to for a fresh perspective.", score: 87, color: "violet" },
    { name: "Alex Morgan Sr.", initials: "AM", relation: "Parent", description: "Proud of the person you're becoming.", score: 72, color: "blue" },
    { name: "Riley Lee", initials: "RL", relation: "Colleague", description: "A promising new connection at work.", score: 61, color: "gold" }
  ],
  settings: { notifications: true, sound: true, reduceMotion: false, private: false }
};

function clone(value) { return JSON.parse(JSON.stringify(value)); }
export function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return clone(initialState);
    const parsed = JSON.parse(saved);
    return { ...clone(initialState), ...parsed, stats: { ...initialState.stats, ...parsed.stats }, settings: { ...initialState.settings, ...parsed.settings } };
  } catch { return clone(initialState); }
}
export function saveState(state) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* Storage is optional. */ } }
export function money(value) { return `$${Math.max(0, value).toLocaleString()}`; }
export function clamp(value) { return Math.max(0, Math.min(100, value)); }
export function applyChoice(state, index) {
  const event = events[state.currentEvent % events.length];
  const choice = event.choices[index];
  if (!choice) return null;
  Object.entries(choice[2]).forEach(([key, amount]) => { state.stats[key] = key === "money" ? Math.max(0, state.stats[key] + amount) : clamp(state.stats[key] + amount); });
  state.timeline.unshift({ age: state.age, title: event.timelineTitle || event.title, category: event.category, time: "TODAY", detail: choice[1] });
  state.currentEvent = (state.currentEvent + 1) % events.length;
  saveState(state);
  return choice;
}
export function ageUp(state) {
  state.age = state.age >= 100 ? 1 : state.age + 1;
  state.stats.money += 2400;
  state.timeline.unshift({ age: state.age, title: `Turned ${state.age}`, category: "Family", time: "TODAY", detail: "A new year brings new possibilities." });
  saveState(state);
}
export function newLife(state) {
  const generation = state.generation + 1;
  const next = clone(initialState);
  next.generation = generation;
  saveState(next);
  return next;
}
