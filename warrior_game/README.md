# Warrior — Turn-Based Battle Game (React version)

A React rebuild of the browser Warrior game, using Vite as the dev/build tool.

## Folder structure

```
warrior_game_react/
├── index.html                 Vite entry HTML — loads src/main.jsx
├── package.json                Dependencies and scripts
├── vite.config.js              Vite + React plugin config
└── src/
    ├── main.jsx                 Mounts <App /> into #root
    ├── App.jsx                  Main game state and turn logic
    ├── styles.css                Theme, layout, animations (unchanged from CSS version)
    ├── data/
    │   └── enemies.js            Starting stats for player + enemies, rand() helper
    └── components/
        ├── Sprites.jsx            SVG sprite components (warrior, goblin, orc, dragon)
        ├── BattleStage.jsx        The sprite arena + floating damage numbers
        ├── StatusPanel.jsx        HP bars for player and enemy
        ├── GameUI.jsx             Buttons, roster strip, combat log, end screen
        └── FloatingNumber.jsx     A single floating +/- number, self-removes after 900ms
```

## How to run

You need [Node.js](https://nodejs.org) installed (v18+ recommended).

```bash
cd warrior_game_react
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build a production version:

```bash
npm run build
```

This outputs static files to `dist/`, which you can deploy anywhere (Vercel, Netlify, GitHub Pages, etc).

## What changed from the plain HTML/CSS/JS version

The visuals and rules are identical — same enemies, same damage ranges, same
animations. What changed is how the UI is built:

| Plain JS version | React version |
|---|---|
| One global `player` / `enemies` object, mutated directly | `useState` for `player`, `enemies`, `enemyIndex`, etc. — state updates trigger re-renders |
| `render()` manually rebuilds `innerHTML` every turn | Components re-render automatically when state changes |
| Animation classes added/left on DOM nodes directly | Animation state (`playerAnim`, `enemyAnim`, `shake`) lives in `useState`, cleared with `setTimeout` |
| One big `game.js` file | Logic split into `App.jsx` (state + turns) and small presentational components (`BattleStage`, `StatusPanel`, `GameUI`) |
| Floating damage numbers added/removed manually from the DOM | `FloatingNumber` component removes itself via a `useEffect` timer |

## Extending it

To add a new mechanic (e.g. a "Defend" action or critical hits):

1. Add fields to `INITIAL_PLAYER` or the enemy objects in `src/data/enemies.js`.
2. Add a new handler function in `App.jsx` (following the pattern of `doAttack`/`doHeal`) that updates state via `setPlayer`/`setEnemies` and calls `addLog(...)`.
3. Wire up a new button in `GameUI.jsx` if needed.

React re-renders the UI automatically — no manual `render()` call needed.
