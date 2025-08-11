import React from 'react';
import QuillEditor from './QuillEditor'; // Importa el nuevo componente

const templates = [
    { id: 'text', name: 'Solo Texto' },
    { id: 'image', name: 'Imagen' },
    { id: 'image-url', name: 'Imagen + URL' },
    { id: 'text-image', name: 'Texto + Imagen' },
    { id: 'custom', name: 'Personalizada (Editor Avanzado)' },
];
const CampaignEditor = ({
   payload, setPayload,
    template, setTemplate,
    body, setBody,
    rawHtml, setRawHtml,
    setImageUrl,
    imageLink, setImageLink,
    onPreview,
    setLastFocusedInput
}) => {

    const handleImageFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageUrl(URL.createObjectURL(file));
        }
    };

    return (
       <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900">Redactar Email</h2>
                <button onClick={onPreview} className="bg-gray-800 text-white px-4 py-2 rounded-xl font-medium hover:bg-gray-700">
                    Vista Previa
                </button>
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-2">Plantilla</label>
                <select value={template} onChange={(e) => setTemplate(e.target.value)} className="block w-full px-5 py-3 rounded-xl border border-gray-300">
                    {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
            </div>
            
            {/* Campo de Asunto */}
            <div>
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Asunto del Correo</label>
                <input
                    type="text"
                    id="subject"
                    value={payload.subject}
                    onChange={(e) => setPayload({ ...payload, subject: e.target.value })}
                    onFocus={() => setLastFocusedInput('subject')}
                    className="block w-full px-5 py-3 rounded-xl border border-gray-300"
                    placeholder="Ej. ¡Nueva oferta para ti!"
                />
            </div>

            {/* Renderizado condicional del editor */}
            {template === 'custom' && (
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Contenido Personalizado</label>
                    <QuillEditor 
                        value={rawHtml} 
                        onChange={setRawHtml} 
                        onFocus={() => setLastFocusedInput('rawHtml')}
                    />
                </div>
            )}
            
            {template.includes('text') && (
                <div>
                    <label htmlFor="body" className="block text-gray-700 font-medium mb-2">Contenido del Email</label>
                    <textarea
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        onFocus={() => setLastFocusedInput('body')}
                        className="block w-full px-5 py-3 rounded-xl border border-gray-300"
                        rows="8"
                        placeholder="Escribe aquí... puedes usar las variables de la izquierda."
                    />
                </div>
            )}

            {template.includes('image') && (
               <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Imagen del Correo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFile}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                        />
                    </div>
                    {template === 'image-url' && (
                        <div>
                            <label htmlFor="imageLink" className="block text-gray-700 font-medium mb-2">Enlace de Destino (URL)</label>
                            <input
                                type="url"
                                id="imageLink"
                                value={imageLink}
                                onChange={(e) => setImageLink(e.target.value)}
                                className="block w-full px-5 py-3 rounded-xl border border-gray-300"
                                placeholder="https://ejemplo.com/pagina-destino"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CampaignEditor;