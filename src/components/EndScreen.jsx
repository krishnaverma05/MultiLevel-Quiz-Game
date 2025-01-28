import React from "react";
import "./EndScreen.css";

const EndScreen = ({ score, onRestart }) => {
  return (
    <div className="end-screen">
      <h1>Game Over!</h1>
      <p>Your final score: {score}</p>
      <button onClick={onRestart}>Restart</button>
    </div>
  );
};

export default EndScreen;
