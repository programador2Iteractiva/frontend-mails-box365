import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/Login';
import CampaignDashboard from './views/CampaignDashboard';
import CampaignCreator from './views/CampaignCreator';
import CampaignDetail from './views/CampaignDetail';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

// --- DATOS DE EJEMPLO ---
const DUMMY_CAMPAIGNS = [
    {
        id: 1,
        name: "Campaña de Verano (Ejemplo)",
        date: new Date('2024-07-15T10:00:00Z').toISOString(),
        contactCount: 150,
        payload: {
            name: "Campaña de Verano (Ejemplo)",
            subject: "¡Ofertas exclusivas para ti!",
            from: "ventas@empresa.com",
            reply_to: "soporte@empresa.com",
        },
        template: 'text-image',
        body: 'Aprovecha nuestros descuentos de hasta el 50009000% en productos seleccionados.',
        imageUrl: 'https://novonordisk.interactiva.com.co/wp-content/uploads/2025/08/Biomarin.png',
        imageLink: '#',
        emailList: Array.from({ length: 150 }, (_, i) => `contacto${i + 1}@ejemplo.com`),
        availableVars: ['correos', 'nombre'],
    }
];

const DUMMY_HISTORY = [
    {
        id: 101,
        name: "Lanzamiento de Producto (Historial)",
        sentDate: new Date('2025-06-01T14:30:00Z').toISOString(),
        sentDateFinish: new Date('2024-06-01T18:30:00Z').toISOString(),
        contactCount: 5,
        sentCount: 3,
        errorCount: 2,
        log: [
            { email: 'cliente1@ejemplo.com', status: 'Enviado', message: 'OK' },
            { email: 'cliente2@ejemplo.com', status: 'Error', message: 'Buzón lleno' },
            { email: 'cliente3@ejemplo.com', status: 'Enviado', message: 'OK' },
            { email: 'cliente4@ejemplo.com', status: 'Enviado', message: 'OK' },
            { email: 'cliente5@ejemplo.com', status: 'Error', message: 'Dirección no existe' },
             { email: 'cliente1@ejemplo.com', status: 'Enviado', message: 'OK' },
            { email: 'cliente2@ejemplo.com', status: 'Error', message: 'Buzón lleno' },
            { email: 'cliente3@ejemplo.com', status: 'Enviado', message: 'OK' },
            { email: 'cliente4@ejemplo.com', status: 'Enviado', message: 'OK' },
            { email: 'cliente5@ejemplo.com', status: 'Error', message: 'Dirección no existe' },
             { email: 'cliente1@ejemplo.com', status: 'Enviado', message: 'OK' },
            { email: 'cliente2@ejemplo.com', status: 'Error', message: 'Buzón lleno' },
            { email: 'cliente3@ejemplo.com', status: 'Enviado', message: 'OK' },
            { email: 'cliente4@ejemplo.com', status: 'Enviado', message: 'OK' },
            { email: 'cliente5@ejemplo.com', status: 'Error', message: 'Dirección no existe' },
             { email: 'cliente1@ejemplo.com', status: 'Enviado', message: 'OK' },
            { email: 'cliente2@ejemplo.com', status: 'Error', message: 'Buzón lleno' },
            { email: 'cliente3@ejemplo.com', status: 'Enviado', message: 'OK' },
            { email: 'cliente4@ejemplo.com', status: 'Enviado', message: 'OK' },
            { email: 'cliente5@ejemplo.com', status: 'Error', message: 'Dirección no existe' },
             { email: 'cliente1@ejemplo.com', status: 'Enviado', message: 'OK' },
            { email: 'cliente2@ejemplo.com', status: 'Error', message: 'Buzón lleno' },
            { email: 'cliente3@ejemplo.com', status: 'Enviado', message: 'OK' },
            { email: 'cliente4@ejemplo.com', status: 'Enviado', message: 'OK' },
            { email: 'cliente5@ejemplo.com', status: 'Error', message: 'Dirección no existe' },
             { email: 'cliente1@ejemplo.com', status: 'Enviado', message: 'OK' },
            { email: 'cliente2@ejemplo.com', status: 'Error', message: 'Buzón lleno' },
            { email: 'cliente3@ejemplo.com', status: 'Enviado', message: 'OK' },
            { email: 'cliente4@ejemplo.com', status: 'Enviado', message: 'OK' },
            { email: 'cliente5@ejemplo.com', status: 'Error', message: 'Dirección no existe' },
             { email: 'cliente1@ejemplo.com', status: 'Enviado', message: 'OK' },
            { email: 'cliente2@ejemplo.com', status: 'Error', message: 'Buzón lleno' },
            { email: 'cliente3@ejemplo.com', status: 'Enviado', message: 'OK' },
            { email: 'cliente4@ejemplo.com', status: 'Enviado', message: 'OK' },
            { email: 'cliente5@ejemplo.com', status: 'Error', message: 'Dirección no existe' },
            
        ],
        payload: { name: "Lanzamiento de Producto (Historial)", subject: "Conoce lo nuevo" },
    }
];
// --- FIN DE DATOS DE EJEMPLO ---


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState('');
    
    // Carga los datos desde el localStorage o usa los datos de ejemplo
    const [campaigns, setCampaigns] = useState(() => {
        const saved = localStorage.getItem('campaigns');
        return saved ? JSON.parse(saved) : DUMMY_CAMPAIGNS;
    });
    
    const [campaignHistory, setCampaignHistory] = useState(() => {
        const saved = localStorage.getItem('campaignHistory');
        return saved ? JSON.parse(saved) : DUMMY_HISTORY;
    });

    const [editingCampaign, setEditingCampaign] = useState(null);

    // Guarda los cambios en localStorage
    useEffect(() => {
        localStorage.setItem('campaigns', JSON.stringify(campaigns));
    }, [campaigns]);

    useEffect(() => {
        localStorage.setItem('campaignHistory', JSON.stringify(campaignHistory));
    }, [campaignHistory]);


    const handleLogin = (username) => {
        setIsAuthenticated(true);
        setUser(username);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser('');
    };

    const handleSaveCampaign = (campaignToSave) => {
        const existingIndex = campaigns.findIndex(c => c.id === campaignToSave.id);
        if (existingIndex > -1) {
            // Actualiza una campaña existente
            const updatedCampaigns = [...campaigns];
            updatedCampaigns[existingIndex] = campaignToSave;
            setCampaigns(updatedCampaigns);
        } else {
            // Añade una nueva campaña
            setCampaigns(prev => [...prev, campaignToSave]);
        }
        setEditingCampaign(null); // Limpia la campaña en edición
    };

    const handleDeleteCampaign = (id) => {
        setCampaigns(prev => prev.filter(c => c.id !== id));
    };

    const handleEditCampaign = (campaign) => {
        setEditingCampaign(campaign);
    };

    const handleSendCampaign = (campaignId) => {
        const campaignToSend = campaigns.find(c => c.id === campaignId);
        if (campaignToSend) {
            const sentCount = Math.max(0, campaignToSend.contactCount - 1);
            const errorCount = campaignToSend.contactCount > 0 ? 1 : 0;
            const log = campaignToSend.emailList.map((email, index) => ({
                email,
                status: index < sentCount ? 'Enviado' : 'Error',
                message: index < sentCount ? 'OK' : 'Fallo en el servidor de correo'
            }));
            
            const finishedCampaign = {
                ...campaignToSend,
                sentDate: new Date().toISOString(),
                sentDateFinish: new Date().toISOString(),
                sentCount,
                errorCount,
                log,
            };

            setCampaigns(prev => prev.filter(c => c.id !== campaignId));
            setCampaignHistory(prev => [...prev, finishedCampaign]);
        }
    };

    return (
        <Router>
            {isAuthenticated && <Navbar user={user} onLogout={handleLogout} />}
            <main className="bg-gray-50 min-h-screen p-10">
                <Routes>
                    <Route
                        path="/login"
                        element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/"
                        element={
                            isAuthenticated ? (
                                <CampaignDashboard
                                    campaigns={campaigns}
                                    campaignHistory={campaignHistory}
                                    onDeleteCampaign={handleDeleteCampaign}
                                    onEditCampaign={handleEditCampaign}
                                    onSendCampaign={handleSendCampaign}
                                />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/create"
                        element={
                            isAuthenticated ? (
                                <CampaignCreator
                                    onSaveCampaign={handleSaveCampaign}
                                    campaignToEdit={editingCampaign}
                                />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                     <Route
                        path="/history/:id"
                        element={
                            isAuthenticated ? (
                                <CampaignDetail campaignHistory={campaignHistory} />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                </Routes>
            </main>
            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
        </Router>
    );
};

export default App;