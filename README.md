# ⚔ Warrior — Turn-Based Battle Game

A browser-based turn-based RPG battle game built with **React + Vite**. Fight your way through 5 progressively harder enemies, each with a unique sprite and special ability. No game engine — just React, CSS animations, and hand-crafted SVG sprites.

🔴 **Live Demo:** [warreior-battle-game.vercel.app](https://warreior-battle-game.vercel.app)

---

## Screenshots

<img width="1883" height="941" alt="image" src="https://github.com/user-attachments/assets/9398fb85-e9b7-419b-ab7d-407a0e252c56" />


---

## Features

### ⚔ Combat System
- Turn-based — player acts first, then the enemy responds
- **Critical Hit system** — 20% chance to deal 1.75× damage with an orange screen flash
- **Attack**, **Heal** (potion-based), and **Emergency Heal** (+50 HP, once per run) actions
- Keyboard shortcuts: `A` Attack · `H` Heal · `E` Emergency · `Enter` Continue

### 👹 5 Unique Enemies
Each enemy has a hand-drawn SVG sprite, a title, and a special combat ability:

| Enemy | Title | Special Ability |
|---|---|---|
| Scrappy Goblin | Forest Pest | 25% chance to **dodge** your attack |
| Goblin Shaman | Cursed Trickster | 20% chance to **curse** you (-3 ATK) |
| Iron Orc | Brute Warrior | 20% chance to **enrage** (+4 ATK permanently) |
| Orc Warlord | Champion of Chaos | 20% chance to **double strike** (hits twice) |
| Inferno Dragon | Lord of Destruction | 25% chance for **Fire Breath** (150% damage) |

### 🎮 Progression & Rewards
- Defeating each enemy grants a permanent **ATK boost** to the player
- Reward shown in a dedicated **victory popup** after each kill
- Enemy tracker on the right side panel updates live as you progress

### 🎨 Visual Polish
- Unique **SVG sprites** for all 5 enemies + the player warrior — built in code, no images
- **Enemy death animation** — falls and fades before the popup appears
- **Slide-in animation** when a new enemy enters the arena
- **HP bars** shift color: red → orange → yellow as enemy HP drops
- 25% tick marks on all HP bars
- **Low HP warning** — player panel pulses red and blinks "⚠ Low HP" when below 25%
- **Battle stage background** changes color per enemy type (green, purple, brown, dark red)
- **Arena flash** on crits (orange) and fire breath (deep red)
- Idle bobbing animation on all sprites
- Floating damage/heal numbers pop off sprites on every hit

### 🏛 Layout
- **3-column layout** — animated torch side panels fill the screen on desktop
- Left panel: chapter title + decorative runes
- Right panel: live enemy progress tracker + keyboard shortcut reference
- Panels hidden automatically on mobile (responsive)

### 📊 End Screen Stats
After every run (win or lose) you see a full battle report:

| Stat | Description |
|---|---|
| Kills | Enemies defeated |
| Crits | Critical hits you landed |
| DMG Dealt | Total damage dealt to enemies |
| DMG Taken | Total damage received |
| Specials | Enemy special abilities that fired |
| Potions Left | Remaining potions |

---

## Tech Stack

| Technology | Use |
|---|---|
| React 18 | UI components and state management |
| Vite 5 | Dev server and production build |
| CSS3 | All animations, layout, theming |
| SVG | All sprites (no image files) |
| Vercel | Hosting and CI/CD |

---

## Project Structure

```
warrior_game/
├── index.html                  Vite entry HTML
├── package.json                Dependencies and scripts
├── vite.config.js              Vite + React plugin config
├── vercel.json                 Vercel deployment config
└── src/
    ├── main.jsx                Mounts <App /> into #root
    ├── App.jsx                 All game state, turn logic, special abilities
    ├── styles.css              Full theme, layout, animations, side panels
    ├── data/
    │   └── enemies.js          Enemy definitions (stats, specials, rewards), rand(), isCrit()
    └── components/
        ├── Sprites.jsx         SVG sprite components — PlayerSprite + 5 unique EnemySprites
        ├── BattleStage.jsx     Battle arena, wave progress pips, floating numbers
        ├── StatusPanel.jsx     HP bars with tick marks, ATK modifier badges, low HP pulse
        ├── GameUI.jsx          Action buttons, roster, combat log, victory popup, end screen
        └── FloatingNumber.jsx  Self-removing floating +/- number (damage, heal, crit, special)
```

---

## Running Locally

You need [Node.js](https://nodejs.org) v18 or higher.

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/Warreior_Battle_Game.git
cd Warreior_Battle_Game/warrior_game

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

```bash
# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## Deploying to Vercel

The project is pre-configured for Vercel via `vercel.json`.

**Option A — Dashboard**
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import repo
3. Set **Root Directory** to `warrior_game`
4. Click Deploy — done

**Option B — CLI**
```bash
npm install -g vercel
cd warrior_game
vercel
```

Every `git push` to `main` triggers an automatic redeploy.

---

## How to Extend

Adding a new mechanic is straightforward:

1. **New enemy** — add an entry to `INITIAL_ENEMIES` in `src/data/enemies.js` with `name`, `type`, `hp`, `attack`, `title`, `reward`, `atkBoost`, and `special`
2. **New enemy sprite** — add a function in `Sprites.jsx` and register it in the `EnemySprite` switch
3. **New player action** — add a handler in `App.jsx` following the `doAttack` / `doHeal` pattern, then wire a button in `GameUI.jsx`
4. **New special ability** — add `id` and `chance` to the enemy's `special` field, then handle the `id` inside `runEnemyTurn` in `App.jsx`

React re-renders automatically — no manual DOM updates needed.

---

# 👩‍💻 Author

**Amna Shakeel**

Python Developer | Software Engineering Student | Game 

---

## ⭐ If you found this project useful, consider giving it a star on GitHub!
