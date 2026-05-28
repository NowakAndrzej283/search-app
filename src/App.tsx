// import { useState } from 'react'

// import './App.css'

// function App() {

//   return (
//     <>

//     </>
//   )
// }

// export default App

import { useState } from "react";
import { Autocomplete } from "./components/Autocomplete";
import type { AutocompleteOption } from "./types/types";
import './styles/styles.css';

const options: AutocompleteOption[] = [
  { value: 1, label: "React" },
  { value: 2, label: "TypeScript" },
  { value: 3, label: "Node.js" },
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
            />
        </section>
      </main>
    </>
  );
}
