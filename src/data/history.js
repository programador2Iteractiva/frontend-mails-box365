export const DUMMY_HISTORY = [
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
        ],
        payload: { name: "Lanzamiento de Producto (Historial)", subject: "Conoce lo nuevo" },
    }
];