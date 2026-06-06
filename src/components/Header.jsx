// src/components/Header.jsx
import React from "react";

export default function Header() {
  return (
    <header className="container py-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-[#6a5af9] to-[#7b61ff] bg-clip-text text-transparent">
          MyLangApp Pro
        </h1>
        <span className="text-sm text-gray-300 font-medium">Minimal dil öğrenme platformu</span>
      </div>
    </header>
  );
}
