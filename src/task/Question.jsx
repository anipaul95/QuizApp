import React, { useState, useEffect } from 'react';
import './Quiz.css';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const Question = ({ question, questionIndex, onAnswerSubmit }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [remainingTime, setRemainingTime] = useState(30);

  useEffect(() => {
    const options = [...question.incorrect_answers, question.correct_answer];
    shuffleArray(options);
    setShuffledOptions(options);
  }, [question]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      handleSubmit();
    }
  }, [remainingTime]);

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleSubmit = () => {
    onAnswerSubmit(questionIndex, selectedAnswer);
    setSelectedAnswer('');
    setRemainingTime(30);
  };

  return (
    <div className="container">
      <h2 className="question-heading">Question {questionIndex + 1}:</h2>
      <p className="timer">Time Remaining: {remainingTime} seconds</p>
      <br />
      <p className="question-text">{question.question}</p>
      <div className="options">
        {shuffledOptions.map((option, index) => (
          <label key={index} className="option-label">
            <input
              type="radio"
              name={`question-${questionIndex}`}
              value={option}
              checked={selectedAnswer === option}
              onChange={handleAnswerChange}
              className='color-radio'
            />
            {option}
          </label>
        ))}
      </div>
         
      <br />
      <button onClick={handleSubmit} className="btn">
        Next
      </button>
    </div>
  );
};

export default Question;
