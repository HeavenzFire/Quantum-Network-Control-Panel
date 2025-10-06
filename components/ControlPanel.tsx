
import React, { useState } from 'react';
import { QuantumNode, QuantumJob } from '../types';
import { DashboardCard } from './DashboardCard';
import { QkdIcon, EntanglementIcon, ComputeIcon, SendIcon, LinkIcon, JobIcon } from './IconComponents';


interface ControlPanelProps {
    nodes: QuantumNode[];
    jobs: QuantumJob[];
    onSendMessage: (senderId: string, recipientId: string, message: string) => void;
    onCreateEntangledPair: (node1Id: string, node2Id: string) => void;
    onSubmitJob: (circuit: string) => void;
    isSimulating: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ nodes, jobs, onSendMessage, onCreateEntangledPair, onSubmitJob, isSimulating }) => {
    const [sender, setSender] = useState('');
    const [recipient, setRecipient] = useState('');
    const [message, setMessage] = useState('Quantum-secured test message.');

    const [entangleNode1, setEntangleNode1] = useState('');
    const [entangleNode2, setEntangleNode2] = useState('');
    
    const [circuit, setCircuit] = useState('qreg q[2];\ncreg c[2];\nh q[0];\ncx q[0],q[1];\nmeasure q -> c;');

    const handleSendMessage = () => {
        onSendMessage(sender, recipient, message);
    };
    
    const handleCreateEntangledPair = () => {
        onCreateEntangledPair(entangleNode1, entangleNode2);
    }

    const handleSubmitJob = () => {
        onSubmitJob(circuit);
    }
    
    return (
        <div className="flex flex-col gap-4">
            <DashboardCard title="Quantum Key Distribution (QKD)" icon={<QkdIcon />}>
                <div className="space-y-3">
                    <select value={sender} onChange={e => setSender(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="">Select Sender</option>
                        {nodes.map(n => <option key={n.id} value={n.id}>{n.id}</option>)}
                    </select>
                    <select value={recipient} onChange={e => setRecipient(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="">Select Recipient</option>
                        {nodes.filter(n => n.id !== sender).map(n => <option key={n.id} value={n.id}>{n.id}</option>)}
                    </select>
                    <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:ring-blue-500 focus:border-blue-500" />
                    <button onClick={handleSendMessage} disabled={isSimulating} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors">
                        <SendIcon /> Send Secure Message
                    </button>
                </div>
            </DashboardCard>

            <DashboardCard title="Entanglement-Based Communication" icon={<EntanglementIcon />}>
                <div className="space-y-3">
                    <select value={entangleNode1} onChange={e => setEntangleNode1(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="">Select Node 1</option>
                        {nodes.map(n => <option key={n.id} value={n.id}>{n.id}</option>)}
                    </select>
                    <select value={entangleNode2} onChange={e => setEntangleNode2(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="">Select Node 2</option>
                        {nodes.filter(n => n.id !== entangleNode1).map(n => <option key={n.id} value={n.id}>{n.id}</option>)}
                    </select>
                    <button onClick={handleCreateEntangledPair} disabled={isSimulating} className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors">
                        <LinkIcon /> Create Entangled Pair
                    </button>
                </div>
            </DashboardCard>
            
            <DashboardCard title="Distributed Quantum Computing" icon={<ComputeIcon />}>
                <div className="space-y-3">
                    <textarea value={circuit} onChange={e => setCircuit(e.target.value)} rows={4} placeholder="Enter QASM circuit" className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:ring-teal-500 focus:border-teal-500 text-sm font-mono whitespace-pre-wrap"></textarea>
                    <button onClick={handleSubmitJob} disabled={isSimulating} className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors">
                        <JobIcon /> Submit Job
                    </button>
                    <div className="mt-2 text-sm text-gray-400">
                        <h4 className="font-bold mb-1">Job Queue ({jobs.length})</h4>
                        {jobs.length > 0 ? (
                            <ul className="space-y-1">
                                {jobs.map(job => (
                                    <li key={job.id} className="text-xs bg-gray-800 p-1 rounded">
                                        {job.id}: {job.status} {job.assignedNode && `on ${job.assignedNode}`}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-xs italic">No active jobs.</p>
                        )}
                    </div>
                </div>
            </DashboardCard>
        </div>
    );
};
