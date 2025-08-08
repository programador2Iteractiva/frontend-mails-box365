import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ user, onLogout }) => {
    const getInitials = (name) => {
        if (!name) return '?';
        const parts = name.split(' ');
        if (parts.length > 1) {
            return parts[0][0] + parts[1][0];
        }
        return parts[0][0];
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50 p-4 border-b border-gray-200">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-2xl font-extrabold text-gray-900 tracking-tight">
                    Email <span className="text-apple-yellow">Box365</span> 
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-full">
                        <div className="w-8 h-8 rounded-full bg-gray-700 text-white font-bold flex items-center justify-center text-sm">
                            {getInitials(user)}
                        </div>
                        <span className="text-gray-700 text-sm hidden md:block">{user}</span>
                    </div>
                    <button
                        onClick={onLogout}
                        className="text-gray-500 hover:text-red-500 transition"
                        title="Cerrar Sesión"
                    >
                        <FaSignOutAlt className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;