// src/App.jsx
import React, {useState} from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Practice from "./pages/Practice";
import Stats from "./pages/Stats";
import "./index.css";

export default function App(){
  const [session,setSession] = useState(null); // {level,mode}
  const start = (level,mode) => setSession({level,mode});
  const exit = ()=> setSession(null);

  return (
    <>
      <Header />
      {!session ? (
        <>
          <Home onStart={start} />
          <Stats />
        </>
      ) : (
        <Practice level={session.level} onExit={exit} />
      )}
    </>
  );
}

