import React from 'react';

const EmailPreview = ({ imageUrl, imageLink, emailList, payload }) => {
    // Si no hay imagen, no hay previsualización.
    if (!imageUrl) {
        return (
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">Previsualización</h2>
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-gray-100 rounded-xl border border-gray-200">
                        <div className="text-3xl font-bold text-gray-800">{emailList.length}</div>
                        <div className="text-gray-500 text-sm">Correos Cargados</div>
                    </div>
                    <div className="p-4 bg-gray-100 rounded-xl border border-gray-200">
                        <div className="text-3xl font-bold text-gray-800">0</div>
                        <div className="text-gray-500 text-sm">Imagen Cargada</div>
                    </div>
                </div>
                <div className="p-6 text-center text-gray-500 bg-gray-100 rounded-xl border border-gray-200">
                    Carga una imagen y configura el correo para ver la previsualización.
                </div>
            </div>
        );
    }
    
    // Si hay imagen, se muestra la previsualización completa.
    const emailBodyHtml = `<div style="text-align:center;width: 100%;"><a href="${imageLink}" target="_blank" style="text-align:center"><img src="${imageUrl}" alt="image-email" style="max-width: 100%; height: auto;"></a></div>`;

    return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Previsualización</h2>

            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-gray-100 rounded-xl border border-gray-200">
                    <div className="text-3xl font-bold text-gray-800">{emailList.length}</div>
                    <div className="text-gray-500 text-sm">Correos Cargados</div>
                </div>
                <div className="p-4 bg-gray-100 rounded-xl border border-gray-200">
                    <div className="text-3xl font-bold text-gray-800">1</div>
                    <div className="text-gray-500 text-sm">Imagen Cargada</div>
                </div>
            </div>

            <div className="p-4 bg-gray-100 rounded-xl border border-gray-200">
                <h3 className="text-sm font-semibold mb-2 text-gray-600">Simulación de Correo:</h3>
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    {/* Encabezado del correo simulado */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center space-x-2 text-sm text-gray-700">
                            <span className="font-bold">Asunto:</span>
                            <span>{payload.subject}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                            <span className="font-bold">De:</span>
                            <span>{payload.from}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                            <span className="font-bold">Para:</span>
                            <span>{emailList[0] || 'destinatario@ejemplo.com'}</span>
                        </div>
                    </div>

                    {/* Cuerpo del correo */}
                    <div className="p-4">
                         <div dangerouslySetInnerHTML={{ __html: emailBodyHtml }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailPreview;