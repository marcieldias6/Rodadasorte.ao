
import React, { useState } from 'react';
import { PlusCircle, Wallet, Calendar, ShieldCheck, CheckCircle, Info } from 'lucide-react';

interface UserInterfaceProps {
  onParticipate: (name: string, phone: string, tickets: number) => void;
}

const UserInterface: React.FC<UserInterfaceProps> = ({ onParticipate }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', tickets: 1 });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    onParticipate(formData.name, formData.phone, formData.tickets);
    setFormData({ name: '', phone: '', tickets: 1 });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Information & Rules */}
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold text-white leading-tight">
            Ganhe até <span className="text-yellow-500">150.000 Kz</span> todos os fins de semana!
          </h1>
          <p className="text-xl text-slate-400">
            A sua sorte está a apenas um clique. Participe no sorteio digital mais transparente de Angola.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
            <Wallet className="w-10 h-10 text-yellow-500 mb-4" />
            <h3 className="text-lg font-bold text-white">Investimento</h3>
            <p className="text-slate-400">Apenas 200 Kz por participação. Pagamento antecipado.</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
            <Calendar className="w-10 h-10 text-blue-500 mb-4" />
            <h3 className="text-lg font-bold text-white">Sorteio Semanal</h3>
            <p className="text-slate-400">Todos os Sábados às 20:00 via Roda Digital.</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
            <ShieldCheck className="w-10 h-10 text-green-500 mb-4" />
            <h3 className="text-lg font-bold text-white">Transparência</h3>
            <p className="text-slate-400">Sorteio ao vivo e gravado. Vencedor recebe no dia.</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
            <PlusCircle className="w-10 h-10 text-purple-500 mb-4" />
            <h3 className="text-lg font-bold text-white">Max. Participações</h3>
            <p className="text-slate-400">Pode participar até 2 vezes por semana.</p>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-2xl space-y-3">
          <div className="flex items-center space-x-2 text-yellow-500 font-bold">
            <Info size={20} />
            <span>Regras Importantes</span>
          </div>
          <ul className="list-disc list-inside text-slate-300 space-y-1 text-sm">
            <li>Cada 200 Kz equivale a 1 nome na roda.</li>
            <li>O vencedor da semana ganha o prémio fixo de 100.000 Kz.</li>
            <li>Só participam na roda nomes com "visto" da administração.</li>
          </ul>
        </div>
      </div>

      {/* Registration Form */}
      <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl space-y-6 self-start sticky top-24">
        <h2 className="text-2xl font-bold text-white">Participar Agora</h2>
        
        {showSuccess && (
          <div className="bg-green-500/20 border border-green-500/50 p-4 rounded-xl flex items-center space-x-3 text-green-400 animate-in slide-in-from-top duration-300">
            <CheckCircle />
            <span>Inscrição enviada! Aguarde a verificação do pagamento.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Nome Completo</label>
            <input 
              required
              type="text" 
              placeholder="Digite seu nome" 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Número de Telefone (Unitel/Movicel)</label>
            <input 
              required
              type="tel" 
              placeholder="Ex: 923 000 000" 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Quantidade de Participações</label>
            <div className="flex space-x-4">
              {[1, 2].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setFormData({ ...formData, tickets: num })}
                  className={`flex-1 py-3 rounded-xl border font-bold transition-all ${
                    formData.tickets === num 
                    ? 'bg-yellow-500 border-yellow-500 text-slate-900' 
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  {num} {num === 1 ? 'Vez' : 'Vezes'}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-1">Total a pagar: {formData.tickets * 200} Kz</p>
          </div>

          <button 
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-extrabold py-4 rounded-xl text-lg transition-all shadow-lg active:scale-95 flex items-center justify-center space-x-2"
          >
            <span>CONFIRMAR INSCRIÇÃO</span>
            <Wallet size={20} />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-700 text-center">
          <p className="text-xs text-slate-500">
            Após confirmar, envie o comprovativo para o WhatsApp oficial da Loto Nacional para receber o seu "visto".
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInterface;
