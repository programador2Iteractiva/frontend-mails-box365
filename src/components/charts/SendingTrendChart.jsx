import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Datos de ejemplo en caso de que la campaña no los provea
const generateDummyData = () => [
    { time: "09:00", correos: 30 },
    { time: "09:05", correos: 85 },
    { time: "09:10", correos: 150 },
    { time: "09:15", correos: 110 },
    { time: "09:20", correos: 60 },
];

const SendingTrendChart = ({ campaign }) => {
    // El gráfico ahora consume directamente `campaign.sendingTrend`
    const data = useMemo(() => {
        const trendData = campaign?.sendingTrend;

        // Si hay datos de tendencia y no están vacíos, los usamos
        if (trendData && trendData.length > 0) {
            // Renombramos 'count' a 'correos' para que coincida con el dataKey del gráfico
            return trendData.map(d => ({ time: d.time, correos: d.count }));
        }
        
        // Si no, usamos los datos de ejemplo
        return generateDummyData();
    }, [campaign]);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="correos"
                    name="Correos Enviados"
                    stroke="#8884d8"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default SendingTrendChart;