import React from 'react';

const EmailPreview = ({ imageUrl, imageLink, emailList }) => {
    return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Previsualización</h2>
            
            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-gray-100 rounded-xl border border-gray-200">
                    <div className="text-3xl font-bold text-gray-800">{emailList.length}</div>
                    <div className="text-gray-500 text-sm">Correos Cargados</div>
                </div>
                <div className="p-4 bg-gray-100 rounded-xl border border-gray-200">
                    <div className="text-3xl font-bold text-gray-800">
                        {imageUrl ? '1' : '0'}
                    </div>
                    <div className="text-gray-500 text-sm">Imagen Cargada</div>
                </div>
            </div>

            {imageUrl && (
                <div className="p-4 bg-gray-100 rounded-xl border border-gray-200">
                    <h3 className="text-sm font-semibold mb-2 text-gray-600">Vista Previa del Correo:</h3>
                    <div className="rounded-xl overflow-hidden shadow-md">
                        <div dangerouslySetInnerHTML={{ __html: `<div style="text-align:center;width: 100%;"><a href="${imageLink}" target="_blank" style="text-align:center"><img src="${imageUrl}" alt="image-email" style="max-width: 100%; height: auto;"></a></div>` }} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmailPreview;