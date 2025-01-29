import React, { useState, useEffect } from "react";
import StartScreen from "./components/StartScreen.jsx";
import Question from "./components/Questions.jsx";
import EndScreen from "./components/EndScreen.jsx";
import questionsData from "./questions.json";
import './App.css';
const App = () => {
  const [gameState, setGameState] = useState("start");
  const [level, setLevel] = useState("easy");
  const [questions, setQuestions] = useState(questionsData[level]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [feedback, setFeedback] = useState(null); 
  const [timer, setTimer] = useState(15); 


  useEffect(() => {
    if (gameState === "quiz") {
      setTimer(15);
    }
  }, [currentQuestionIndex, gameState]);


  useEffect(() => {
    if (timer <= 0 && gameState === "quiz") {
      handleSubmit(null); 
    }

    const interval = setInterval(() => {
      if (timer > 0 && gameState === "quiz") {
        setTimer((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(interval); 
  }, [timer, gameState]);

  const handleStart = () => {
    setGameState("quiz");
  };

  const handleSubmit = (answer) => {

    const currentQuestion = questions[currentQuestionIndex];
    let isCorrect = false;
    if (answer === currentQuestion.correctAnswer) {
      
      setScore(score + (level === "easy" ? 10 : level === "medium" ? 20 : 30));
      setCorrectAnswers(correctAnswers + 1);
      isCorrect = true;
    }

    setFeedback(isCorrect ? "Correct!" : "Incorrect!");


    setTimeout(() => {
      setFeedback(null);


      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
 
        if (correctAnswers + (isCorrect ? 1 : 0) >= 2) {
          if (level === "easy") {
            setLevel("medium");
            setQuestions(questionsData["medium"]);
          } else if (level === "medium") {
            setLevel("hard");
            setQuestions(questionsData["hard"]);
          } else {
            setGameState("end");
          }
        } else {
          setGameState("end");
        }

        setCurrentQuestionIndex(0);
        setCorrectAnswers(0);
      }
    }, 2000);
  };

  const handleRestart = () => {
    setGameState("start");
    setLevel("easy");
    setQuestions(questionsData["easy"]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCorrectAnswers(0);
    setFeedback(null);
  };

  if (gameState === "start") {
    return <StartScreen onStart={handleStart} />;
  }

  if (gameState === "quiz") {
    return (
      <div>
        <h2>Level: {level.toUpperCase()}</h2>
        <h3>Time Remaining: {timer}s</h3>
        <Question
          question={questions[currentQuestionIndex]}
          onSubmit={handleSubmit}
          feedback={feedback}
        />
        {feedback && <p>{feedback}</p>}

      </div>
    );
  }

  if (gameState === "end") {
    return <EndScreen score={score} onRestart={handleRestart} />;
  }

  return null;
};

export default App;
