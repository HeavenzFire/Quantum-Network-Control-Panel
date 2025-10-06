
import React from 'react';

interface DashboardCardProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, icon, children }) => {
    return (
        <div className="rounded-lg bg-black/30 backdrop-blur-sm border border-gray-700 shadow-lg">
            <h3 className="flex items-center gap-2 text-md font-bold p-3 border-b border-gray-700 bg-gray-900/50 rounded-t-lg text-blue-300">
                {icon}
                {title}
            </h3>
            <div className="p-4">
                {children}
            </div>
        </div>
    );
};
