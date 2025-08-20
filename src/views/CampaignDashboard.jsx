import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignList from '../components/dash/CampaignList';
import CampaignHistory from '../components/history/CampaignHistory';
import { FaPlus } from 'react-icons/fa';
import ClientList from '../components/clients/ClientList';
import { CLIENTS_DATA } from '../data/clients'; 

const CampaignDashboard = ({ campaigns, campaignHistory, onDeleteCampaign, onEditCampaign, onSendCampaign }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('campaigns');

    const handleEditAndNavigate = (campaign) => {
        onEditCampaign(campaign);
        navigate('/create');
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900">
                    Campañas de Correo
                </h1>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => {
                            onEditCampaign(null);
                            navigate('/create');
                        }}
                        className="bg-apple-yellow text-gray-900 font-bold px-6 py-3 rounded-full flex items-center shadow-lg hover:bg-yellow-400 transition"
                    >
                        <FaPlus className="mr-2" /> Crear Campaña
                    </button>
                </div>
            </div>

            {/* Pestañas */}
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    onClick={() => setActiveTab('campaigns')}
                    className={`py-2 px-4 font-semibold ${activeTab === 'campaigns' ? 'text-apple-yellow border-b-2 border-apple-yellow' : 'text-gray-500'}`}
                >
                    Campañas ({campaigns.length})
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`py-2 px-4 font-semibold ${activeTab === 'history' ? 'text-apple-yellow border-b-2 border-apple-yellow' : 'text-gray-500'}`}
                >
                    Historial de envíos ({campaignHistory.length})
                </button>
                <button
                    onClick={() => setActiveTab('clients')}
                    className={`py-2 px-4 font-semibold ${activeTab === 'clients' ? 'text-apple-yellow border-b-2 border-apple-yellow' : 'text-gray-500'}`}
                >
                    Clientes ({CLIENTS_DATA.length})
                </button>
            </div>

            {activeTab === 'campaigns' && (
                <CampaignList 
                    campaigns={campaigns} 
                    onDeleteCampaign={onDeleteCampaign} 
                    onEditCampaign={handleEditAndNavigate}
                    onSendCampaign={onSendCampaign}
                />
            )}
            {activeTab === 'history' && (
                <CampaignHistory 
                    campaigns={campaignHistory} 
                />
            )}

            {activeTab === 'clients' && (
                <ClientList 
                    clients={CLIENTS_DATA}
                />
            )}
        </div>
    );
};

export default CampaignDashboard;