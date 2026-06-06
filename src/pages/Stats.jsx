// src/pages/Stats.jsx
import React,{useMemo,useState} from "react";
import wordsData from "../data/words.json";

export default function Stats(){
  const total = wordsData.length;
  const byLevel = useMemo(()=>{
    const map = {A1:[],A2:[],B1:[],B2:[]};
    wordsData.forEach(w => { if(map[w.level]) map[w.level].push(w); });
    return map;
  },[]);
  
  const [open, setOpen] = useState({A1:false,A2:false,B1:false,B2:false});
  
  return (
    <div className="container py-6">
      <div className="card bg-white/95 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-6">İstatistikler</h3>

        <div className="flex items-center gap-4 mb-8">
          <div className="text-5xl font-extrabold bg-gradient-to-r from-[#6a5af9] to-[#7b61ff] bg-clip-text text-transparent">{total}</div>
          <div className="text-gray-500 font-medium">Toplam kelime sayısı</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(byLevel).map(([lvl,arr])=>(
            <div key={lvl} className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-bold text-gray-700">{lvl}</span>
                <span className="text-2xl font-extrabold text-purple-600">{arr.length}</span>
              </div>

              <div 
                className="flex justify-between items-center py-2 border-t border-dashed border-gray-200 cursor-pointer hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors" 
                onClick={()=> setOpen(o=> ({...o,[lvl]:!o[lvl]}))}>
                <span className="text-xs text-gray-500 font-medium">{open[lvl] ? "Detayları gizle" : "Detayları göster"}</span>
                <span className={`text-xs font-bold ${open[lvl] ? "text-purple-600" : "text-gray-400"}`}>{open[lvl] ? "▲" : "▼"}</span>
              </div>

              {open[lvl] && (
                <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                  {arr.map(w=>(
                    <div key={w.id} className="flex justify-between items-center py-2 border-t border-dashed border-gray-100">
                      <span className="text-sm font-semibold text-gray-700">{w.english}</span>
                      <span className="text-sm text-gray-500">{w.turkish}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
