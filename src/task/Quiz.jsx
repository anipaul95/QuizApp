import React, { useState } from 'react';
import QuizForm from './QuizForm';
import Question from './Question';
import Result from './Result';
import axios from 'axios';
import './Quiz.css'

function Quiz() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const correctAnswerCount = Object.values(answers).filter(Boolean).length;

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const fetchQuestions = async () => {
    const response = await axios.get(
      `https://opentdb.com/api.php?amount=10&difficulty=easy&category=${category}&type=multiple`
    );
    setQuestions(response.data.results);
  };

  const handleStartQuiz = async () => {
    await fetchQuestions();
    setCurrentQuestionIndex(0);
  };

  const handleAnswerSubmit = (questionIndex, selectedAnswer) => {
    const currentQuestion = questions[questionIndex];
    
    setAnswers({ ...answers, [questionIndex]: selectedAnswer });
    
    if (questionIndex < questions.length - 1) {
      setCurrentQuestionIndex(questionIndex + 1);
    } else {
      setShowResult(true);
    }
  };
  
  return (
    <div className="App"  style={{ backgroundImage: 'url("/ques1.png")' }}>
      <h1>Quizzical Quest</h1>
      <h2>The Ultimate Knowledge Challenge</h2>
      <hr />
      <br />
      <div className='quiz' >
      {!questions.length ? (
        <QuizForm
          name={name}
          category={category}
          onNameChange={handleNameChange}
          onCategoryChange={handleCategoryChange}
          onStartQuiz={handleStartQuiz}
        />
      ) : !showResult ? (
        <Question
          question={questions[currentQuestionIndex]}
          questionIndex={currentQuestionIndex}
          onAnswerSubmit={handleAnswerSubmit}
        />
      ) : (
        <Result questions={questions} answers={answers} name={name} correctAnswerCount={correctAnswerCount} />
        )}
      </div>
    </div>
  );
}

export default Quiz;
