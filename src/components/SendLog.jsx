import React from 'react';

const SendLog = ({ logEnvios }) => {
    // Datos de prueba para demostrar el layout cuando no hay un log real
    const dummyLogEnvios = [
        { email: 'contacto1@ejemplo.com', status: 'Enviado', message: 'OK' },
        { email: 'contacto2@ejemplo.com', status: 'Error', message: 'Fallo de conexión al servidor de correo' },
        { email: 'contacto3@ejemplo.com', status: 'Enviado', message: 'OK' },
        { email: 'contacto4@ejemplo.com', status: 'Error', message: 'Dirección de correo inválida' },
        { email: 'contacto5@ejemplo.com', status: 'Enviado', message: 'OK' },
    ];

    // Utiliza los datos reales si existen y tienen contenido; de lo contrario, usa los de prueba
    const currentLogEnvios = logEnvios && logEnvios.length > 0 ? logEnvios : dummyLogEnvios;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Log de Envío</h2>
            
            <div className="overflow-x-auto rounded-lg border border-gray-200 max-h-96">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100 sticky top-0">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Correo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mensaje</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentLogEnvios.map((log, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700">{log.email}</td>
                                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${log.status === 'Enviado' ? 'text-green-600' : 'text-red-600'}`}>
                                    {log.status}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SendLog;