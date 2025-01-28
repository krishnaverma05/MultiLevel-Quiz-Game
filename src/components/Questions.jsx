import React, { useState } from "react";
import './Questions.css';
const Question = ({ question, onSubmit, feedback }) => {
  const [answer, setAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswerChange = (value) => {
    setIsSubmitted(false);
    // if (!isSubmitted) {
    //   console.log(value);
    //   setAnswer(value.toString());
    //   setIsSubmitted(false);
    // }
    setAnswer(value.toString());
  };

  const handleSubmit = () => {
    if (!isSubmitted) {
      setIsSubmitted(true);
      onSubmit(answer);
    }
    setAnswer("");
  };

  const renderOptions = () => {
    if (question.type === "multiple-choice") {
      return question.options.map((option, index) => (
        <label key={index}>
          <input
            multiple
            type="radio"
            name="option"
            value={option}
            disabled={!!feedback}
            onChange={(e)=> {if(!feedback || feedback==null){
              handleAnswerChange(e.target.value);
            }}
          }
          />
          {option}
        </label>
      ));
    }

    if (question.type === "true-false") {
      return (
        <>
          <label>
            <input
              type="radio"
              name="true-false"
              value="true"
              disabled={!!feedback}
              onChange={(e) => handleAnswerChange(e.target.value)}
            />
            True
          </label>
          <label>
            <input
              type="radio"
              name="true-false"
              value="false"
              disabled={!!feedback}
              onChange={(e) => handleAnswerChange(e.target.value)}
            />
            False
          </label>
        </>
      );
    }

    if (question.type === "text-input") {
      return (
        <input
          type="text"
          value={answer}
          disabled={!!feedback}
          onChange={(e) => handleAnswerChange(e.target.value)}
          placeholder="Type your answer"
        />
      );
    }

    return null;
  };

  return (
    <div className="question-container">
      <h2>{question.question}</h2>
      <div>{renderOptions()}</div>
      <button className = 'sbutton' onClick={handleSubmit} disabled={isSubmitted}>
        Submit
      </button>
    </div>
  );
};

export default Question;
