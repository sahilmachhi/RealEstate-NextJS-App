import React from "react";
import Header from "./_components/Header";
function Provider({ children }) {
  return (
    <>
      <main className="min-h-screen p-[20px] relative">
        <Header />
        <div className="flex items-center justify-center top-24 w-full relative">
          {children}
        </div>
      </main>
    </>
  );
}

export default Provider;
