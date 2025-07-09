import React, { createContext, useContext, useState, useEffect } from "react";
import { questions } from '../data/questions';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);

    // Timer Logic
    useEffect(() => {
        if(quizFinished) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if(prev <= 1) {
                    //clearInterval(timer);
                    setQuizFinished(true);
                    return 0;
                }
                return prev - 1;
            })
        }, 1000);
        return () => clearInterval(timer);
    }, [quizFinished]);

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
        setTimeLeft(60);
    };

    return (
        <QuizContext.Provider
        value={{ questions, currentQuestion, score, quizFinished, nextQuestion, resetQuiz, timeLeft }}>
            { children }
        </QuizContext.Provider>
    )
}
export const useQuiz = () => useContext(QuizContext);