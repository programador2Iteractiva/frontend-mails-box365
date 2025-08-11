import React from 'react';

const configs = [
    { id: 1, name: "Novo Nordisk CLAT", campaign_id: 30, from: "novonordiskclat@send.box365.com.co", reply_to: "plpv@novonordisk.com" },
    { id: 2, name: "Otra Campaña", campaign_id: 45, from: "otra@send.box365.com.co", reply_to: "contacto@dominio.com" },
];

const templates = [
    { id: 'image-url', name: 'Imagen + URL' },
    { id: 'image', name: 'Imagen' },
    { id: 'text', name: 'Solo Texto' },
    { id: 'text-image', name: 'Texto + Imagen' },
];

const CampaignSettings = ({ payload, setPayload, imageLink, setImageLink, template, setTemplate, body, setBody }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">1. Configuración de Plantilla y Campaña</h2>
            
            <div>
                <label className="block text-gray-700 font-medium mb-2">Seleccionar Plantilla</label>
                <select
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    className="block w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-apple-yellow"
                >
                    {templates.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                </select>
            </div>

            {template.includes('text') && (
                <div>
                    <label htmlFor="body" className="block text-gray-700 font-medium mb-2">Cuerpo del Correo</label>
                    <textarea
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="block w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-apple-yellow"
                        rows="5"
                        placeholder="Escribe el contenido del correo aquí..."
                    />
                </div>
            )}

            <div>
                <label className="block text-gray-700 font-medium mb-2">Seleccionar Configuración Predefinida</label>
                 <div className="flex flex-col space-y-2">
                     {configs.map(config => (
                         <label key={config.id} className="inline-flex items-center p-4 rounded-xl border border-gray-300 cursor-pointer hover:bg-gray-50 transition duration-150">
                             <input
                                type="radio"
                                name="configuracion"
                                value={config.id}
                                className="h-5 w-5 text-apple-yellow accent-apple-yellow focus:ring-2 focus:ring-offset-2 focus:ring-apple-yellow"
                                onChange={() => setPayload({ ...payload, ...config })}
                             />
                             <span className="ml-3 text-gray-700 font-medium">{config.name}</span>
                         </label>
                     ))}
                 </div>
            </div>

            <div>
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Asunto del Correo</label>
                <input
                    type="text"
                    id="subject"
                    value={payload.subject}
                    onChange={(e) => setPayload({ ...payload, subject: e.target.value })}
                    className="block w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-apple-yellow"
                    placeholder="Ej. ¡Nueva oferta para ti!"
                />
            </div>
            
            {template === 'image-url' && (
                <div>
                    <label htmlFor="imageLink" className="block text-gray-700 font-medium mb-2">Enlace de Destino de la Imagen</label>
                    <input
                        type="url"
                        id="imageLink"
                        value={imageLink}
                        onChange={(e) => setImageLink(e.target.value)}
                        className="block w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-apple-yellow"
                        placeholder="https://ejemplo.com/pagina-destino"
                    />
                </div>
            )}
        </div>
    );
};

export default CampaignSettings;