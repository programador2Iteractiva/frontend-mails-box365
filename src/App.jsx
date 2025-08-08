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
    const [campaigns, setCampaigns] = useState([]);
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
    };

    const handleDeleteCampaign = (id) => {
        setCampaigns(prev => prev.filter(c => c.id !== id));
    };

    const handleEditCampaign = (campaign) => {
        setEditingCampaign(campaign);
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
                                    onDeleteCampaign={handleDeleteCampaign}
                                    onEditCampaign={handleEditCampaign}
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
                                    onCancel={() => setEditingCampaign(null)}
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