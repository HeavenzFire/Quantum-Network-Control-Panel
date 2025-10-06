
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { NetworkVisualizer } from './components/NetworkVisualizer';
import { ControlPanel } from './components/ControlPanel';
import { LogViewer } from './components/LogViewer';
import { QuantumNode, LogEntry, NetworkConnection, EntangledPair, QuantumJob, LogType } from './types';
import { NODES_CONFIG } from './constants';

const App: React.FC = () => {
    const [nodes, setNodes] = useState<QuantumNode[]>(NODES_CONFIG);
    const [connections, setConnections] = useState<NetworkConnection[]>([]);
    const [entangledPairs, setEntangledPairs] = useState<EntangledPair[]>([]);
    const [jobs, setJobs] = useState<QuantumJob[]>([]);
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [isSimulating, setIsSimulating] = useState(false);
    const [nextNodeIndex, setNextNodeIndex] = useState(0);

    const addLog = useCallback((message: string, type: LogType = LogType.INFO) => {
        const newLog: LogEntry = {
            id: Date.now() + Math.random(),
            timestamp: new Date(),
            message,
            type
        };
        setLogs(prevLogs => [...prevLogs, newLog].slice(-100)); // Keep last 100 logs
    }, []);

    useEffect(() => {
        addLog("Quantum Network Control Panel Initialized.", LogType.SYSTEM);
        addLog("Network Status: OPERATIONAL. Ready for simulation.", LogType.SUCCESS);
    }, [addLog]);

    const findNodeById = (id: string) => nodes.find(n => n.id === id);

    const updateNodeStatus = (nodeId: string, status: 'idle' | 'processing' | 'connected', duration: number = 2000) => {
        setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, status } : n));
        setTimeout(() => {
            setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, status: 'idle' } : n));
        }, duration);
    };

    const handleSendMessage = useCallback(async (senderId: string, recipientId: string, message: string) => {
        if (isSimulating) {
            addLog("Another simulation is already in progress.", LogType.WARN);
            return;
        }
        if (!senderId || !recipientId || !message) {
            addLog("Sender, recipient, and message must be specified.", LogType.ERROR);
            return;
        }
        if (senderId === recipientId) {
             addLog("Sender and recipient cannot be the same node.", LogType.ERROR);
            return;
        }

        setIsSimulating(true);
        addLog(`Initiating QKD between ${senderId} and ${recipientId}...`);

        await new Promise(res => setTimeout(res, 1500));

        const connectionId = [senderId, recipientId].sort().join('-');
        if (!connections.some(c => c.id === connectionId)) {
            setConnections(prev => [...prev, { id: connectionId, source: senderId, target: recipientId, type: 'qkd' }]);
            addLog(`🔐 Quantum secure channel established with ${recipientId}`, LogType.SUCCESS);
        } else {
             addLog(`Using existing secure channel with ${recipientId}`, LogType.INFO);
        }

        updateNodeStatus(senderId, 'processing');
        updateNodeStatus(recipientId, 'processing');

        await new Promise(res => setTimeout(res, 1000));
        const encryptedMessage = "0a1b2c3d4e5f" + Math.random().toString(16).substring(2, 15);
        addLog(`📡 ${senderId} → ${recipientId}: ${encryptedMessage.substring(0, 30)}...`);

        setConnections(prev => prev.map(c => c.id === connectionId ? {...c, active: true} : c));
        
        await new Promise(res => setTimeout(res, 2000));

        setConnections(prev => prev.map(c => c.id === connectionId ? {...c, active: false} : c));
        addLog(`📥 ${recipientId} ← ${senderId}: ${message}`, LogType.INFO);
        
        setIsSimulating(false);

    }, [isSimulating, addLog, connections]);

    const handleCreateEntangledPair = useCallback(async (node1Id: string, node2Id: string) => {
        if (isSimulating) {
            addLog("Another simulation is already in progress.", LogType.WARN);
            return;
        }
        if (!node1Id || !node2Id) {
            addLog("Both nodes for entanglement must be selected.", LogType.ERROR);
            return;
        }
        if (node1Id === node2Id) {
             addLog("Cannot entangle a node with itself.", LogType.ERROR);
            return;
        }

        setIsSimulating(true);
        const pairId = `EP-${Date.now().toString().slice(-4)}`;
        addLog(`🌀 Creating entangled pair ${pairId} between ${node1Id} and ${node2Id}...`);
        
        updateNodeStatus(node1Id, 'processing', 2500);
        updateNodeStatus(node2Id, 'processing', 2500);

        await new Promise(res => setTimeout(res, 2500));

        const newPair: EntangledPair = {
            id: pairId,
            source: node1Id,
            target: node2Id,
        };
        setEntangledPairs(prev => [...prev, newPair]);
        addLog(`🌀 Entangled pair ${pairId} created successfully.`, LogType.SUCCESS);
        setIsSimulating(false);
    }, [isSimulating, addLog]);

    const handleSubmitJob = useCallback(async (circuit: string) => {
        if (isSimulating) {
            addLog("Another simulation is already in progress.", LogType.WARN);
            return;
        }
        if (!circuit) {
            addLog("Quantum circuit cannot be empty.", LogType.ERROR);
            return;
        }
        setIsSimulating(true);

        const newJob: QuantumJob = {
            id: `JOB-${Date.now().toString().slice(-5)}`,
            circuit: circuit,
            status: 'queued'
        };
        addLog(`📨 Submitted job ${newJob.id} to distributed network.`);
        setJobs(prev => [...prev, newJob]);

        // Simulate processing
        setTimeout(() => {
            const processingNodes = nodes.filter(n => n.capabilities.includes('computation'));
            if (processingNodes.length === 0) {
                addLog(`❌ No nodes with 'computation' capability found. Job ${newJob.id} failed.`, LogType.ERROR);
                setJobs(prev => prev.filter(j => j.id !== newJob.id));
                setIsSimulating(false);
                return;
            }

            const targetNode = processingNodes[nextNodeIndex % processingNodes.length];
            setNextNodeIndex(prev => prev + 1);

            setJobs(prev => prev.map(j => j.id === newJob.id ? { ...j, status: 'running', assignedNode: targetNode.id } : j));
            addLog(`⚙️ Job ${newJob.id} assigned to ${targetNode.id}.`);
            updateNodeStatus(targetNode.id, 'processing', 3000);

            setTimeout(() => {
                setJobs(prev => prev.filter(j => j.id !== newJob.id));
                addLog(`✅ Job ${newJob.id} completed on ${targetNode.id}.`, LogType.SUCCESS);
                setIsSimulating(false);
            }, 3000);

        }, 1000);

    }, [isSimulating, addLog, nodes, nextNodeIndex]);


    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-mono flex flex-col bg-grid-gray-700/[0.2]">
            <Header />
            <main className="flex-grow flex flex-col lg:flex-row p-4 gap-4">
                <div className="lg:w-3/5 xl:w-2/3 h-[50vh] lg:h-auto flex flex-col rounded-lg bg-black/30 backdrop-blur-sm border border-gray-700 shadow-2xl shadow-blue-500/10">
                    <h2 className="text-lg font-bold p-3 border-b border-gray-700 bg-gray-900/50 rounded-t-lg text-blue-300">Network Topology</h2>
                    <div className="flex-grow relative p-4">
                        <NetworkVisualizer nodes={nodes} connections={connections} entangledPairs={entangledPairs} />
                    </div>
                </div>
                <div className="lg:w-2/5 xl:w-1/3 flex flex-col gap-4">
                    <ControlPanel 
                        nodes={nodes}
                        jobs={jobs}
                        onSendMessage={handleSendMessage}
                        onCreateEntangledPair={handleCreateEntangledPair}
                        onSubmitJob={handleSubmitJob}
                        isSimulating={isSimulating}
                    />
                    <LogViewer logs={logs} />
                </div>
            </main>
        </div>
    );
};

export default App;
