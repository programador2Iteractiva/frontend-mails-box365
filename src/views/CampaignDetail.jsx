import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaDownload } from 'react-icons/fa';
import SendLog from '../components/SendLog';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import MessagePieChart from '../components/charts/MessagePieChart';
import StatusBarsChart from '../components/charts/StatusBarsChart';
import SendingTrendChart from '../components/charts/SendingTrendChart';

const CampaignDetail = ({ campaignHistory }) => {
    const { id } = useParams();
    const campaign = campaignHistory.find(c => c.id.toString() === id);
    const [activeTab, setActiveTab] = useState('summary');
    const [isDownloading, setIsDownloading] = useState(false);

    // Refs para los contenedores originales de los gráficos
    const trendChartRef = useRef(null);
    const pieChartRef = useRef(null);
    const barChartRef = useRef(null);

    const handleDownloadPdf = async () => {
        setIsDownloading(true);
        const doc = new jsPDF('p', 'mm', 'a4');
        const margin = 15;
        const pageWidth = doc.internal.pageSize.getWidth();
        const contentWidth = pageWidth - margin * 2;
        
        doc.setFontSize(20);
        doc.text(`Reporte de Campaña: ${campaign.name}`, margin, 20);

        // --- INICIO DE LA SOLUCIÓN DEFINITIVA ---
        // Función para crear y capturar un clon limpio del elemento
       const captureCleanClone = async (element) => {
            const clone = element.cloneNode(true);
            
            clone.style.position = 'absolute';
            clone.style.left = '-9999px';
            clone.style.top = '0px';
            clone.style.width = '800px';
            clone.style.backgroundColor = 'white';
            
            // Forzar solo el color del texto a negro, permitiendo que los
            // colores de 'fill' y 'stroke' de los gráficos se mantengan.
            clone.querySelectorAll('*').forEach(child => {
                child.style.color = 'black';
            });

            document.body.appendChild(clone);
            const canvas = await html2canvas(clone, { scale: 2 });
            document.body.removeChild(clone);

            return canvas;
        };

        
        try {
            // Capturar los clones limpios de los gráficos
            const [trendCanvas, pieCanvas, barCanvas] = await Promise.all([
                captureCleanClone(trendChartRef.current),
                captureCleanClone(pieChartRef.current),
                captureCleanClone(barChartRef.current)
            ]);

            // 1. Añadir el gráfico de tendencia
            const trendImgData = trendCanvas.toDataURL('image/png', 1.0);
            const trendImgHeight = (trendCanvas.height * contentWidth) / trendCanvas.width;
            doc.setFontSize(14);
            doc.text('Tendencia de Envío', margin, 35);
            doc.addImage(trendImgData, 'PNG', margin, 40, contentWidth, trendImgHeight);
            let lastY = 40 + trendImgHeight + 15;

            // 2. Añadir los gráficos pequeños
            const smallChartWidth = (contentWidth / 2) - 5;
            const pieImgHeight = (pieCanvas.height * smallChartWidth) / pieCanvas.width;
            const barImgHeight = (barCanvas.height * smallChartWidth) / barCanvas.width;
            
            const pieImgData = pieCanvas.toDataURL('image/png', 1.0);
            doc.setFontSize(12);
            doc.text('Resultados por Mensaje', margin, lastY);
            doc.addImage(pieImgData, 'PNG', margin, lastY + 5, smallChartWidth, pieImgHeight);
            
            const barImgData = barCanvas.toDataURL('image/png', 1.0);
            doc.text('Enviados vs. Errores', margin + smallChartWidth + 10, lastY);
            doc.addImage(barImgData, 'PNG', margin + smallChartWidth + 10, lastY + 5, smallChartWidth, barImgHeight);

            doc.save(`reporte-${campaign.name.replace(/\s/g, '_')}.pdf`);

        } catch (error) {
            console.error("Error al generar el PDF:", error);
            alert("Hubo un error al generar el PDF. Por favor, intenta de nuevo.");
        } finally {
            setIsDownloading(false);
        }
        // --- FIN DE LA SOLUCIÓN ---
    };

    if (!campaign) {
        return (
            <div className="text-center">
                <h1 className="text-2xl">Campaña no encontrada</h1>
                <Link to="/" className="text-blue-600">Volver al Dashboard</Link>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <Link to="/" className="text-gray-500 flex items-center hover:text-gray-700 transition">
                    <FaArrowLeft className="mr-2" /> Volver
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">{campaign.name}</h1>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
                <div className="flex border-b border-gray-200 mb-6">
                    <button onClick={() => setActiveTab('summary')} className={`py-2 px-4 font-semibold ${activeTab === 'summary' ? 'text-apple-yellow border-b-2 border-apple-yellow' : 'text-gray-500'}`}>
                        Resumen
                    </button>
                    <button onClick={() => setActiveTab('analytics')} className={`py-2 px-4 font-semibold ${activeTab === 'analytics' ? 'text-apple-yellow border-b-2 border-apple-yellow' : 'text-gray-500'}`}>
                        Estadísticas
                    </button>
                    <button onClick={() => setActiveTab('log')} className={`py-2 px-4 font-semibold ${activeTab === 'log' ? 'text-apple-yellow border-b-2 border-apple-yellow' : 'text-gray-500'}`}>
                        Log de Envío
                    </button>
                </div>

                {activeTab === 'summary' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-gray-100 rounded-xl">
                            <div className="text-3xl font-bold">{campaign.contactCount}</div>
                            <div className="text-gray-500">Contactos</div>
                        </div>
                        <div className="p-4 bg-green-100 text-green-800 rounded-xl">
                            <div className="text-3xl font-bold">{campaign.sentCount}</div>
                            <div className="font-semibold">Enviados</div>
                        </div>
                        <div className="p-4 bg-red-100 text-red-800 rounded-xl">
                            <div className="text-3xl font-bold">{campaign.errorCount}</div>
                            <div className="font-semibold">Errores</div>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-xl">
                            <div className="text-lg font-bold">{new Date(campaign.sentDate).toLocaleString()}</div>
                            <div className="text-gray-500">Fecha de Inicio Envío</div>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-xl">
                            <div className="text-lg font-bold">{new Date(campaign.sentDateFinish).toLocaleString()}</div>
                            <div className="text-gray-500">Fecha de Fin Envío</div>
                        </div>
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div>
                        <div className="flex justify-end mb-6">
                            <button
                                onClick={handleDownloadPdf}
                                disabled={isDownloading}
                                className="bg-gray-800 text-white font-bold px-4 py-2 rounded-lg flex items-center shadow hover:bg-gray-700 transition disabled:opacity-50"
                            >
                                <FaDownload className="mr-2" />
                                {isDownloading ? 'Generando PDF...' : 'Descargar PDF'}
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="lg:col-span-2 p-4" ref={trendChartRef}>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Tendencia de Envío (Correos cada 5 min)</h3>
                                <SendingTrendChart campaign={campaign} />
                            </div>
                            <div className="p-4" ref={pieChartRef}>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Resultados por Mensaje</h3>
                                <MessagePieChart log={campaign.log || []} />
                            </div>
                            <div className="p-4" ref={barChartRef}>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Enviados vs. Errores</h3>
                                <StatusBarsChart sent={campaign.sentCount} errors={campaign.errorCount} />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'log' && (
                    <SendLog logEnvios={campaign.log || []} />
                )}
            </div>
        </div>
    );
};

export default CampaignDetail;