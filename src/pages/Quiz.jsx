import React, { useEffect } from "react";
import { useQuiz } from '../context/QuizContext';
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionsCard";

const Quiz = () => {
    const {questions, currentQuestion, nextQuestion, quizFinished, timeLeft} = useQuiz();
    const q = questions[currentQuestion] || {};
    const navigate = useNavigate();

    const handleAswer = (selectedOption) => {
        const isCorrect = selectedOption === q.answer;
        nextQuestion(isCorrect, selectedOption);
        if(currentQuestion === questions.length - 1){
            navigate("/result");
        }
    };

    // Redirect if time is up
    useEffect(() => {
        if(quizFinished) {
            navigate("/result");
        }
    }, [quizFinished, navigate])


    return (
        <div>
            <div className="text-center mt-4 text-lg text-red-600 font-semibold">
                Time Left: {timeLeft > 0 ? timeLeft: 0} seconds
            </div>
            <QuestionCard 
            question={q.question}
            options={q.options}
            onSelect={handleAswer}
            />
        </div>
    )
}
export default Quiz;