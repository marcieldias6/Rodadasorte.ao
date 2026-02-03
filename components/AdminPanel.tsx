
import React from 'react';
import { Participant, ParticipantStatus } from '../types';
import { CheckCircle, XCircle, Trash2, Clock, Phone } from 'lucide-react';

interface AdminPanelProps {
  participants: Participant[];
  onVerify: (id: string) => void;
  onDelete: (id: string) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ participants, onVerify, onDelete }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Lista Digital de Participantes</h2>
          <p className="text-slate-400">Apenas participantes com status "Verificado" aparecem na roda.</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex space-x-8">
          <div className="text-center">
            <p className="text-xs uppercase text-slate-500 font-semibold">Total</p>
            <p className="text-2xl font-bold text-white">{participants.length}</p>
          </div>
          <div className="text-center">
            <p className="text-xs uppercase text-slate-500 font-semibold">Verificados</p>
            <p className="text-2xl font-bold text-green-500">{participants.filter(p => p.status === ParticipantStatus.VERIFIED).length}</p>
          </div>
          <div className="text-center">
            <p className="text-xs uppercase text-slate-500 font-semibold">Pendentes</p>
            <p className="text-2xl font-bold text-yellow-500">{participants.filter(p => p.status === ParticipantStatus.PENDING).length}</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-300">Participante</th>
              <th className="px-6 py-4 font-semibold text-slate-300">Contacto</th>
              <th className="px-6 py-4 font-semibold text-slate-300">Tickets</th>
              <th className="px-6 py-4 font-semibold text-slate-300">Status</th>
              <th className="px-6 py-4 font-semibold text-slate-300 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {participants.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">Nenhum registo encontrado.</td>
              </tr>
            ) : (
              participants.map((p) => (
                <tr key={p.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{p.name}</div>
                    <div className="text-xs text-slate-500 flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{p.registrationDate.toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300 font-mono">
                    <div className="flex items-center space-x-2">
                      <Phone size={14} className="text-slate-500" />
                      <span>{p.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-900/40 text-blue-400 border border-blue-500/30 rounded text-sm font-bold">
                      {p.tickets}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {p.status === ParticipantStatus.VERIFIED ? (
                      <span className="flex items-center space-x-1 text-green-500 text-sm font-medium">
                        <CheckCircle size={16} />
                        <span>Verificado</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1 text-yellow-500 text-sm font-medium">
                        <Clock size={16} />
                        <span>Pendente</span>
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {p.status === ParticipantStatus.PENDING && (
                      <button 
                        onClick={() => onVerify(p.id)}
                        className="p-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
                        title="Verificar Pagamento"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}
                    <button 
                      onClick={() => onDelete(p.id)}
                      className="p-2 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
