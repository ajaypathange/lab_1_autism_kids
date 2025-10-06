import React from "react";

const ScoreBoard = ({ score, total, onReset, onNextLevel, level }) => {
  const passed = score >= 3;
  return (
    <div className="score-board">
      <h2>🏁 Level {level} Completed!</h2>
      <h3>✅ Your Score: {score} / {total}</h3>

      {passed ? (
        <>
          <h3 className="success-message">🎉 You are eligible for Level {level + 1}!</h3>
          <button className="next-btn" onClick={onNextLevel}>➡️ Go to Level {level + 1}</button>
        </>
      ) : (
        <>
          <h3 className="try-message">😅 Try Again! You need at least 3 points.</h3>
          <button className="reset-btn" onClick={onReset}>🔄 Retry Level</button>
        </>
      )}
    </div>
  );
};

export default ScoreBoard;
