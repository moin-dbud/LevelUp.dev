import React from 'react';
import { useParams } from 'react-router-dom';

const Task = () => {
    const { id } = useParams();

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-black text-white mb-4"
                    style={{ fontFamily: 'outfit, outfit Fallback' }}>
                    Task
                </h1>
                <p className="text-gray-400 text-lg mb-2">
                    Task ID: <span className="text-blue-500 font-bold">{id}</span>
                </p>
                <p className="text-gray-400">
                    Complete your daily build mission
                </p>
            </div>
        </div>
    );
};

export default Task;
