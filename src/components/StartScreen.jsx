import React from "react";
import './StartScreen.css';
const StartScreen = ({ onStart }) => {
  return (
    <div className="start-screen">
      <h1>Welcome to the Quiz Game!</h1>
      <button onClick={onStart}>Start Quiz</button>
    </div>
  );
};

export default StartScreen;
