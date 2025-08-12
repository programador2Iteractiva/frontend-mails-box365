import React from 'react';
import { FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CampaignHistory = ({ campaigns }) => {
    // Lógica para descargar el log (simulada)
    const handleDownloadLog = (campaignId) => {
        alert(`Descargando log para la campaña ${campaignId}`);
    };

    return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
            <div className="overflow-x-auto rounded-xl">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaña</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Envío</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total de Contactos</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enviados</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Errores</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {campaigns.length > 0 ? (
                            campaigns.map((campaign) => (
                                <tr key={campaign.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <Link to={`/history/${campaign.id}`} className="text-blue-600 hover:underline">
                                            {campaign.name}
                                        </Link>
                                    </td>
                                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{campaign.name}</td> */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(campaign.sentDate).toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.contactCount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{campaign.sentCount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{campaign.errorCount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button onClick={() => handleDownloadLog(campaign.id)} className="text-blue-600 hover:text-blue-900">
                                            <FaDownload />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">No hay campañas en el historial.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CampaignHistory;