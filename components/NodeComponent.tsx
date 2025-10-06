
import React from 'react';
import { QuantumNode } from '../types';

interface NodeComponentProps {
    node: QuantumNode;
}

const statusClasses = {
    idle: 'border-blue-500 bg-blue-500/10 text-blue-300',
    processing: 'border-yellow-400 bg-yellow-400/10 text-yellow-300 animate-pulse',
    connected: 'border-green-400 bg-green-400/10 text-green-300',
    error: 'border-red-500 bg-red-500/10 text-red-400',
};

const typeIcon = {
    coordinator: '👑',
    processing: '⚙️',
    edge: '🌐',
};

export const NodeComponent: React.FC<NodeComponentProps> = ({ node }) => {
    return (
        <div 
            className={`absolute -translate-x-1/2 -translate-y-1/2 p-3 rounded-lg border-2 shadow-lg transition-all duration-300 ${statusClasses[node.status]}`}
            style={{ top: node.position.top, left: node.position.left, minWidth: '150px' }}
        >
            <div className="flex items-center gap-3">
                <span className="text-lg">{typeIcon[node.type]}</span>
                <div>
                    <div className="font-bold">{node.id}</div>
                    <div className="text-xs opacity-70 capitalize">{node.type}</div>
                </div>
            </div>
            <div className="text-xs mt-2 opacity-80 capitalize">Status: {node.status}</div>
        </div>
    );
};
