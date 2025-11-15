// src/components/LevelButton.jsx
import React from "react";

const levelColor = {
  A1: "var(--a1)",
  A2: "var(--a2)",
  B1: "var(--b1)",
  B2: "var(--b2)"
};

export default function LevelButton({level, active, onClick}) {
  return (
    <button
      className={"level-btn compact"}
      onClick={()=>onClick(level)}
      style={{
        background: active ? `linear-gradient(90deg, ${levelColor[level]} 0%, var(--primary-end) 100%)` : "#fff",
        color: active ? "#fff" : "#111",
        border: active ? "none" : "1px solid rgba(16,24,40,0.06)"
      }}
    >
      {level}
    </button>
  );
}

