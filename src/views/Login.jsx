import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Lógica de autenticación simple. En un caso real, harías una llamada a la API.
        if (username === '1' && password === '1') {
            onLogin(username);
        } else {
            alert('Credenciales incorrectas');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-200">
                <h2 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h2>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Usuario</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-apple-yellow focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-apple-yellow focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-apple-yellow text-gray-900 font-bold py-3 rounded-xl shadow-md hover:bg-yellow-400 transition"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;