import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Estado para simular carga
    const navigate = useNavigate(); // 2. Obtener la función de navegación

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true); // Activar el estado de carga

        // 3. Simular una llamada a la API con un retraso
        setTimeout(() => {
            console.log('Login exitoso para:', { email });
            onLogin(email)
        }, 1500); // Retraso de 1.5 segundos
    };

    return (
        <main className="flex min-h-screen w-full items-center justify-center bg-slate-100 p-4">
            <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl sm:p-12">

                <header className="mb-8">
                    <h1 className="text-[2.5rem] font-bold leading-tight text-zinc-900">
                        Bienvenido
                    </h1>
                    <p className="mt-2 text-lg leading-relaxed text-zinc-500">
                        Ingresa tus credenciales para continuar.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="sr-only">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Correo electrónico"
                            required
                            className="w-full rounded-lg border-zinc-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                            required
                            className="w-full rounded-lg border-zinc-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading} // Deshabilitar el botón mientras carga
                            className="w-full rounded-lg bg-[#ffcc00] px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-indigo-400"
                        >
                            {/* Cambiar el texto del botón si está cargando */}
                            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Login;