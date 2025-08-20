import { CLIENTS_DATA } from '../../data/clients'; // 1. Importa los datos centralizados

const CampaignSettings = ({ payload, setPayload }) => {

    const handleConfigChange = (config) => {
        setPayload(prev => ({
            ...prev,
            from: config.from,
            reply_to: config.reply_to,
        }));
    };

    const formatBalance = (balance) => {
        if (typeof balance === 'number') {
            return ` - Saldo: ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(balance)}`;
        }
        return ` - Saldo: ${balance}`;
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">1. Cliente de Envío</h2>
            <div>
                <label className="block text-gray-700 font-medium mb-2">Selecciona un cliente</label>
                 <div className="flex flex-col space-y-2">
                     {CLIENTS_DATA.map(client => (
                         <label key={client.id} className="inline-flex items-center p-4 rounded-xl border border-gray-300 cursor-pointer hover:bg-gray-50 transition duration-150">
                             <input
                                type="radio"
                                name="configuracion"
                                value={client.id}
                                className="h-5 w-5 text-apple-yellow accent-apple-yellow focus:ring-2 focus:ring-offset-2 focus:ring-apple-yellow"
                                onChange={() => handleConfigChange(client)}
                             />
                             <span className="ml-3 text-gray-700">
                                <span className="font-medium">{client.name}</span>
                                <span className="text-sm text-green-600">{formatBalance(client.saldo)}</span>
                             </span>
                         </label>
                     ))}
                 </div>
            </div>
        </div>
    );
};

export default CampaignSettings;