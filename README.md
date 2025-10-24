# TRIA's Contact List

A small React + Vite contact manager application with local persistence and a clean, responsive UI using Tailwind CSS.

## Quick summary

- Tech: React (v19), Vite, Tailwind CSS
- Purpose: Manage a personal contact list — add, edit, delete, search, restore deleted contacts, and toggle theme.
- Persistence: Uses `localStorage` for contacts, deleted-contacts history, and theme preference.

## Features

- Add new contacts (name, phone, email).
- Inline edit on each contact card (save/cancel flows).
- Delete a contact with confirmation; deleted items are moved to a deleted-history list.
- Restore deleted contacts back into the main list.
- Clear all contacts (with confirmation) and reset to bundled sample contacts.
- Search contacts by name (case-insensitive substring matching).
- Light / dark theme toggle with preference saved to `localStorage`.
- Simple responsive two-column layout: left column for search + list, right column for add form + deleted-history.

## Important implementation notes

- Entry point: `src/main.jsx` (mounts the app). Main UI located at `src/App.jsx`.
- Components are in `src/components/`:
  - `AddContactForm.jsx` — form to create new contacts (used via `onAdd`).
  - `ContactList.jsx` — renders a list of `ContactCard` components.
  - `ContactCard.jsx` — shows contact details and supports inline editing and delete.
  - `DeletedContacts.jsx` — shows deleted-contact history and restore/clear actions.
  - `SearchBar.jsx` — simple controlled input for filtering contacts.
- Sample data: `src/data/contacts.js` provides initial sample contacts used on first load (or on reset).

- The app stores three keys in `localStorage`:

  - `contacts` — the current live contact list.
  - `deletedContacts` — history of deleted contacts (includes `deletedAt`).
  - `theme` — either `dark` or `light` for UI theme preference.

- Confirmations use the browser `confirm()` dialog for destructive actions (delete, clear all, reset, clear deleted history).

- Contact IDs are created with `Date.now()` when adding new contacts. This is a simple approach and works for local/small datasets but is not safe for distributed or concurrent scenarios.

## File / Data flow (brief)

- `AddContactForm` -> calls `onAdd(newContact)` passed from `App` -> `App` appends `{ id: Date.now(), ...newContact }` to `contacts` state.
- `ContactCard` edit -> calls `onUpdate(id, updatedData)` -> `App` maps and replaces contact; state persisted to `localStorage` via `useEffect`.
- `ContactCard` delete -> `onDelete(id)` in `App` finds the contact, confirms with user, removes it from `contacts` and prepends it to `deletedContacts` with a `deletedAt` timestamp; both arrays are saved to `localStorage`.

## How to run (development)

The project uses npm + Vite. From the project root run (PowerShell):

```powershell
npm install
npm run dev
```

- `npm run dev` starts Vite's development server (hot reload).
- `npm run build` produces a production build.
- `npm run preview` runs a local preview of the built app.

These script names and commands are taken directly from `package.json`.

## Dependencies (high level)

- React, ReactDOM
- Vite (build/dev)
- Tailwind CSS (utility classes are used throughout the components)

See `package.json` for exact versions.

## UX / Accessibility notes

- Buttons and form inputs use visible text and emoji icons; fine for a small demo app but replace emoji with accessible icons or aria-labels for production.
- Search is case-insensitive and searches the `name` field only.
- Consider adding keyboard accessible focus states and proper ARIA attributes to lists / dialogs if accessibility is a priority.

## Potential improvements / next steps

- Replace `Date.now()` ids with uuid/v4 for stronger uniqueness.
- Add validation on `AddContactForm` (e.g., email pattern, phone normalization).
- Add sorting or grouping (alphabetical, recent, favorites).
- Replace `confirm()` calls with a custom modal for a better UX and accessibility.
- Add unit / integration tests (React Testing Library + Vitest).
- Export / import contacts as JSON or CSV for backup and portability.

## Troubleshooting

- If Tailwind styles don't appear, verify the Tailwind configuration and that `postcss` / `tailwindcss` are configured in the Vite pipeline (this project expects Tailwind to be already integrated).
- If `localStorage` contains stale data during development, clear the site data in the browser or remove the `contacts` / `deletedContacts` keys from the browser devtools Application tab.

## License

- No license specified in this repository by default. Add a `LICENSE` file if you intend to open-source the project.

# Created By- Mohammad Musa

