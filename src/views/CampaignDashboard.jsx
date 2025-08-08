import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos el hook
import CampaignList from '../components/CampaignList';
import { FaPlus } from 'react-icons/fa';

const CampaignDashboard = ({ campaigns, onDeleteCampaign, onEditCampaign }) => {
    const navigate = useNavigate(); // Inicializamos el hook

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900">
                    Campañas de Correo
                </h1>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-500 font-medium text-lg">
                        Total de campañas: <span className="font-bold text-gray-900">{campaigns.length}</span>
                    </span>
                    {/* El botón ahora usa navigate para redirigir a la ruta /create */}
                    <button
                        onClick={() => navigate('/create')}
                        className="bg-apple-yellow text-gray-900 font-bold px-6 py-3 rounded-full flex items-center shadow-lg hover:bg-yellow-400 transition"
                    >
                        <FaPlus className="mr-2" /> Crear Campaña
                    </button>
                </div>
            </div>
            <CampaignList 
                campaigns={campaigns} 
                onDeleteCampaign={onDeleteCampaign} 
                onEditCampaign={onEditCampaign}
            />
        </div>
    );
};

export default CampaignDashboard;