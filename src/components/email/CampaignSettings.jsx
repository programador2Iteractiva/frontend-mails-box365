import React from 'react';

const configs = [
    { id: 1, name: "Novo Nordisk CLAT", campaign_id: 30, from: "novonordiskclat@send.box365.com.co", reply_to: "plpv@novonordisk.com" },
    { id: 2, name: "Otra Campaña", campaign_id: 45, from: "otra@send.box365.com.co", reply_to: "contacto@dominio.com" },
];

const CampaignSettings = ({ payload, setPayload }) => {

    const handleConfigChange = (config) => {
        setPayload(prev => ({
            ...prev,
            from: config.from,
            reply_to: config.reply_to,
            // Opcional: también puedes actualizar el nombre de la campaña si lo deseas
            // name: config.name,
        }));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">1. Configuración de Envío</h2>
            <div>
                <label className="block text-gray-700 font-medium mb-2">Configuración Predefinida</label>
                 <div className="flex flex-col space-y-2">
                     {configs.map(config => (
                         <label key={config.id} className="inline-flex items-center p-4 rounded-xl border border-gray-300 cursor-pointer hover:bg-gray-50 transition duration-150">
                             <input
                                type="radio"
                                name="configuracion"
                                value={config.id}
                                className="h-5 w-5 text-apple-yellow accent-apple-yellow focus:ring-2 focus:ring-offset-2 focus:ring-apple-yellow"
                                onChange={() => handleConfigChange(config)}
                             />
                             <span className="ml-3 text-gray-700 font-medium">{config.name}</span>
                         </label>
                     ))}
                 </div>
            </div>
            {/* Los campos de 'from' y 'reply_to' ahora son manejados por la selección de arriba */}
        </div>
    );
};

export default CampaignSettings;