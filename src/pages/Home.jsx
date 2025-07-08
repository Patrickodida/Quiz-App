import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
            <h1 className="text-3xl font-bold mb-6">Welcome to the Quiz App</h1>
            <Link to="/quiz">
            <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Start Quiz
            </button>
            </Link>
        </div>
    )
}
export default Home;