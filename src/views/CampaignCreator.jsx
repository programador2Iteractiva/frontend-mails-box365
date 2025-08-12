import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import { FaArrowLeft } from 'react-icons/fa';

import CampaignControls from '../components/CampaignControls';
import CampaignEditor from '../components/CampaignEditor';
import CampaignSettings from '../components/CampaignSettings';
import Scheduler from '../components/Scheduler';
import Modal from '../components/Modal';
import ContactsTable from '../components/ContactsTable';
import EmailPreview from '../components/EmailPreview';

const CampaignCreator = ({ onSaveCampaign, campaignToEdit }) => {
    const navigate = useNavigate();

    // --- ESTADOS (SIN CAMBIOS) ---
    const [payload, setPayload] = useState(campaignToEdit?.payload || {
        name: "Nueva Campaña",
        subject: "¡Asunto de prueba!",
        from: "info@dominio.com",
        reply_to: "contacto@dominio.com",
    });
    const [template, setTemplate] = useState(campaignToEdit?.template || 'text-image');
    const [body, setBody] = useState(campaignToEdit?.body || '');
    const [rawHtml, setRawHtml] = useState(campaignToEdit?.rawHtml || '<p>Escribe tu contenido aquí...</p>');
    const [emailList, setEmailList] = useState(campaignToEdit?.emailList || []);
    const [availableVars, setAvailableVars] = useState(campaignToEdit?.availableVars || []);
    const [imageUrl, setImageUrl] = useState(campaignToEdit?.imageUrl || null);
    const [imageLink, setImageLink] = useState(campaignToEdit?.imageLink || "#");
    const [scheduleTime, setScheduleTime] = useState(null);
    const [isContactsModalOpen, setContactsModalOpen] = useState(false);
    const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [lastFocusedInput, setLastFocusedInput] = useState('subject');

    useEffect(() => {
        console.log('2. CampaignCreator: El estado rawHtml se actualizó:', rawHtml);
    }, [rawHtml]);

    // --- FUNCIONES (SIN CAMBIOS) ---
    const handleEmailFile = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = event.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

                if (json.length > 0 && 'correos' in json[0]) {
                    const emails = json.map(row => row.correos).filter(Boolean);
                    const newEmails = Array.from(new Set([...emailList, ...emails]));
                    setEmailList(newEmails);

                    const headers = Object.keys(json[0]);
                    setAvailableVars(headers);
                    toast.success(`Se cargaron ${emails.length} correos.`);
                } else {
                    toast.error("El archivo no tiene la columna 'correos' o está vacío.");
                }
            };
            reader.readAsBinaryString(file);
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

    const handleInsertVariable = useCallback((variable) => {
        const textToInsert = `{${variable}}`;

        switch (lastFocusedInput) {
            case 'subject':
                setPayload(prev => ({ ...prev, subject: prev.subject + textToInsert }));
                break;
            case 'body':
                setBody(prev => prev + textToInsert);
                break;
            case 'rawHtml':
                setRawHtml(prev => prev.endsWith('</p>') ? prev.slice(0, -4) + ` ${textToInsert}</p>` : prev + textToInsert);
                break;
            default:
                toast.info('Haz clic en un campo de texto (Asunto, Contenido) para insertar la variable.');
        }
    }, [lastFocusedInput]);

    const handleSaveCampaign = () => {
        if (emailList.length === 0) {
            toast.error("La campaña debe tener al menos un correo.");
            return;
        }

        const newCampaign = {
            id: campaignToEdit?.id || Date.now(),
            name: payload.name,
            date: new Date().toISOString(),
            contactCount: emailList.length,
            payload,
            template,
            body,
            rawHtml,
            imageUrl,
            imageLink,
            emailList,
            availableVars,
            scheduleTime,
        };

        onSaveCampaign(newCampaign);
        navigate('/');
    };

    const isSaveButtonEnabled = emailList.length > 0;
    const filteredEmails = emailList.filter(email => email.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <button onClick={() => navigate('/')} className="text-gray-500 flex items-center hover:text-gray-700 transition">
                    <FaArrowLeft className="mr-2" /> Volver
                </button>
                <h1 className="text-3xl font-bold text-gray-900">Editor de Campañas</h1>
            </div>

            {/* --- NUEVA ESTRUCTURA COMPACTA --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Columna principal para el editor (ocupa 2/3 del espacio) */}
                <div className="lg:col-span-2">
                    <CampaignEditor
                        payload={payload}
                        setPayload={setPayload}
                        template={template}
                        setTemplate={setTemplate}
                        body={body}
                        setBody={setBody}
                        rawHtml={rawHtml}
                        setRawHtml={setRawHtml}
                        setImageUrl={setImageUrl}
                        imageLink={imageLink}
                        setImageLink={setImageLink}
                        onPreview={() => setPreviewModalOpen(true)}
                        setLastFocusedInput={setLastFocusedInput}
                    />
                </div>

                {/* Columna lateral para controles y configuración (ocupa 1/3) */}
                <div className="space-y-8">
                    <CampaignControls
                        onFileUpload={handleEmailFile}
                        emailListCount={emailList.length}
                        onShowEmails={() => setContactsModalOpen(true)}
                        availableVars={availableVars}
                        onInsertVariable={handleInsertVariable}
                    />
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
                        <CampaignSettings
                            payload={payload}
                            setPayload={setPayload}
                        />
                    </div>
                    <Scheduler
                        scheduleTime={scheduleTime}
                        setScheduleTime={setScheduleTime}
                    />
                </div>
            </div>

            <button
                onClick={handleSaveCampaign}
                disabled={!isSaveButtonEnabled}
                className={`w-full mt-8 py-4 rounded-2xl font-bold tracking-wide text-lg transition duration-200 ${isSaveButtonEnabled
                    ? 'bg-apple-yellow text-gray-900 hover:bg-yellow-400'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
            >
                Guardar Campaña
            </button>

            {/* --- MODALES (SIN CAMBIOS) --- */}
            <Modal isOpen={isContactsModalOpen} onClose={() => setContactsModalOpen(false)} title="Contactos Cargados">
                <ContactsTable
                    emailList={filteredEmails}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onAddEmail={handleAddManualEmail}
                />
            </Modal>
            <Modal isOpen={isPreviewModalOpen} onClose={() => setPreviewModalOpen(false)} title="Vista Previa del Email">
                <div className="p-4">
                    <EmailPreview
                        imageUrl={imageUrl}
                        imageLink={imageLink}
                        emailList={emailList}
                        payload={payload}
                        template={template}
                        body={body}
                        rawHtml={rawHtml}
                    />
                </div>
            </Modal>

            <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
        </div>
    );
};

export default CampaignCreator;