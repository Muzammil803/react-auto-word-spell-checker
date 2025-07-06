import React, { useEffect, useRef, useState } from "react";
import nspell from "nspell";
import aff from "./dictionaries/aff.aff?raw";
import dic from "./dictionaries/dic.dic?raw";
import type NSpell from "nspell";

interface SpellCheckerWrapperProps {
  value: string;
  onChange: (val: string) => void;
  className?: string;
  renderDropdown?: (
    suggestions: string[],
    onSelect: (word: string) => void
  ) => React.ReactNode;
  children: React.ReactElement<any>;
  suggestionLimit?: number;
}

const SpellCheckerWrapper: React.FC<SpellCheckerWrapperProps> = ({
  value,
  onChange,
  children,
  className,
  renderDropdown,
  suggestionLimit = 10,
}) => {
  const [spell, setSpell] = useState<NSpell | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dictionary = nspell(aff, dic);
    setSpell(dictionary);

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const text = e.target.value;
    onChange(text);

    if (!spell) return;

    const words = text.trim().split(/\s+/);
    const lastWord = words[words.length - 1] || "";

    if (lastWord && !spell.correct(lastWord)) {
      const sugs = spell.suggest(lastWord).slice(0, suggestionLimit);
      setSuggestions(sugs);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    const words = value.trim().split(/\s+/);
    words[words.length - 1] = suggestion;
    const updatedText = words.join(" ") + " ";
    onChange(updatedText);
    setSuggestions([]);
  };

  const defaultDropdown = () => (
    <ul
      style={{
        position: "absolute",
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: "4px",
        zIndex: 1000,
        listStyle: "none",
        padding: 0,
        marginTop: "4px",
        maxHeight: "150px",
        overflowY: "auto",
        width: "100%",
      }}
    >
      {suggestions.map((s) => (
        <li
          key={s}
          style={{
            padding: "8px 12px",
            borderBottom: "1px solid #eee",
            cursor: "pointer",
          }}
          onClick={() => handleSelectSuggestion(s)}
        >
          {s}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: "relative" }}
    >
      {React.cloneElement(children, {
        value,
        onChange: handleInputChange,
        spellCheck: false,
      })}
      {suggestions.length > 0 &&
        (renderDropdown
          ? renderDropdown(suggestions, handleSelectSuggestion)
          : defaultDropdown())}
    </div>
  );
};

export default SpellCheckerWrapper;
