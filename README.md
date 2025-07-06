# react-word-spell-checker

> 🧠 A lightweight, fully customizable React component for real-time word spell checking using [nspell](https://www.npmjs.com/package/nspell). Works offline – no API required.

![npm](https://img.shields.io/npm/v/react-word-spell-checker)
![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-17%2B%20%7C%2018%2B%20%7C%2019%2B-61DAFB?logo=react)

---

## ✨ Features

- 🔍 Real-time spell checking while typing
- ✅ Fully offline (uses local Hunspell dictionary files)
- 🧩 Customizable dropdown rendering
- 💬 Works with `<textarea>` or `<input>`
- 📦 Easy to integrate into any React app

---

## 📦 Installation

```bash
npm install react-word-spell-checker
# or
yarn add react-word-spell-checker
```

---

## 🚀 Usage

Use `SpellCheckerWrapper` to wrap any controlled input or textarea and enable real-time spell checking:

```tsx
import { useState } from "react";
import { SpellCheckerWrapper } from "react-word-spell-checker";

function App() {
  const [text, setText] = useState("");

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <SpellCheckerWrapper value={text} onChange={setText}>
        <textarea placeholder="Type here..." />
      </SpellCheckerWrapper>
    </div>
  );
}
```

---

## 🎨 Custom Dropdown (Optional)

Customize the suggestion dropdown by providing a `renderDropdown` prop:

```tsx
<SpellCheckerWrapper
  value={text}
  onChange={setText}
  renderDropdown={(suggestions, onSelect) => (
    <ul
      style={{
        background: "#fff",
        border: "1px solid #ccc",
        padding: 0,
        listStyle: "none",
      }}
    >
      {suggestions.map((s) => (
        <li
          key={s}
          onClick={() => onSelect(s)}
          style={{ padding: "8px", cursor: "pointer" }}
        >
          🔠 {s}
        </li>
      ))}
    </ul>
  )}
>
  <textarea />
</SpellCheckerWrapper>
```

---

## 🔧 Props

| Prop              | Type                                               | Description                                  |
| ----------------- | -------------------------------------------------- | -------------------------------------------- |
| `value`           | `string`                                           | Controlled value for the input or textarea   |
| `onChange`        | `(val: string) => void`                            | Callback when the text changes               |
| `children`        | `ReactElement`                                     | The actual `<textarea>` or `<input>` element |
| `className`       | `string`                                           | Optional class name for the wrapper div      |
| `renderDropdown`  | `(suggestions: string[], select: fn) => ReactNode` | Optional function to customize dropdown UI   |
| `suggestionLimit` | `number`                                           | Max number of suggestions (default: `10`)    |

---

## 📁 How It Works

- 📚 Loads local Hunspell `.aff` and `.dic` dictionary files using Vite’s `?raw` import
- 🧠 Uses `nspell` to check spelling and suggest corrections
- 🔄 Monitors the last word typed for accuracy and displays suggestions
- 🔌 Works 100% offline — no backend or API calls

---

## 🛠 Built With

- [React](https://react.dev)
- [nspell](https://github.com/wooorm/nspell)
- [Vite](https://vitejs.dev)
- [TypeScript](https://www.typescriptlang.org/)

---

## 🧪 Local Development & Testing

To test your package locally in another app:

```bash
npm run build
npm pack
# You'll get: react-word-spell-checker-1.0.0.tgz

# In another React app:
npm install /path/to/react-word-spell-checker-1.0.0.tgz
```

---

## 🧾 License

MIT © [Muhammad Muzammil](https://github.com/Muzammil803)
