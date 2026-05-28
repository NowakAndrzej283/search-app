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

  filterFn?: (option: AutocompleteOption<T>, query: string) => boolean;
  
  maxLength?: number;
}