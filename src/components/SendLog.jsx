import React, { useState, useMemo } from 'react';

const ITEMS_PER_PAGE = 10; // Define cuántos logs mostrar por página

const SendLog = ({ logEnvios }) => {
    // --- ESTADOS PARA FILTROS Y PAGINACIÓN ---
    const [emailFilter, setEmailFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [messageFilter, setMessageFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // Página actual

    const dummyLogEnvios = Array.from({ length: 50 }, (_, i) => ({
        email: `contacto${i + 1}@ejemplo.com`,
        status: i % 4 === 0 ? 'Error' : 'Enviado',
        message: i % 4 === 0 ? (i % 8 === 0 ? 'Buzón lleno' : 'Dirección inválida') : 'OK',
    }));

    const currentLogEnvios = logEnvios && logEnvios.length > 0 ? logEnvios : dummyLogEnvios;

    // --- LÓGICA DE FILTRADO ---
    const filteredLogs = useMemo(() => {
        return currentLogEnvios.filter(log => {
            const emailMatch = emailFilter ? log.email.toLowerCase().includes(emailFilter.toLowerCase()) : true;
            const statusMatch = statusFilter ? log.status === statusFilter : true;
            const messageMatch = messageFilter ? log.message.toLowerCase().includes(messageFilter.toLowerCase()) : true;
            return emailMatch && statusMatch && messageMatch;
        });
    }, [currentLogEnvios, emailFilter, statusFilter, messageFilter]);

    // --- LÓGICA DE PAGINACIÓN ---
    const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);
    const paginatedLogs = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredLogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [currentPage, filteredLogs]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Log de Envío</h2>

            {/* --- CONTROLES DE FILTRADO --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl border">
                {/* Filtro por Correo */}
                <div>
                    <label htmlFor="email-filter" className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Correo</label>
                    <input
                        type="text"
                        id="email-filter"
                        placeholder="Buscar por email..."
                        value={emailFilter}
                        onChange={(e) => setEmailFilter(e.target.value)}
                        className="block w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-apple-yellow"
                    />
                </div>
                {/* Filtro por Estado */}
                <div>
                    <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Estado</label>
                    <select
                        id="status-filter"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="block w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-apple-yellow"
                    >
                        <option value="">Todos</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Error">Error</option>
                    </select>
                </div>
                {/* Filtro por Mensaje */}
                <div>
                    <label htmlFor="message-filter" className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Mensaje</label>
                    <input
                        type="text"
                        id="message-filter"
                        placeholder="Buscar en mensajes..."
                        value={messageFilter}
                        onChange={(e) => setMessageFilter(e.target.value)}
                        className="block w-full px-4 py-2 rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-apple-yellow"
                    />
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100 sticky top-0">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Correo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mensaje</th>
                        </tr>
                    </thead>                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedLogs.length > 0 ? (
                            paginatedLogs.map((log, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700">{log.email}</td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${log.status === 'Enviado' ? 'text-green-600' : 'text-red-600'}`}>
                                        {log.status}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.message}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                                    No hay resultados para los filtros aplicados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* --- CONTROLES DE PAGINACIÓN --- */}
            {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-700">
                        Página {currentPage} de {totalPages}
                    </span>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Anterior
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SendLog;