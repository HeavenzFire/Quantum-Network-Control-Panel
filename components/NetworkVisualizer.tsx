
import React from 'react';
import { QuantumNode, NetworkConnection, EntangledPair } from '../types';
import { NodeComponent } from './NodeComponent';
import { ConnectionLine } from './ConnectionLine';

interface NetworkVisualizerProps {
    nodes: QuantumNode[];
    connections: NetworkConnection[];
    entangledPairs: EntangledPair[];
}

export const NetworkVisualizer: React.FC<NetworkVisualizerProps> = ({ nodes, connections, entangledPairs }) => {
    
    const findNodePosition = (nodeId: string) => {
        const node = nodes.find(n => n.id === nodeId);
        if (!node) return null;
        return {
            x: parseFloat(node.position.left),
            y: parseFloat(node.position.top)
        };
    };

    return (
        <div className="w-full h-full relative">
            <svg className="absolute top-0 left-0 w-full h-full" style={{ overflow: 'visible' }}>
                <defs>
                    <marker
                        id="arrow"
                        viewBox="0 0 10 10"
                        refX="5"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#4ade80" />
                    </marker>
                </defs>
                {connections.map(conn => {
                    const pos1 = findNodePosition(conn.source);
                    const pos2 = findNodePosition(conn.target);
                    if (!pos1 || !pos2) return null;
                    return <ConnectionLine key={conn.id} p1={pos1} p2={pos2} color="#38bdf8" active={conn.active} />;
                })}
                {entangledPairs.map(pair => {
                    const pos1 = findNodePosition(pair.source);
                    const pos2 = findNodePosition(pair.target);
                    if (!pos1 || !pos2) return null;
                    return <ConnectionLine key={pair.id} p1={pos1} p2={pos2} color="#a78bfa" dashed />;
                })}
            </svg>
            {nodes.map(node => (
                <NodeComponent key={node.id} node={node} />
            ))}
        </div>
    );
};
