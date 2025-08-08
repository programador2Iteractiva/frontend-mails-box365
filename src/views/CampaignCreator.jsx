import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import CampaignSettings from '../components/CampaignSettings';
import FileUploader from '../components/FileUploader';
import EmailPreview from '../components/EmailPreview';
import SendLog from '../components/SendLog';
import Modal from '../components/Modal';
import ContactsTable from '../components/ContactsTable';
import Scheduler from '../components/Scheduler';
import { FaArrowLeft } from 'react-icons/fa';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

const CampaignCreator = ({ onSaveCampaign, onCancel }) => {
    const [payload, setPayload] = useState({
        campaign_id: 30,
        name: "Nueva Campaña",
        from: "info@dominio.com",
        reply_to: "contacto@dominio.com",
        subject: "¡Asunto de prueba!",
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
    };

    const handleFileUpload = (data) => {
        if (data.imageFile) {
            setImageFile(data.imageFile);
            setImageUrl(URL.createObjectURL(data.imageFile));
            toast.success(`Imagen "${data.imageFile.name}" cargada.`);
        }
        if (data.emailList) {
            const newEmails = Array.from(new Set([...emailList, ...data.emailList]));
            setEmailList(newEmails);
            toast.success(`Se han cargado ${data.emailList.length} correos.`);
        }
    };

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

                setLogEnvios(prevLog => [...prevLog, { email, status: '✅ Enviado', message: 'Correo enviado.' }]);
            } catch (error) {
                setLogEnvios(prevLog => [...prevLog, { email, status: '❌ Error', message: error.message || 'Error desconocido' }]);
            }
        }

        toast.success("¡Proceso de envío completado!");
    };

    const handleScheduleEmails = () => {
        if (!scheduleTime) {
            toast.error("Por favor, selecciona una fecha y hora para programar el envío.");
            return;
        }
        const job = {
            id: Date.now(),
            time: scheduleTime,
            status: 'Programado',
            count: emailList.length,
            campaign: payload.name,
        };
        setScheduledJobs(prev => [...prev, job]);
        toast.success(`Campaña programada para el ${new Date(scheduleTime).toLocaleString()}`);
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
        saveAs(blob, `log_envios_${payload.name.replace(/\s/g, '_')}.csv`);
        toast.success("Log de envíos descargado exitosamente.");
    };

    const handleSaveAsCampaign = () => {
        if (emailList.length === 0 || !imageFile) {
            toast.error("La campaña debe tener correos y una imagen.");
            return;
        }

        const newCampaign = {
            name: payload.name,
            date: new Date().toISOString(),
            contactCount: emailList.length,
            payload,
            imageLink,
            // Aquí en un caso real, guardarías la URL de la imagen en un servidor.
            imageUrl: imageUrl,
            scheduleTime,
            // Y otros datos necesarios para recrear la campaña.
        };

        onSaveCampaign(newCampaign);
    };

    const isSaveButtonEnabled = emailList.length > 0 && imageUrl !== null;
    const filteredEmails = emailList.filter(email => email.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <button onClick={() => navigate('/')} className="text-gray-500 flex items-center hover:text-gray-700 transition">
                    <FaArrowLeft className="mr-2" /> Volver a las campañas
                </button>
                <h1 className="text-3xl font-bold text-gray-900">Crear Nueva Campaña</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Columna Izquierda: Configuración y Carga */}
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

                {/* Columna Derecha: Previsualización y Log */}
                <div className="space-y-6">
                    <EmailPreview
                        imageUrl={imageUrl}
                        imageLink={imageLink}
                        emailList={emailList}
                    />
                    <SendLog
                        logEnvios={logEnvios}
                        scheduledJobs={scheduledJobs}
                        onDownloadLog={handleDownloadLog}
                    />
                </div>
            </div>

            <button
                onClick={handleSaveAsCampaign}
                disabled={!isSaveButtonEnabled}
                className={`w-full mt-8 py-4 rounded-2xl font-bold tracking-wide text-lg transition duration-200 ${isSaveButtonEnabled
                        ? 'bg-apple-yellow text-gray-900 hover:bg-yellow-400 transform hover:scale-105'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
            >
                Guardar Campaña
            </button>

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

export default CampaignCreator;