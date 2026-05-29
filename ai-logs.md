# AI Logs — Autocomplete Component

This file documents the use of AI assistance during the implementation of a generic Autocomplete component in React + TypeScript.

The goal of this log is to provide transparency regarding prompts and generated responses used throughout the development process.

---

# Prompt 1

## User

okej, mam takie zadanie

Task

Prepare a UI component for autocomplete

Context: Write generic autocomplete component, that can be used e.g.
to choose one or more tags or dynamically add new ones.

Functional requirements:

* predefined list of items
* dynamic creation of new items
* generic for various data types
* keyboard navigation
* selected items visible/removable
* accessibility compliant

Technical requirements:

* React
* API-first design
* no external autocomplete libraries
* preferably TypeScript
* include ai-logs.md

---

# AI Response 1

The assistant explained:

* recruiters are evaluating:

  * API-first design
  * TypeScript generics
  * accessibility
  * state management
  * reusable architecture

Suggested API:

```ts
type Key = string | number;

export interface AutocompleteOption<T = unknown> {
  value: Key;
  label: string;
  raw?: T;
}

interface AutocompleteProps<T = unknown> {
  options: AutocompleteOption<T>[];

  value: AutocompleteOption<T>[];

  onChange: (value: AutocompleteOption<T>[]) => void;

  onCreate?: (input: string) => AutocompleteOption<T>;

  multiple?: boolean;

  placeholder?: string;

  allowCreate?: boolean;

  filterFn?: (
    option: AutocompleteOption<T>,
    query: string
  ) => boolean;
}
```

The assistant also recommended:

* controlled component design
* separation of logic into hooks
* keyboard accessibility
* ARIA roles

---

# Prompt 2

## User

okej czyli jak mam sie za to zabrac krok po kroku

---

# AI Response 2

The assistant proposed the following implementation plan:

1. Create Vite + React + TypeScript project
2. Design API first
3. Build static UI
4. Add component state
5. Implement filtering
6. Implement selection
7. Add keyboard navigation
8. Implement create option
9. Implement remove option
10. Add accessibility
11. Add styling
12. Test edge cases
13. Prepare README and ai-logs.md

Example filtering logic:

```ts
const filtered = options.filter(o =>
  o.label.toLowerCase().includes(input.toLowerCase())
);
```

Keyboard navigation example:

```ts
switch (e.key) {
  case "ArrowDown":
  case "ArrowUp":
  case "Enter":
  case "Escape":
}
```

---

# Prompt 3

## User

okej to teraz zaimplementuj to

---

# AI Response 3

## File: types.ts

```ts
export type Key = string | number;

export interface AutocompleteOption<T = unknown> {
  value: Key;
  label: string;
  raw?: T;
}

export interface AutocompleteProps<T = unknown> {
  options: AutocompleteOption<T>[];

  value: AutocompleteOption<T>[];
  onChange: (value: AutocompleteOption<T>[]) => void;

  multiple?: boolean;

  allowCreate?: boolean;
  onCreate?: (input: string) => AutocompleteOption<T>;

  placeholder?: string;

  filterFn?: (
    option: AutocompleteOption<T>,
    query: string
  ) => boolean;
}
```

---

## File: useAutocomplete.ts

```ts
import { useMemo, useState } from "react";
import {
  AutocompleteOption,
  AutocompleteProps,
} from "./types";

export function useAutocomplete<T>(
  props: AutocompleteProps<T>
) {
  const {
    options,
    value,
    onChange,
    allowCreate,
    onCreate,
    filterFn,
  } = props;

  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const filteredOptions = useMemo(() => {
    if (!input) return options;

    return options.filter((o) =>
      filterFn
        ? filterFn(o, input)
        : o.label
            .toLowerCase()
            .includes(input.toLowerCase())
    );
  }, [input, options, filterFn]);

  const selectOption = (
    option: AutocompleteOption<T>
  ) => {
    const exists = value.some(
      (v) => v.value === option.value
    );

    if (exists) return;

    onChange([...value, option]);

    setInput("");
    setActiveIndex(0);
    setOpen(false);
  };

  const removeOption = (
    option: AutocompleteOption<T>
  ) => {
    onChange(
      value.filter(
        (v) => v.value !== option.value
      )
    );
  };

  const createOption = () => {
    if (
      !allowCreate ||
      !onCreate ||
      !input.trim()
    )
      return;

    const newOption = onCreate(input);

    selectOption(newOption);
  };

  return {
    input,
    setInput,
    open,
    setOpen,
    activeIndex,
    setActiveIndex,
    filteredOptions,
    selectOption,
    removeOption,
    createOption,
  };
}
```

---

## File: Autocomplete.tsx

```tsx
import React from "react";
import { AutocompleteProps } from "./types";
import { useAutocomplete } from "./useAutocomplete";

export function Autocomplete<T>(
  props: AutocompleteProps<T>
) {
  const {
    value,
    placeholder,
  } = props;

  const {
    input,
    setInput,
    open,
    setOpen,
    activeIndex,
    setActiveIndex,
    filteredOptions,
    selectOption,
    removeOption,
    createOption,
  } = useAutocomplete(props);

  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!open && e.key !== "Enter")
      setOpen(true);

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();

        setActiveIndex((i) =>
          Math.min(
            i + 1,
            filteredOptions.length - 1
          )
        );

        break;

      case "ArrowUp":
        e.preventDefault();

        setActiveIndex((i) =>
          Math.max(i - 1, 0)
        );

        break;

      case "Enter":
        e.preventDefault();

        const selected =
          filteredOptions[activeIndex];

        if (selected) {
          selectOption(selected);
        } else {
          createOption();
        }

        break;

      case "Escape":
        setOpen(false);
        break;
    }
  };

  return (
    <div className="ac-container">
      <div className="ac-selected">
        {value.map((v) => (
          <span
            key={v.value}
            className="ac-chip"
          >
            {v.label}

            <button
              type="button"
              onClick={() =>
                removeOption(v)
              }
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <input
        className="ac-input"
        value={input}
        placeholder={placeholder}
        maxLength={25}
        onChange={(e) => {
          setInput(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-expanded={open}
      />

      {open && (
        <ul
          className="ac-dropdown"
          role="listbox"
        >
          {filteredOptions.map((opt, i) => (
            <li
              key={opt.value}
              role="option"
              tabIndex={-1}
              aria-selected={
                i === activeIndex
              }
              className={`ac-item ${
                i === activeIndex
                  ? "active"
                  : ""
              }`}
              onMouseDown={() =>
                selectOption(opt)
              }
            >
              {opt.label}
            </li>
          ))}

          {props.allowCreate &&
            input && (
              <li
                className="ac-create"
                onMouseDown={
                  createOption
                }
              >
                + Create "{input}"
              </li>
            )}
        </ul>
      )}
    </div>
  );
}
```

---

# Prompt 4

## User

mam to app.tsx i search-section to grid z dwoma kolumnami. Chce aby input był w jednej kolumnie a wartosci sie pojawialy w drugiej

---

# AI Response 4

The assistant suggested splitting layout into two sections using CSS Grid.

```css
.ac-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
```

The assistant also suggested:

* separating selected values
* keeping autocomplete logic inside a hook

---

# Prompt 5

## User

zrob tak zeby dropdowan nie pojawial sie w nowym rzedzie bo psuje mi to grida

---

# AI Response 5

The assistant suggested using absolute positioning.

```css
.ac-input-wrapper {
  position: relative;
}

.ac-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;

  z-index: 1000;

  background: white;
  border: 1px solid #ccc;

  max-height: 200px;
  overflow-y: auto;
}
```

---

# Prompt 6

## User

chce po kliknieciu poza pole inputa dropdown sie chowal

---

# AI Response 6

The assistant suggested click outside detection using `useRef` and `useEffect`.

```tsx
const wrapperRef =
  useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleClickOutside = (
    event: MouseEvent
  ) => {
    if (!wrapperRef.current) return;

    if (
      !wrapperRef.current.contains(
        event.target as Node
      )
    ) {
      setOpen(false);
    }
  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);
```

---

# Prompt 7

## User

teraz zrob tak zeby wartosc ktora juz zostala wybarna nie pojawiala sie w dropdownie

---

# AI Response 7

The assistant suggested filtering already selected values.

```ts
const filteredOptions = useMemo(() => {
  const selectedValues = new Set(
    value.map((v) => v.value)
  );

  return options
    .filter(
      (o) =>
        !selectedValues.has(o.value)
    )
    .filter((o) =>
      o.label
        .toLowerCase()
        .includes(input.toLowerCase())
    );
}, [input, options, value]);
```

---

# Prompt 8

## User

ogranicz liczbe wpisywanych znakow do 25 np

---

# AI Response 8

The assistant suggested using native `maxLength`.

```tsx
<input
  maxLength={25}
/>
```

---

# Prompt 9

## User

jest taki problem ze jak klikam spacje to dodają sie po kolei opcje

---

# AI Response 9

The assistant suggested:

* adding `type="button"` to buttons
* avoiding space key handling
* using `onMouseDown` instead of `onClick`

```tsx
<button
  type="button"
  onClick={() => removeOption(v)}
>
  ×
</button>
```

```tsx
<li
  tabIndex={-1}
  onMouseDown={() =>
    selectOption(opt)
  }
/>
```

---

# Final Notes

* No external autocomplete libraries were used.
* The implementation was custom-built in React + TypeScript.
* AI assistance was used for:

  * API design
  * architecture planning
  * keyboard navigation
  * accessibility improvements
  * edge case handling
  * styling suggestions

The final implementation was reviewed and adjusted manually during development.
