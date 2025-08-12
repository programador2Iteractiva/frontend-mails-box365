import React from 'react';
// Importamos FaPlay y FaPaperPlane para el nuevo botón
import { FaTrash, FaEdit, FaPlay, FaPaperPlane } from 'react-icons/fa';

const CampaignList = ({ campaigns, onDeleteCampaign, onEditCampaign, onSendCampaign }) => {
    return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
            <div className="overflow-x-auto rounded-xl">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaña</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Creación</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contactos</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {campaigns.length > 0 ? (
                            campaigns.map((campaign) => (
                                <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{campaign.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(campaign.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.contactCount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-4">
                                        <button onClick={() => onEditCampaign(campaign)} className="text-gray-400 hover:text-indigo-600 transition" title="Editar Campaña">
                                            <FaEdit size="1.1em" />
                                        </button>
                                        <button onClick={() => onDeleteCampaign(campaign.id)} className="text-gray-400 hover:text-red-600 transition" title="Eliminar Campaña">
                                            <FaTrash size="1.1em" />
                                        </button>
                                        {/* --- NUEVO BOTÓN DE ENVÍO --- */}
                                        <button onClick={() => onSendCampaign(campaign.id)} className="text-gray-400 hover:text-green-500 transition" title="Enviar Campaña Ahora">
                                            <FaPaperPlane size="1.1em" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">No hay campañas creadas.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CampaignList;