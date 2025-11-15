import { useState } from "react";

function Flashcard({ word, meaning }) {
  const [showMeaning, setShowMeaning] = useState(false);

  return (
    <div
      style={{
        border: "2px solid #4CAF50",
        borderRadius: "8px",
        padding: "20px",
        margin: "10px",
        cursor: "pointer",
        background: showMeaning ? "#f0f0f0" : "#fff"
      }}
      onClick={() => setShowMeaning(!showMeaning)}
    >
      <h3>{word}</h3>
      {showMeaning && <p>{meaning}</p>}
    </div>
  );
}

export default Flashcard;
