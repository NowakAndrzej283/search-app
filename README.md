# Generic Autocomplete Component

A reusable and accessible Autocomplete component built with React and TypeScript.

The component supports:

* selecting predefined items
* dynamic creation of new options
* keyboard navigation
* accessibility features
* reusable generic typing

---

# Features

* Generic TypeScript implementation
* Dynamic option creation
* Keyboard navigation

  * Arrow Up
  * Arrow Down
  * Enter
  * Escape
* Click outside detection
* Remove selected items
* Prevent duplicate selections
* Accessible ARIA attributes
* No external autocomplete libraries
* Configurable API-first design

---

# Tech Stack

* React
* TypeScript
* Vite
* CSS
* HTML

---

# Installation

```bash
bun install
```

---

# Run Development Server

```bash
bun run dev
```

---

# Build Project

```bash
bun run build
```

---

# Accessibility

The component includes:

* `role="combobox"`
* `role="listbox"`
* `role="option"`
* `aria-expanded`
* `aria-selected`

Keyboard navigation is fully supported.

---

# Project Structure

```txt
src/
  components/
     Autocomplete.tsx 
  hooks/
     useAutocomplete.ts
  styles/
     styles.css
     general.css
     queries.css
  types/
     types.ts
App.tsx
index.html
```

---

# AI Usage

AI assistance was used during:

* API design
* architecture planning
* accessibility improvements
* keyboard navigation implementation
* edge case handling

The full AI interaction log is available in:

```txt
ai-logs.md
```

---

# Future Improvements

Possible future enhancements:

* async data loading
* debounced search
* virtualization for large datasets
* custom option rendering
* grouped options
* React Portal dropdown rendering

---

# Author
Andrzej Nowak 


