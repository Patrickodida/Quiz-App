import React, { createContext, useContext, useState, useEffect } from "react";
import { questions } from '../data/questions';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [userAnswers, setUserAnswers] = useState([]);

    // Timer Logic
    useEffect(() => {
        if(quizFinished) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if(prev <= 1) {
                    setQuizFinished(true);
                    return 0;
                }
                return prev - 1;
            })
        }, 1000);
        return () => clearInterval(timer);
    }, [quizFinished]);

        // ✅ 2. ADDED: Append unanswered questions when quiz finishes
    useEffect(() => {
        if (!quizFinished) return;

        setUserAnswers(prev => {
            const answered = new Set(prev.map(ans => ans.question));  // ✅ moved here safely
            const unanswered = questions
                .filter(q => !answered.has(q.question))
                .map(q => ({
                    question: q.question,
                    correct: q.answer,
                    selected: null,
                    isCorrect: false
                }));

            return [...prev, ...unanswered];  // ✅ now correct
        });
    }, [quizFinished]);  // ✅ NEW useEffect hook

    const nextQuestion = (isCorrect, selectedOption) => {
        const currentQ = questions[currentQuestion];

        const answerObject = {
            question: currentQ.question,
            correct: currentQ.answer,
            selected: selectedOption || null,
            isCorrect: selectedOption === currentQ.answer
        };

        setUserAnswers(prev => [...prev, answerObject]);

        if (answerObject.isCorrect) setScore(prev => prev + 1);
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
        setUserAnswers([]);
    };

    return (
        <QuizContext.Provider
        value={{ questions, currentQuestion, score, quizFinished, nextQuestion, resetQuiz, timeLeft, userAnswers }}>
            { children }
        </QuizContext.Provider>
    )
}
export const useQuiz = () => useContext(QuizContext);