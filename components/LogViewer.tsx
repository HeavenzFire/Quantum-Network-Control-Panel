
import React, { useRef, useEffect } from 'react';
import { LogEntry, LogType } from '../types';

interface LogViewerProps {
    logs: LogEntry[];
}

const logTypeClasses = {
    [LogType.INFO]: 'text-gray-300',
    [LogType.SUCCESS]: 'text-green-400',
    [LogType.WARN]: 'text-yellow-400',
    [LogType.ERROR]: 'text-red-400',
    [LogType.SYSTEM]: 'text-blue-400',
};

const logTypeIcons = {
    [LogType.INFO]: 'ℹ️',
    [LogType.SUCCESS]: '✅',
    [LogType.WARN]: '⚠️',
    [LogType.ERROR]: '❌',
    [LogType.SYSTEM]: '⚙️',
};

export const LogViewer: React.FC<LogViewerProps> = ({ logs }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="flex-grow flex flex-col rounded-lg bg-black/30 backdrop-blur-sm border border-gray-700 shadow-lg min-h-[200px] lg:min-h-0">
            <h2 className="text-lg font-bold p-3 border-b border-gray-700 bg-gray-900/50 rounded-t-lg text-blue-300">Simulation Log</h2>
            <div ref={scrollRef} className="flex-grow p-3 overflow-y-auto text-xs space-y-2">
                {logs.map(log => (
                    <div key={log.id} className={`flex items-start gap-2 ${logTypeClasses[log.type]}`}>
                        <span>{logTypeIcons[log.type]}</span>
                        <span className="opacity-60">[{log.timestamp.toLocaleTimeString()}]</span>
                        <span className="flex-1">{log.message}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
