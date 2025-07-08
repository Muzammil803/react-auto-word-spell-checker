import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
export { default as SpellCheckerWrapper } from "./components/SpellCheckerWrapper";

createRoot(document.getElementById("root")!).render(<StrictMode></StrictMode>);
