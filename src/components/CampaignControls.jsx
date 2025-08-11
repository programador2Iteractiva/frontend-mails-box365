import React from 'react';

const CampaignControls = ({ onFileUpload, emailListCount, onShowEmails, availableVars, onInsertVariable }) => {
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onFileUpload(file);
        }
        e.target.value = null; // Permite volver a cargar el mismo archivo
    };

    const handleDownloadTemplate = () => {
        // Lógica para descargar plantilla (la dejé como estaba)
    };

    return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Cargar Lista de Contactos</h2>
            
            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-gray-700 font-medium">Base de Datos (XLSX)</label>
                    <button onClick={handleDownloadTemplate} className="text-sm text-blue-600 hover:underline">
                        Descargar plantilla
                    </button>
                </div>
                <input
                    type="file"
                    accept=".xlsx"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                />
                {emailListCount > 0 && (
                    <div className="mt-2 flex justify-between items-center text-sm text-gray-600">
                        <span>{emailListCount} correos cargados</span>
                        <button onClick={onShowEmails} className="text-blue-600 hover:underline">
                            Ver/Editar lista
                        </button>
                    </div>
                )}
            </div>

            {availableVars.length > 0 && (
                <div>
                    <h3 className="text-lg font-medium text-gray-700">Variables Disponibles</h3>
                    <p className="text-sm text-gray-500 mb-2">Haz clic para insertar una variable en el cuerpo del email.</p>
                    <div className="flex flex-wrap gap-2">
                        {availableVars.map(variable => (
                            <button
                                key={variable}
                                onClick={() => onInsertVariable(variable)}
                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200"
                            >
                                + &#123;{variable}&#125;
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CampaignControls;