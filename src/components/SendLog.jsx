import React from 'react';

const SendLog = ({ logEnvios, scheduledJobs, onDownloadLog }) => {
    // Datos de prueba para demostrar el layout
    const dummyLogEnvios = [
        { email: 'contacto1@dominio.com', status: '✅ Enviado' },
        { email: 'contacto2@dominio.com', status: '❌ Error', message: 'Fallo de conexión al servidor de correo' },
        { email: 'contacto3@dominio.com', status: '✅ Enviado' },
        { email: 'contacto4@dominio.com', status: '❌ Error', message: 'Dirección de correo inválida' },
        { email: 'contacto3@dominio.com', status: '✅ Enviado' },
        { email: 'contacto3@dominio.com', status: '✅ Enviado' },
        { email: 'contacto3@dominio.com', status: '✅ Enviado' },
        { email: 'contacto3@dominio.com', status: '✅ Enviado' },
        { email: 'contacto3@dominio.com', status: '✅ Enviado' },
        { email: 'contacto3@dominio.com', status: '✅ Enviado' },
        { email: 'contacto3@dominio.com', status: '✅ Enviado' },

    ];

    // Utiliza los datos reales si existen, de lo contrario, usa los de prueba
    const currentLogEnvios = logEnvios.length > 0 ? logEnvios : dummyLogEnvios;

    return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">Log de Envío</h2>
                <button 
                    onClick={onDownloadLog}
                    className={`text-sm text-blue-600 hover:underline ${logEnvios.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={logEnvios.length === 0}
                >
                    Descargar Log
                </button>
            </div>

            {/* Sección de Envío Directo */}
            {currentLogEnvios.length > 0 && (
                <div className="space-y-2">
                    <h3 className="text-lg font-medium text-gray-700">Envío Directo</h3>
                    <div className="overflow-x-auto rounded-lg border border-gray-200 max-h-64">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100 sticky top-0">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentLogEnvios.map((log, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700">{log.email}</td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${log.status.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                                            {log.status.includes('✅') ? 'Enviado' : 'Error'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Mensaje de estado vacío */}
            {currentLogEnvios.length === 0 && currentScheduledJobs.length === 0 && (
                <div className="p-6 text-center text-gray-500 bg-gray-100 rounded-xl border border-gray-200">
                    No hay logs de envío para mostrar.
                </div>
            )}
        </div>
    );
};

export default SendLog;