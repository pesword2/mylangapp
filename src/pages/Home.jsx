// src/pages/Home.jsx
import React,{useState} from "react";

export default function Home({onStart}){
  const [level,setLevel] = useState("A1");
  const [mode,setMode] = useState("practice");

  return(
    <div className="container">
      <div className="card">
        <h3>Seviye Seçimi</h3>
        <div style={{display:"flex",gap:8,marginTop:8}}>
          {["A1","A2","B1","B2"].map(l=>(
            <button key={l}
              className="level-btn"
              style={{background:level===l?"linear-gradient(90deg,var(--primary-start),var(--primary-end))":"#fff",
                color:level===l?"#fff":"#111"}}
              onClick={()=>setLevel(l)}>{l}</button>
          ))}
        </div>

        <h4 style={{marginTop:18}}>Mod</h4>
        <div style={{display:"flex",gap:8,marginTop:8}}>
          <button className="level-btn"
            style={{background:mode==="practice"?"linear-gradient(90deg,var(--primary-start),var(--primary-end))":"#fff",
              color:mode==="practice"?"#fff":"#111"}}
            onClick={()=>setMode("practice")}>Pratik Yap</button>
          <button className="level-btn"
            style={{background:mode==="translate"?"linear-gradient(90deg,var(--primary-start),var(--primary-end))":"#fff",
              color:mode==="translate"?"#fff":"#111"}}
            onClick={()=>setMode("translate")}>Çeviri</button>
        </div>

        <div style={{marginTop:18,display:"flex",justifyContent:"center"}}>
          <button className="primary" onClick={()=>onStart(level,mode)}>Başla</button>
        </div>
      </div>
    </div>
  );
}

