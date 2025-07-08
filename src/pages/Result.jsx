import React from "react";
import { useQuiz } from "../context/QuizContext";
import { Link } from "react-router-dom";

const Result = () => {
    const {score, questions, resetQuiz} = useQuiz();


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
            <h1 className="text-2xl font-bold mb-4">Quiz Completed!</h1>
            <p className="text-xl mb-6">
                Your Score:{score}/{questions.length}
            </p>
            <Link to="/">
                <button
                onClick={resetQuiz}
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Try Again
                </button>
            </Link>
        </div>
    )
}
export default Result;