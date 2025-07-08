import React from "react";
import { useQuiz } from '../context/QuizContext';
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionsCard";

const Quiz = () => {
    const {questions, currentQuestion, nextQuestion} = useQuiz();
    const q = questions[currentQuestion];
    const navigate = useNavigate();

    const handleAswer = (selectedOption) => {
        const isCorrect = selectedOption === q.answer;
        nextQuestion(isCorrect);
        if(currentQuestion === questions.length - 1){
            navigate("/result");
        }
    };

    return (
        <QuestionCard 
        question={q.question}
        options={q.options}
        onSelect={handleAswer}
        />
    )
}
export default Quiz;