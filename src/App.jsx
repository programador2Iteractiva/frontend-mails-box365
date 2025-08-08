import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CampaignSettings from './components/CampaignSettings';
import FileUploader from './components/FileUploader';
import EmailPreview from './components/EmailPreview';
import SendLog from './components/SendLog';
import Modal from './components/Modal';
import Scheduler from './components/Scheduler';
import ContactsTable from './components/ContactsTable';
import { saveAs } from 'file-saver'; // Importa la librería para guardar archivos
import Papa from 'papaparse'; // Importa para convertir a CSV

const App = () => {
    const [payload, setPayload] = useState({
        campaign_id: 30,
        name: "Novo Nordisk CLAT",
        from: "novonordiskclat@send.box365.com.co",
        reply_to: "plpv@novonordisk.com",
        subject: "¡Regístrate al resumen de ecos del eco!",
    });
    const [imageUrl, setImageUrl] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageLink, setImageLink] = useState("#");
    const [emailList, setEmailList] = useState([]);
    const [logEnvios, setLogEnvios] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scheduleTime, setScheduleTime] = useState(null);
    const [scheduledJobs, setScheduledJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const handleConfigChange = (selectedConfig) => {
        setPayload({ ...payload, ...selectedConfig });
        toast.success(`Configuración "${selectedConfig.name}" seleccionada.`);
    };

    const handleFileUpload = (data) => {
        if (data.imageFile) {
            setImageFile(data.imageFile);
            setImageUrl(URL.createObjectURL(data.imageFile));
            toast.success(`Imagen "${data.imageFile.name}" cargada.`);
        }
        if (data.emailList) {
            // Combina los correos existentes con los nuevos, eliminando duplicados
            const newEmails = Array.from(new Set([...emailList, ...data.emailList]));
            setEmailList(newEmails);
            toast.success(`Se han cargado ${data.emailList.length} correos.`);
        }
    };
    
    // Función para añadir correos manualmente
    const handleAddManualEmail = (newEmail) => {
        if (newEmail && !emailList.includes(newEmail)) {
            setEmailList(prev => [...prev, newEmail]);
            toast.success(`Correo "${newEmail}" añadido.`);
        } else if (emailList.includes(newEmail)) {
            toast.warn(`El correo "${newEmail}" ya existe.`);
        }
    };
    
    const handleSendEmails = async () => {
        if (emailList.length === 0 || !imageFile) {
            toast.error("Por favor, carga los correos y la imagen antes de enviar.");
            return;
        }
        
        toast.info("Subiendo imagen y preparando envíos...");
        
        const imagePublicUrl = await new Promise(resolve => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(imageFile);
        });
        
        const finalPayload = {
            ...payload,
            body: `<div style="text-align:center;width: 100%;"><a href="${imageLink}" target="_blank" style="text-align:center"><img src="${imagePublicUrl}" alt="image-email" style="max-width: 100%; height: auto; border-radius: 8px;"></a></div>`
        };

        setLogEnvios([]);
        toast.info(`Iniciando envío a ${emailList.length} correos.`);

        for (const email of emailList) {
            try {
                // Simulación del envío de correo
                const isError = Math.random() < 0.1;
                if (isError) throw new Error("Error de conexión.");

                setLogEnvios(prevLog => [...prevLog, { email, status: '✅ Enviado' }]);
            } catch (error) {
                setLogEnvios(prevLog => [...prevLog, { email, status: '❌ Error', message: error.message || 'Error desconocido' }]);
            }
        }

        toast.success("¡Proceso de envío completado!");
    };

    const handleScheduleEmails = () => {
        // ... (misma lógica)
    };

    const handleDownloadLog = () => {
        if (logEnvios.length === 0) {
            toast.warn("No hay un log de envíos para descargar.");
            return;
        }
        const csvData = logEnvios.map(log => ({
            Correo: log.email,
            Estado: log.status.includes('✅') ? 'Enviado' : 'Error',
            Mensaje: log.message || '',
        }));
        const csv = Papa.unparse(csvData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'log_envios.csv');
        toast.success("Log de envíos descargado exitosamente.");
    };

    const isSendButtonEnabled = emailList.length > 0 && imageUrl !== null;
    const filteredEmails = emailList.filter(email => email.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="bg-gray-50 min-h-screen p-8 font-sans antialiased text-gray-800">
            <div className="max-w-7xl mx-auto space-y-8">
                <h1 className="text-4xl font-extrabold text-center tracking-tight text-gray-900">
                    Email Campaign Sender
                </h1>
                <p className="text-center text-lg text-gray-500 max-w-2xl mx-auto">
                    Configura, previsualiza y envía tus campañas de correo de forma sencilla y segura.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <CampaignSettings
                            payload={payload}
                            setPayload={setPayload}
                            imageLink={imageLink}
                            setImageLink={setImageLink}
                            onConfigChange={handleConfigChange}
                        />
                        <FileUploader
                            onFileUpload={handleFileUpload}
                            emailListCount={emailList.length}
                            onShowEmails={() => setIsModalOpen(true)}
                        />
                        <Scheduler 
                            scheduleTime={scheduleTime} 
                            setScheduleTime={setScheduleTime}
                        />
                    </div>

                    <div className="space-y-6">
                        <EmailPreview
                            imageUrl={imageUrl}
                            imageLink={imageLink}
                            emailList={emailList}
                        />
                        <SendLog logEnvios={logEnvios} scheduledJobs={scheduledJobs} onDownloadLog={handleDownloadLog} />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <button
                        onClick={handleSendEmails}
                        disabled={!isSendButtonEnabled}
                        className={`w-full py-4 rounded-2xl font-bold tracking-wide text-lg transition duration-200 ${
                            isSendButtonEnabled
                                ? 'bg-apple-yellow text-gray-900 hover:bg-yellow-400 transform hover:scale-105'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        🚀 Enviar Ahora
                    </button>
                    <button
                        onClick={handleScheduleEmails}
                        disabled={!isSendButtonEnabled || !scheduleTime}
                        className={`w-full py-4 rounded-2xl font-bold tracking-wide text-lg transition duration-200 ${
                            isSendButtonEnabled && scheduleTime
                                ? 'bg-gray-800 text-white hover:bg-gray-700 transform hover:scale-105'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        ⏰ Programar Envío
                    </button>
                </div>
            </div>
            
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                 <ContactsTable 
                    emailList={filteredEmails} 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm}
                    onAddEmail={handleAddManualEmail}
                />
            </Modal>

            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
        </div>
    );
};

export default App;