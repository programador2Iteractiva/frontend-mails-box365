import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StatusBarsChart = ({ sent, errors }) => {
    const data = [
        { name: 'Resultados', Enviados: sent, Errores: errors },
    ];

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Enviados" fill="#22c55e" />
                <Bar dataKey="Errores" fill="#ef4444" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default StatusBarsChart;