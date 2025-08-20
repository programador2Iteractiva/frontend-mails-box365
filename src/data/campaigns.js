export const DUMMY_CAMPAIGNS = [
    {
        id: 1,
        name: "Campaña de Verano (Ejemplo)",
        date: new Date('2024-07-15T10:00:00Z').toISOString(),
        contactCount: 150,
        payload: {
            name: "Campaña de Verano (Ejemplo)",
            subject: "¡Ofertas exclusivas para ti!",
            from: "ventas@empresa.com",
            reply_to: "soporte@empresa.com",
        },
        template: 'text-image',
        body: 'Aprovecha nuestros descuentos de hasta el 50009000% en productos seleccionados.',
        imageUrl: 'https://novonordisk.interactiva.com.co/wp-content/uploads/2025/08/Biomarin.png',
        imageLink: '#',
        emailList: Array.from({ length: 150 }, (_, i) => `contacto${i + 1}@ejemplo.com`),
        availableVars: ['correos', 'nombre'],
    }
];