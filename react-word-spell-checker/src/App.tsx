import { useState } from "react";
import SpellCheckerWrapper from "./components/SpellCheckerWrapper";

function App() {
  const [value, setValue] = useState("");

  return (
    <div className="app-container" style={{ padding: 20, maxWidth: 600 }}>
      <h2>Spell Checker Demo</h2>

      <SpellCheckerWrapper value={value} onChange={setValue}>
        <textarea
          rows={4}
          placeholder="Type something with spelling mistakes..."
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />
      </SpellCheckerWrapper>

      <p style={{ marginTop: "20px" }}>
        <strong>Live Value:</strong> {value}
      </p>
    </div>
  );
}

export default App;
