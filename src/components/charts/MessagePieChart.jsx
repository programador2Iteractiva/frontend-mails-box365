import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943'];

const MessagePieChart = ({ log }) => {
    const data = useMemo(() => {
        const messageCounts = log.reduce((acc, current) => {
            const message = current.message || 'Sin mensaje';
            acc[message] = (acc[message] || 0) + 1;
            return acc;
        }, {});

        return Object.entries(messageCounts).map(([name, value]) => ({ name, value }));
    }, [log]);

    if (!data.length) return <div className="text-center text-gray-500">No hay datos para mostrar.</div>;

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default MessagePieChart;