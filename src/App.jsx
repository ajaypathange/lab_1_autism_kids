import React from "react";
import GameBoard from "./components/GameBoard";
import "./App.css";

function App() {
  return (
    <>
      <div className="app">
        <h1> Shape & Number Sorting Game</h1>
        <h3>Drag each item into the correct box!</h3>
        <GameBoard />
      </div>
    </>
  );
}

export default App;
