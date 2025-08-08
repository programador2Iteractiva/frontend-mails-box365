import React from 'react';

const Scheduler = ({ scheduleTime, setScheduleTime }) => {
    return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">3. Programar Envío</h2>
            <p className="text-gray-600 text-sm">Selecciona una fecha y hora para enviar la campaña automáticamente.</p>
            <div>
                <label htmlFor="schedule-time" className="block text-gray-700 font-medium mb-2">Fecha y Hora</label>
                <input
                    type="datetime-local"
                    id="schedule-time"
                    value={scheduleTime ? new Date(scheduleTime - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setScheduleTime(new Date(e.target.value).getTime())}
                    className="block w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-apple-yellow"
                />
            </div>
        </div>
    );
};

export default Scheduler;