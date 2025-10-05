import React from "react";

function ScoreBoard({ score, total }) {
  return (
    <div className="score-board">
      <h3>✅ Score: {score} / {total}</h3>
    </div>
  );
}

export default ScoreBoard;
