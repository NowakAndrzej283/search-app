import React from "react";
import type { AutocompleteProps } from "../types/types";
import { useAutocomplete } from "../hooks/useAutocomplete";
import "../styles/styles.css";

export function Autocomplete<T>(props: AutocompleteProps<T>) {
  const { value, placeholder } = props;

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

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && e.key !== "Enter") setOpen(true);

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filteredOptions.length - 1));
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;

      case "Enter":
        e.preventDefault();

        const selected = filteredOptions[activeIndex];

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
      {/* selected items */}
      <div className="ac-selected">
        {value.map((v) => (
          <span key={v.value} className="ac-chip">
            {v.label}
            <button onClick={() => removeOption(v)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#000000"
                viewBox="0 0 256 256"
                className="ac-icon"
              >
                <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
              </svg>
            </button>
          </span>
        ))}
      </div>

      {/* input */}
      <input
        className="ac-input"
        value={input}
        placeholder={placeholder}
        onChange={(e) => {
          setInput(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-expanded={open}
      />

      {/* dropdown */}
      {open && (
        <ul className="ac-dropdown" role="listbox">
          {filteredOptions.map((opt, i) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={i === activeIndex}
              className={`ac-item ${i === activeIndex ? "active" : ""}`}
              onMouseDown={() => selectOption(opt)}
            >
              {opt.label}
            </li>
          ))}

          {props.allowCreate && input && (
            <li className="ac-create" onMouseDown={createOption}>
              + Create "{input}"
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
