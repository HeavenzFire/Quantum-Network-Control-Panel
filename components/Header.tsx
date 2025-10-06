
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="p-4 border-b border-gray-800 bg-black/20 backdrop-blur-sm flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold text-blue-300 tracking-wider">
                Quantum Network Control Panel
            </h1>
            <div className="flex items-center space-x-2">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-green-400 text-sm">OPERATIONAL</span>
            </div>
        </header>
    );
};
