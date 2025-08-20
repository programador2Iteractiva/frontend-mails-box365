import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/Login';
import CampaignDashboard from './views/CampaignDashboard';
import CampaignCreator from './views/CampaignCreator';
import CampaignDetail from './views/CampaignDetail';
import Navbar from './components/utils/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

// --- DATOS DE EJEMPLO (AHORA IMPORTADOS) ---
import { DUMMY_CAMPAIGNS } from './data/campaigns';
import { DUMMY_HISTORY } from './data/history';
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