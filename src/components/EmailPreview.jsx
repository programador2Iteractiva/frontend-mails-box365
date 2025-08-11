import React from 'react';

const EmailPreview = ({ imageUrl, imageLink, emailList, payload, template, body }) => {
    // Función para construir el cuerpo del email basado en la plantilla
    const renderBody = () => {
        const textPart = template.includes('text') ? `<div>${body.replace(/\n/g, '<br />')}</div>` : '';
        let imagePart = '';

        if (template.includes('image') && imageUrl) {
            const imgTag = `<img src="${imageUrl}" alt="image-email" style="max-width: 100%; height: auto; display: block;">`;
            if (template === 'image-url' && imageLink) {
                imagePart = `<div style="text-align:center;width: 100%;"><a href="${imageLink}" target="_blank">${imgTag}</a></div>`;
            } else {
                imagePart = `<div style="text-align:center;width: 100%;">${imgTag}</div>`;
            }
        }
        
        return template === 'text-image' ? textPart + imagePart : textPart + imagePart;
    };

    return (
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
                 <div dangerouslySetInnerHTML={{ __html: renderBody() }} />
            </div>
        </div>
    );
};

export default EmailPreview;