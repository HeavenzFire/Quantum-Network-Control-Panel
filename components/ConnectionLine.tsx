
import React from 'react';

interface ConnectionLineProps {
    p1: { x: number; y: number };
    p2: { x: number; y: number };
    color: string;
    active?: boolean;
    dashed?: boolean;
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({ p1, p2, color, active, dashed }) => {
    return (
        <g>
            <line
                x1={`${p1.x}%`} y1={`${p1.y}%`}
                x2={`${p2.x}%`} y2={`${p2.y}%`}
                stroke={color}
                strokeWidth="2"
                strokeDasharray={dashed ? "5 5" : "none"}
                className="transition-all duration-300"
            />
            {active && (
                <circle r="6" fill={color} className="animate-pulse">
                    <animateMotion
                        dur="2s"
                        repeatCount="indefinite"
                        path={`M${p1.x*window.innerWidth/100},${p1.y*window.innerHeight/100*0.5} L${p2.x*window.innerWidth/100},${p2.y*window.innerHeight/100*0.5}`} 
                    />
                </circle>
            )}
        </g>
    );
};
