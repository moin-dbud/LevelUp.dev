import React from 'react';
import { useParams } from 'react-router-dom';

const Course = () => {
    const { id } = useParams();

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-black text-white mb-4"
                    style={{ fontFamily: 'outfit, outfit Fallback' }}>
                    Course
                </h1>
                <p className="text-gray-400 text-lg mb-2">
                    Course ID: <span className="text-blue-500 font-bold">{id}</span>
                </p>
                <p className="text-gray-400">
                    Learn and build real-world projects
                </p>
            </div>
        </div>
    );
};

export default Course;
