# trife — Life Simulator

A dark, responsive life-simulation UI built with plain HTML, CSS, and vanilla JavaScript.

## Run locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server
```

Then visit `http://localhost:8000`.

The app uses one HTML entry point per screen and stores shared game state in `localStorage`.

## Files

- `index.html` — Overview
- `timeline.html` — Life timeline
- `relationships.html` — Relationships
- `career.html` — Career & money
- `activities.html` — Activities
- `education.html` — Education
- `assets.html` — Assets
- `event.html` — Event / decision
- `settings.html` — Settings
- `css/styles.css` — Shared design tokens and components
- `js/state.js` — Persistent game state and actions
- `js/layout.js` — Shared sidebar, top bar, profile, and toast shell
