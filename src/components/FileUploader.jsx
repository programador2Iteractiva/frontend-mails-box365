import React from 'react';
import * as XLSX from 'xlsx';

const FileUploader = ({ onFileUpload, emailListCount, onShowEmails, template }) => {
    const handleEmailFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = event.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);
                const emails = json.map(row => row.correos).filter(email => email);
                onFileUpload({ emailList: emails });
            };
            reader.readAsBinaryString(file);
        }
    };

    const handleImageFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            onFileUpload({ imageFile: file });
        }
    };

    const handleDownloadTemplate = () => {
        const wb = XLSX.utils.book_new();
        const wsData = [
            ["correos", "nombre", "otros_datos"],
            ["ejemplo@dominio.com", "Juan Pérez", "Dato 1"]
        ];
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        XLSX.utils.book_append_sheet(wb, ws, "Correos");
        XLSX.writeFile(wb, "plantilla_correos.xlsx");
    };

    return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">2. Carga de Archivos</h2>

            <div className="space-y-4">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-gray-700 font-medium">Base de Datos de Correos (XLSX)</label>
                        <button onClick={handleDownloadTemplate} className="text-sm text-blue-600 hover:underline">
                            Descargar plantilla
                        </button>
                    </div>
                    <input
                        type="file"
                        accept=".xlsx"
                        onChange={handleEmailFile}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    />
                    {emailListCount > 0 && (
                        <div className="mt-2 flex justify-between items-center text-sm text-gray-600">
                            <span>{emailListCount} correos cargados</span>
                            <button onClick={onShowEmails} className="text-blue-600 hover:underline">
                                Ver tabla completa
                            </button>
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Imagen del Correo (.jpg, .png)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFile}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    />
                </div>
            </div>

            <div>
                <label className="block text-gray-700 font-medium mb-2">Imagen del Correo (.jpg, .png)</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFile}
                    disabled={template === 'text'}
                    className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 ${template === 'text' ? 'cursor-not-allowed opacity-50' : ''}`}
                />
            </div>
        </div>
    );
};

export default FileUploader;