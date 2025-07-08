import React from "react";
import { questions } from '../data/questions';

const QuestionsCard = ({ question, options, onSelect }) => {
    return (
        <div className="p-6 max-w-xl mx-auto mt-10 bg-white shadow-md rounded">
            <h2 className="text-xl font-semibold mb-4">{question}</h2>
            <div className="space-y-2">
                {options.map((option) => (
                    <button 
                    key={option}
                    onClick={()=> onSelect(option)}
                    className="w-full py-2 px-4 bg-blue-100 hover:bg-blue-300 rounded text-left"
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    )
}
export default QuestionsCard;