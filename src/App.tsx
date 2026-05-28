import { useState } from "react";
import { Autocomplete } from "./components/Autocomplete";
import type { AutocompleteOption } from "./types/types";
import './styles/styles.css';
import './styles/queries.css';
import './styles/general.css';

const options: AutocompleteOption[] = [
  { value: 1, label: "React" },
  { value: 2, label: "TypeScript" },
  { value: 3, label: "Node.js" },
  { value: 4, label: "MongoDB" },
  { value: 5, label: "Jenkins" },
];

export default function App() {
  const [value, setValue] = useState<AutocompleteOption[]>([]);

  return (
    <>
      <header className="header">
        <h1 className="header-primary">React Autocomplete Task</h1>
        <p className="subheading">
          Choose the options that you want or create your own!
        </p>
        <p className="signature">
          project by andrzej nowak
        </p>
      </header>
      <main>
        <section className="container search-section">
          <Autocomplete
            options={options}
            value={value}
            onChange={setValue}
            allowCreate
            onCreate={(input) => ({
              value: input,
              label: input,
            })}
            placeholder="Select or create..."
            maxLength={25}
            />
            
        </section>
      </main>
    </>
  );
}
