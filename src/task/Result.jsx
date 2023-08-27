import React from 'react';
import './Quiz.css';

const Result = ({ questions, answers, name }) => {
  const totalQuestions = questions.length;
  const correctAnswerCount = questions.reduce((count, question, index) => {
    const isCorrect = answers[index] === question.correct_answer;
    return isCorrect ? count + 1 : count;
  }, 0);
  const scorePercentage = (correctAnswerCount / totalQuestions) * 100;
  let message = '';
  let progressBarColorClass = 'progress-bar'; 

  if (scorePercentage <= 40) {
    message = "Better luck next time";
    progressBarColorClass = 'progress-bar'; 
  } else if (scorePercentage <= 60) {
    message = "Good";
    progressBarColorClass = 'progress-bar orange'; 
  } else {
    message = "Congratulations";
    progressBarColorClass = 'progress-bar green'; 
  }

  return (
    <div>
      <h2 className=''>{message} {name}</h2>
      <p>Correct Count: {correctAnswerCount} / {totalQuestions}</p>
      <div className="progress-container">
        <div className={progressBarColorClass} style={{ width: `${scorePercentage}%` }}>
          {scorePercentage.toFixed(2)}%
        </div>
      </div>
      {questions.map((question, index) => (
        <div key={index}>
          <br />
          <p>
            Question {index + 1}: {answers[index] === question.correct_answer ? 'Correct' : 'Incorrect'}
          </p>
          <br />
          <p>Correct Answer: {question.correct_answer}</p>
        </div>
      ))}
      <hr />
      <div>
        <h1>Visit Again</h1>
      </div>
    </div>
  );
};

export default Result;
