import React, { Children, createContext, useContext, useState } from "react";
import { questions } from '../data/questions';

const QuizContext = createContext();

export const QuizProvider = ({ Children }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const nextQuestion = (isCorrect) => {
        if (isCorrect) setScore(prev => prev + 1);
        if(currentQuestion + 1 < questions.length) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setQuizFinished(true);
        }
    };

    const resetQuiz = () => {
        setScore(0);
        setCurrentQuestion(0);
        setQuizFinished(false);
    };

    return (
        <QuizContext.Provider
        value={{ questions, currentQuestion, score, quizFinished, nextQuestion, resetQuiz }}>
            { Children }
        </QuizContext.Provider>
    )
}
export const useQuiz = () => useContext(QuizContext);