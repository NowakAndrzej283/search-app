import { useMemo, useState } from "react";
import type { AutocompleteOption, AutocompleteProps } from "../types/types";

export function useAutocomplete<T>(props: AutocompleteProps<T>) {
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
    const selectedValues = new Set(value.map(v => v.value));
  
    return options
      .filter(o => !selectedValues.has(o.value))
      .filter(o =>
        filterFn
          ? filterFn(o, input)
          : o.label.toLowerCase().includes(input.toLowerCase())
      );
  }, [input, options, value, filterFn]);

  const selectOption = (option: AutocompleteOption<T>) => {
    const exists = value.some((v) => v.value === option.value);
    if (exists) return;

    onChange([...value, option]);
    setInput("");
    setActiveIndex(0);
    setOpen(false);
  };

  const removeOption = (option: AutocompleteOption<T>) => {
    onChange(value.filter((v) => v.value !== option.value));
  };

  const createOption = () => {
    if (!allowCreate || !onCreate || !input.trim()) return;

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