// src/pages/Home.jsx
import React,{useState} from "react";

export default function Home({onStart}){
  const [level,setLevel] = useState("A1");
  const [mode,setMode] = useState("practice");
  
  return(
    <div className="container py-8">
      <div className="card bg-white/95 backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Seviye Seçimi</h3>
        <div className="flex gap-2 mt-2 flex-wrap">
          {["A1","A2","B1","B2"].map(l=>(
            <button key={l}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                level===l 
                  ? "bg-gradient-to-r from-[#6a5af9] to-[#7b61ff] text-white shadow-md" 
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
              onClick={()=>setLevel(l)}>{l}</button>
          ))}
        </div>

        <h4 className="text-lg font-semibold mt-6 mb-2 text-gray-800">Mod</h4>
        <div className="flex gap-2 mt-2 flex-wrap">
          <button 
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
              mode==="practice"
                ? "bg-gradient-to-r from-[#6a5af9] to-[#7b61ff] text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
            onClick={()=>setMode("practice")}>Pratik Yap</button>
          <button 
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
              mode==="translate"
                ? "bg-gradient-to-r from-[#6a5af9] to-[#7b61ff] text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
            onClick={()=>setMode("translate")}>Çeviri</button>
        </div>

        <div className="mt-8 flex justify-center">
          <button 
            className="bg-gradient-to-r from-[#6a5af9] to-[#7b61ff] text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            onClick={()=>onStart(level,mode)}>Başla</button>
        </div>
      </div>
    </div>
  );
}
