import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/Login';
import CampaignDashboard from './views/CampaignDashboard';
import CampaignCreator from './views/CampaignCreator';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState('');
    const [campaigns, setCampaigns] = useState([]); // Campañas activas
    const [campaignHistory, setCampaignHistory] = useState([]); // Nuevo estado para el historial
    const [editingCampaign, setEditingCampaign] = useState(null);

    const handleLogin = (username) => {
        setIsAuthenticated(true);
        setUser(username);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser('');
    };

    const handleCreateCampaign = (newCampaign) => {
        setCampaigns(prev => [...prev, { ...newCampaign, id: Date.now() }]);
        setEditingCampaign(null);
    };

    const handleDeleteCampaign = (id) => {
        setCampaigns(prev => prev.filter(c => c.id !== id));
    };

    const handleEditCampaign = (campaign) => {
        setEditingCampaign(campaign);
    };

    // Función para "enviar" la campaña y moverla al historial
    const handleSendCampaign = (campaignId) => {
        const campaignToSend = campaigns.find(c => c.id === campaignId);
        if (campaignToSend) {
            // Simulación de resultados de envío
            const sentCount = campaignToSend.contactCount - 1; // Ejemplo
            const errorCount = 1; // Ejemplo
            const finishedCampaign = {
                ...campaignToSend,
                sentDate: new Date().toISOString(),
                sentCount,
                errorCount,
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
                                    onSaveCampaign={handleCreateCampaign}
                                    campaignToEdit={editingCampaign}
                                />
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