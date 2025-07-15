import React, { useState, useEffect } from "react";
import { useQuiz } from "../context/QuizContext";
import { Link, useNavigate } from "react-router-dom";

const Result = () => {
    const {score, questions, resetQuiz, userAnswers, quizFinished} = useQuiz();
    const total = questions.length;
    const percentage = (score / total) * 100;

    const passedAll = score === total;
    const highScore = percentage >= 80;
    const belowAverage = percentage < 80;

    const [filter, setFilter] = useState("all");

    const filteredAnswers = userAnswers.filter((ans) => {

        if (filter === "all") return true;
        if (filter === "correct") return ans.isCorrect;
        if (filter === "incorrect") return ans.isCorrect === false && ans.selected !== null;
        if (filter === "unanswered") return ans.selected === null;
        return true;
    });

    const navigate = useNavigate();

    // Redirect to Home page if the quiz is not completed
    useEffect(() => {
        if (!quizFinished) {
            navigate("/");
        }
    }, [quizFinished, navigate]);

    const renderFilterButton = (label, value) => (
        <button
        onClick={() => setFilter(value)}
        className={`px-4 py-2 rounded ${
            filter === value ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800"
        } hover:bg-blue-500 hover:text-white transition`}
        >
            {label}
        </button>
    );

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
            <h1 className="text-2xl font-bold mb-4">Quiz Completed!</h1>
            <p className="text-xl mb-6">
                Your Score:{score}/{questions.length}
            </p>

            {highScore && (
                <p className="text-green-600 font-semibold text-lg mb-4">
                    🎉 Congrats! You did really well!
                </p>
            )}

            {belowAverage && (
                <p className="text-red-500 font-semibold text-lg mb-4">
                        Below average
                </p>
            )}

            {!passedAll && (
                <Link to="/">
                <button
                onClick={resetQuiz}
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Try Again
                </button>
            </Link>
            )}

            <div className="flex gap-2 mt-4 flex-wrap justify-center">
                {renderFilterButton("All", "all")}
                {renderFilterButton("Correct", "correct")}
                {renderFilterButton("Incorrect", "incorrect")}
                {renderFilterButton("Unanswered", "unanswered")}
            </div>

            <div className="mt-6 w-full max-w-2xl text-left">
                {filteredAnswers.length === 0 ? (
                    <p className="text-gray-600 text-center">
                        No questions to show for this filter.
                    </p>
                ) : (
                    filteredAnswers.map((item, index) => (
                        <div key={index} className="bg-white shadow-md rounded p-4 mb-4">
                            <p className="font-semibold mb-1">Q{index + 1}: {item.question}</p>
                            {item.selected !== null ? (
                                <>
                                    <p 
                                    className={`${item.isCorrect ? "text-green-600" : "text-red-600"}`}
                                    >
                                        Your Answer: {item.selected}
                                    </p>
                                    {!item.isCorrect && (
                                        <p className="text-green-700">
                                            Correct Answer: {item.correct}
                                        </p>
                                    )}
                                </>
                            ) : (
                                <p className="text-yellow-600">You did not answer this question.</p>
                            )}
                        </div>
                    ))
                )}
            </div>
            
        </div>
    )
}
export default Result;