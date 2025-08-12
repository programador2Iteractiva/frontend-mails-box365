import React, { useState } from 'react';

const ContactsTable = ({ emailList, searchTerm, setSearchTerm, onAddEmail }) => {
    const [newEmail, setNewEmail] = useState('');

    const handleAddClick = () => {
        if (newEmail) {
            onAddEmail(newEmail);
            setNewEmail('');
        }
    };

    return (
        <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Correos Cargados ({emailList.length})</h3>
            
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar correo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-apple-yellow"
                />
            </div>
            
            <div className="mb-4 flex gap-2">
                <input
                    type="email"
                    placeholder="Añadir correo manualmente..."
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-apple-yellow"
                />
                <button
                    onClick={handleAddClick}
                    className="bg-gray-800 text-white px-4 py-2 rounded-xl font-medium hover:bg-gray-700 transition"
                >
                    Añadir
                </button>
            </div>

            <div className="max-h-96 overflow-y-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {emailList.length > 0 ? (
                            emailList.map((email, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700">
                                        {email}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="1" className="px-6 py-4 text-center text-sm text-gray-500">
                                    No hay correos para mostrar.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContactsTable;