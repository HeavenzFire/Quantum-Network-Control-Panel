
import { QuantumNode } from './types';

export const NODES_CONFIG: QuantumNode[] = [
    { 
      id: "node-alpha", 
      type: "coordinator", 
      host: "quantum-node-1.example.com", 
      port: 8888, 
      capabilities: ["qkd", "entanglement", "computation"], 
      position: { top: '20%', left: '50%' },
      status: 'idle'
    },
    { 
      id: "node-beta", 
      type: "processing", 
      host: "quantum-node-2.example.com", 
      port: 8889, 
      capabilities: ["computation", "storage"], 
      position: { top: '75%', left: '25%' },
      status: 'idle'
    },
    { 
      id: "node-gamma", 
      type: "edge", 
      host: "quantum-node-3.example.com", 
      port: 8890, 
      capabilities: ["qkd", "messaging"], 
      position: { top: '75%', left: '75%' },
      status: 'idle'
    }
];
