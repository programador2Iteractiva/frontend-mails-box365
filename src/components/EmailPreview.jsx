import React from 'react';

const EmailPreview = ({ imageUrl, imageLink, emailList, payload, template, body, rawHtml }) => {

    console.log('3. EmailPreview: Recibiendo la prop rawHtml:', rawHtml);

    // 1. HTML base proporcionado por ti.
    // He reemplazado la imagen estática por un marcador de posición {{DYNAMIC_CONTENT}}.
    const baseHtmlTemplate = `
        <p style="font-family:arial; text-align:center; font-size:10px; color: #666666;">
            El siguiente es un correo generado automáticamente.
        </p>
        <table cellpadding="0" cellspacing="0" border="0" style="width: 600px; padding: 20px; margin: 0 auto; border: 1px solid #f6f6f6; border-top: 10px solid #0b1f38; background: #FFF;">
            <tbody>
                <tr>
                    <td>
                        <center>
                            <table width="560" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #f6f6f6">
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="content" style="padding: 20px">
                                                {{DYNAMIC_CONTENT}}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </center>
                    </td>
                </tr>
            </tbody>
        </table>
    `;

    // 2. Función que genera solo la parte dinámica del contenido.
    const generateDynamicContent = () => {
         if (template === 'custom') {
            return rawHtml;
        }

        const textPart = template.includes('text') ? `<div>${body.replace(/\n/g, '<br />')}</div>` : '';
        let imagePart = '';

        if (template.includes('image') && imageUrl) {
            const imgTag = `<img src="${imageUrl}" alt="image-email" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">`;
            if (template === 'image-url' && imageLink) {
                imagePart = `<div style="text-align:center;width: 100%;"><a href="${imageLink}" target="_blank">${imgTag}</a></div>`;
            } else {
                imagePart = `<div style="text-align:center;width: 100%;">${imgTag}</div>`;
            }
        }

        // Combina las partes según la plantilla
        if (template === 'text-image') {
            return `<div style="padding-bottom: 20px;">${textPart}</div>` + imagePart;
        }
        return textPart || imagePart;
    };

    // 3. Se inyecta el contenido dinámico en la plantilla base.
    const finalHtml = baseHtmlTemplate.replace('{{DYNAMIC_CONTENT}}', generateDynamicContent());

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Encabezado del correo (se mantiene igual) */}
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

            {/* Cuerpo del correo, ahora renderizando la plantilla completa */}
            <div className="p-4 bg-gray-100">
                <div dangerouslySetInnerHTML={{ __html: finalHtml }} />
            </div>
        </div>
    );
};

export default EmailPreview;