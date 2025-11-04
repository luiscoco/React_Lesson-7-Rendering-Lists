# React 19 – Rendering Lists Playground (with Key Strategy Demo)

Interactive mini-app to practice `.map()`, `.filter()`, and compare key strategies (`id`, `index`, `random`).
Includes controls to shuffle and remove items so you can observe reconciliation behavior.

## Quick start

```bash
npm install
npm run dev
```

Open the URL printed in the terminal.

## What to try

- **Search** by name or profession.
- **Add** a new person.
- Switch **Key strategy** between `id` (best), `index` (problematic), and `random` (bad).
- Click **Shuffle** then **Remove first** to see how unstable keys confuse React.
- Inspect the console if you experiment with removing keys entirely in `PeopleList.jsx`.

## Build for production

```bash
npm run build
npm run preview
```
