// src/components/ProgressBar.jsx
import React from "react";

export default function ProgressBar({current,total}) {
  const pct = total ? Math.round((current/total)*100) : 0;
  return (
    <div className="progress-wrap">
      <div style={{fontSize:13}}>{current}/{total}</div>
      <div className="progress-bar">
        <div className="progress-fill" style={{width: `${pct}%`}} />
      </div>
    </div>
  );
}

