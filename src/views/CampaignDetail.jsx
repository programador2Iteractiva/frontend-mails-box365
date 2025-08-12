import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import SendLog from '../components/SendLog';

import MessagePieChart from '../components/charts/MessagePieChart';
import StatusBarsChart from '../components/charts/StatusBarsChart';
import SendingTrendChart from '../components/charts/SendingTrendChart';

const CampaignDetail = ({ campaignHistory }) => {
    const { id } = useParams();
    const campaign = campaignHistory.find(c => c.id.toString() === id);
    const [activeTab, setActiveTab] = useState('summary');

    if (!campaign) {
        return (
            <div className="text-center">
                <h1 className="text-2xl">Campaña no encontrada</h1>
                <Link to="/" className="text-blue-600">Volver al Dashboard</Link>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <Link to="/" className="text-gray-500 flex items-center hover:text-gray-700 transition">
                    <FaArrowLeft className="mr-2" /> Volver
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">{campaign.name}</h1>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
                <div className="flex border-b border-gray-200 mb-6">
                    <button onClick={() => setActiveTab('summary')} className={`py-2 px-4 font-semibold ${activeTab === 'summary' ? 'text-apple-yellow border-b-2 border-apple-yellow' : 'text-gray-500'}`}>
                        Resumen
                    </button>
                    {/* Nueva pestaña para los gráficos */}
                    <button onClick={() => setActiveTab('analytics')} className={`py-2 px-4 font-semibold ${activeTab === 'analytics' ? 'text-apple-yellow border-b-2 border-apple-yellow' : 'text-gray-500'}`}>
                        Estadísticas
                    </button>
                    <button onClick={() => setActiveTab('log')} className={`py-2 px-4 font-semibold ${activeTab === 'log' ? 'text-apple-yellow border-b-2 border-apple-yellow' : 'text-gray-500'}`}>
                        Log de Envío
                    </button>
                </div>

                {activeTab === 'summary' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-gray-100 rounded-xl">
                            <div className="text-3xl font-bold">{campaign.contactCount}</div>
                            <div className="text-gray-500">Contactos</div>
                        </div>
                        <div className="p-4 bg-green-100 text-green-800 rounded-xl">
                            <div className="text-3xl font-bold">{campaign.sentCount}</div>
                            <div className="font-semibold">Enviados</div>
                        </div>
                        <div className="p-4 bg-red-100 text-red-800 rounded-xl">
                            <div className="text-3xl font-bold">{campaign.errorCount}</div>
                            <div className="font-semibold">Errores</div>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-xl">
                            <div className="text-lg font-bold">{new Date(campaign.sentDate).toLocaleString()}</div>
                            <div className="text-gray-500">Fecha de Inicio Envío</div>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-xl">
                            <div className="text-lg font-bold">{new Date(campaign.sentDateFinish).toLocaleString()}</div>
                            <div className="text-gray-500">Fecha de Fin Envío</div>
                        </div>
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="lg:col-span-2">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Tendencia de Envío (Correos cada 5 min)</h3>
                            <SendingTrendChart campaign={campaign} />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Resultados por Mensaje</h3>
                            <MessagePieChart log={campaign.log || []} />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Enviados vs. Errores</h3>
                            <StatusBarsChart sent={campaign.sentCount} errors={campaign.errorCount} />
                        </div>
                    </div>
                )}

                {activeTab === 'log' && (
                    <SendLog logEnvios={campaign.log || []} />
                )}
            </div>
        </div>
    );
};

export default CampaignDetail;