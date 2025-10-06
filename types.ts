
export interface QuantumNode {
    id: string;
    type: 'coordinator' | 'processing' | 'edge';
    host: string;
    port: number;
    capabilities: string[];
    position: {
        top: string;
        left: string;
    };
    status: 'idle' | 'processing' | 'connected' | 'error';
}

export enum LogType {
    INFO = 'INFO',
    SUCCESS = 'SUCCESS',
    WARN = 'WARN',
    ERROR = 'ERROR',
    SYSTEM = 'SYSTEM',
}

export interface LogEntry {
    id: number;
    timestamp: Date;
    message: string;
    type: LogType;
}

export interface NetworkConnection {
    id: string;
    source: string;
    target: string;
    type: 'qkd';
    active?: boolean;
}

export interface EntangledPair {
    id: string;
    source: string;
    target: string;
}

export interface QuantumJob {
    id: string;
    circuit: string;
    status: 'queued' | 'running' | 'completed' | 'failed';
    assignedNode?: string;
}
