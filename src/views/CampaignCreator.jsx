import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import { FaArrowLeft } from 'react-icons/fa';

import CampaignControls from '../components/CampaignControls';
import CampaignEditor from '../components/CampaignEditor';
import Modal from '../components/Modal';
import ContactsTable from '../components/ContactsTable';
import EmailPreview from '../components/EmailPreview';

const CampaignCreator = ({ onSaveCampaign, campaignToEdit }) => {
    const navigate = useNavigate();

    // Estado general de la campaña
    const [payload, setPayload] = useState(campaignToEdit?.payload || {
        name: "Nueva Campaña",
        subject: "¡Asunto de prueba!",
        from: "info@dominio.com",
        reply_to: "contacto@dominio.com",
    });
    const [template, setTemplate] = useState(campaignToEdit?.template || 'text-image');
    const [body, setBody] = useState(campaignToEdit?.body || '');
    const [rawHtml, setRawHtml] = useState(campaignToEdit?.rawHtml || ''); // Se carga el HTML al editar
    const [emailList, setEmailList] = useState(campaignToEdit?.emailList || []);
    const [availableVars, setAvailableVars] = useState(campaignToEdit?.availableVars || []);
    const [imageUrl, setImageUrl] = useState(campaignToEdit?.imageUrl || null);
    const [imageLink, setImageLink] = useState(campaignToEdit?.imageLink || "#");
    const [isContactsModalOpen, setContactsModalOpen] = useState(false);
    const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");


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
        const target = document.activeElement;
        if (target.id === 'body') {
            setBody(prevBody => prevBody + `{${variable}}`);
        } else if (target.id === 'rawHtml') {
            setRawHtml(prevHtml => prevHtml + `{${variable}}`);
        } else {
            toast.info('Haz clic en un campo de texto para insertar la variable.');
        }
    }, []);

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
            rawHtml, // Se guarda el HTML en la campaña
            imageUrl,
            imageLink,
            emailList,
            availableVars,
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Columna Izquierda */}
                <CampaignControls
                    onFileUpload={handleEmailFile}
                    emailListCount={emailList.length}
                    onShowEmails={() => setContactsModalOpen(true)}
                    availableVars={availableVars}
                    onInsertVariable={handleInsertVariable}
                />
                {/* Columna Derecha */}
                <CampaignEditor
                    payload={payload}
                    setPayload={setPayload}
                    template={template}
                    setTemplate={setTemplate}
                    body={body}
                    setBody={setBody}
                    setImageUrl={setImageUrl}
                    imageLink={imageLink}
                    setImageLink={setImageLink}
                    onPreview={() => setPreviewModalOpen(true)}
                    rawHtml={rawHtml}
                    setRawHtml={setRawHtml}
                />
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

            {/* Modal para la tabla de contactos */}
            <Modal isOpen={isContactsModalOpen} onClose={() => setContactsModalOpen(false)} title="Contactos Cargados">
                <ContactsTable
                    emailList={filteredEmails}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onAddEmail={handleAddManualEmail}
                />
            </Modal>

            {/* Modal para la previsualización del correo */}
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