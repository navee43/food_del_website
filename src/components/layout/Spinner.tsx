"use client";
import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black ">
      <div
        className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin"
        style={{
          borderColor: "#d4af37", // Gold
          borderTopColor: "transparent",
        }}
      ></div>
    </div>
  );
};

export default Spinner;
