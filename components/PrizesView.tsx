
import React from 'react';
import { ArrowLeft, Trophy, Star, Gift, ShieldCheck, Zap } from 'lucide-react';

interface Props {
  onBack: () => void;
}

/**
 * Página de Prémios: Esboço detalhado do que o utilizador pode ganhar.
 */
const PrizesView: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-500 hover:text-white transition-colors uppercase font-black text-xs tracking-widest"
        >
          <ArrowLeft size={18} />
          <span>Voltar ao Início</span>
        </button>

        <div className="space-y-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
            OS NOSSOS <span className="text-yellow-500">PRÉMIOS</span>
          </h1>
          <p className="text-slate-400 text-lg">A maior recompensa para quem acredita na sorte.</p>
        </div>

        {/* Card do Grande Prémio */}
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-12 rounded-[4rem] text-slate-950 shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-16 -top-16 opacity-10 group-hover:scale-110 transition-transform duration-700">
            <Trophy size={300} />
          </div>
          
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-slate-950/20 px-4 py-1.5 rounded-full">
              <Star size={14} fill="currentColor" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Prémio Principal Semanal</span>
            </div>
            
            <h2 className="text-7xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
              100.000<br/>
              <span className="text-4xl opacity-80">KWANZAS</span>
            </h2>
            
            <p className="max-w-md font-bold text-lg leading-tight opacity-90">
              Valor líquido transferido diretamente para a conta do vencedor todos os Sábados à noite.
            </p>
          </div>
        </div>

        {/* Detalhes de Pagamento do Prémio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 p-10 rounded-[3rem] space-y-4">
            <div className="bg-slate-950 w-14 h-14 rounded-2xl flex items-center justify-center text-yellow-500 shadow-xl"><Gift size={28} /></div>
            <h3 className="text-xl font-black italic uppercase tracking-tighter">Bónus de Boas-Vindas</h3>
            <p className="text-slate-500 text-sm">Ao registar-se hoje, a sua carteira recebe automaticamente 1.000 Kz para começar a testar a sua sorte.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-10 rounded-[3rem] space-y-4">
            <div className="bg-slate-950 w-14 h-14 rounded-2xl flex items-center justify-center text-green-500 shadow-xl"><ShieldCheck size={28} /></div>
            <h3 className="text-xl font-black italic uppercase tracking-tighter">Pagamento Seguro</h3>
            <p className="text-slate-500 text-sm">Utilizamos transferências RTGS para garantir que o prémio chega à sua conta em menos de 24 horas.</p>
          </div>
        </div>

        <div className="text-center space-y-4 pt-12">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em]">Angola • 2024 • Roda da Sorte</p>
          <div className="flex justify-center space-x-2">
            <Zap className="text-yellow-500" size={16} />
            <span className="text-slate-500 italic text-sm">Milhares de kuanzas já entregues a jogadores reais!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrizesView;
