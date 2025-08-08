import React from 'react';

const SendLog = ({ logEnvios, scheduledJobs, onDownloadLog }) => {
    return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 space-y-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">Log de Envío</h2>
                <button onClick={onDownloadLog} className="text-sm text-blue-600 hover:underline">
                    Descargar Log
                </button>
            </div>
            <div className="bg-gray-900 text-gray-200 font-mono text-sm p-6 rounded-2xl overflow-auto h-64">
                {scheduledJobs.length > 0 && (
                    <>
                        <p className="text-gray-500">--- Programados ---</p>
                        {scheduledJobs.map(job => (
                            <p key={job.id} className="text-blue-400">
                                <span className="text-gray-500">[{new Date().toLocaleTimeString()}] </span>
                                {job.status}: <span className="text-white">{job.campaign}</span> - Para el {new Date(job.time).toLocaleString()}
                            </p>
                        ))}
                    </>
                )}
                {logEnvios.length > 0 && (
                    <>
                        <p className="text-gray-500">--- Envío Directo ---</p>
                        {logEnvios.map((log, index) => (
                            <p key={index} className={log.status.includes('✅') ? 'text-green-400' : 'text-red-400'}>
                                <span className="text-gray-500">[{new Date().toLocaleTimeString()}] </span>
                                {log.status}: <span className="text-white">{log.email}</span> - {log.message}
                            </p>
                        ))}
                    </>
                )}
                {logEnvios.length === 0 && scheduledJobs.length === 0 && (
                    <p className="text-gray-500">El log de envíos aparecerá aquí...</p>
                )}
            </div>
        </div>
    );
};

export default SendLog;