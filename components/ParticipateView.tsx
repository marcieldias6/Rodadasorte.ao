
import React from 'react';
import { User } from '../types';
import { Ticket, Calendar, ShieldCheck, Zap, Star, ShieldAlert } from 'lucide-react';

interface ParticipateProps {
  user: User;
  onParticipate: () => void;
  participantCount: number;
}

const ParticipateView: React.FC<ParticipateProps> = ({ user, onParticipate, participantCount }) => {
  // Regra de negócio: Precisa de 200 Kz de saldo e máximo de 2 participações por semana
  const canParticipate = user.balance >= 200 && user.ticketsThisWeek < 2;

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Banner de Destaque do Sorteio */}
      <div className="bg-slate-900 border border-slate-800 p-10 md:p-14 rounded-[4rem] shadow-2xl relative overflow-hidden group">
        {/* Elementos decorativos animados */}
        <div className="absolute -top-32 -right-32 p-12 opacity-[0.03] group-hover:scale-125 transition-transform duration-1000 text-yellow-500 pointer-events-none">
          <Star size={450} />
        </div>
        
        <div className="relative z-10 space-y-8">
          <div className="inline-flex items-center space-x-3 bg-yellow-500/10 text-yellow-500 px-5 py-2 rounded-full border border-yellow-500/20">
            <Zap size={16} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Sorteio Automático • Sábado 20h00</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.85] italic uppercase tracking-tighter">
              RODA DA<br/>
              <span className="text-yellow-500">SORTE</span>
            </h1>
            <p className="text-slate-400 text-xl font-medium max-w-md mt-4">
              A maior loto digital de Angola. Participe com apenas 200 Kz e mude a sua sorte hoje!
            </p>
          </div>

          <div className="flex flex-col space-y-2 bg-slate-950/40 p-6 rounded-3xl border border-white/5 inline-block">
            <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Grande Prémio da Semana</p>
            <p className="text-5xl font-black text-white italic tracking-tighter">100.000 <span className="text-2xl text-yellow-500">KZ</span></p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-6">
            <button 
              disabled={!canParticipate}
              onClick={onParticipate}
              className={`px-14 py-6 rounded-[2.5rem] font-black text-2xl transition-all shadow-2xl active:scale-90 flex items-center justify-center space-x-4 uppercase italic tracking-tighter ${canParticipate ? 'bg-yellow-500 text-slate-950 hover:bg-white hover:shadow-yellow-500/40' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}
            >
              <span>Entrar na Roda</span>
              <Ticket size={32} />
            </button>
            
            {/* Indicador de Participações Semanais */}
            <div className="flex items-center space-x-5 px-10 py-6 bg-slate-950/80 rounded-[2.5rem] border border-slate-800 shadow-inner">
              <div className="relative">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl transition-colors ${user.ticketsThisWeek === 2 ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                  {user.ticketsThisWeek}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Bilhetes Usados</span>
                <span className="text-white font-black text-sm uppercase">Limite: 2 / Semana</span>
              </div>
            </div>
          </div>

          {/* Aviso de Limite Atingido */}
          {!canParticipate && user.ticketsThisWeek >= 2 && (
            <div className="bg-red-500/10 border border-red-500/20 px-6 py-3 rounded-2xl inline-flex items-center space-x-3 animate-bounce">
              <ShieldAlert className="text-red-500" size={18} />
              <p className="text-red-400 text-[10px] font-black uppercase tracking-widest">Atingiu o limite de 2 participações para o sorteio deste Sábado!</p>
            </div>
          )}
        </div>
      </div>

      {/* Grelha Informativa de Regras */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 space-y-5 hover:border-yellow-500/30 transition-all shadow-xl">
          <div className="bg-yellow-500/10 w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-yellow-500"><Calendar size={32} /></div>
          <h3 className="text-white font-black text-xl uppercase tracking-tighter italic">Sorteio Pontual</h3>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">Todos os Sábados às 20h00 em ponto. O sistema sorteia de forma automática e imparcial.</p>
        </div>
        <div className="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 space-y-5 hover:border-green-500/30 transition-all shadow-xl">
          <div className="bg-green-500/10 w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-green-500"><ShieldCheck size={32} /></div>
          <h3 className="text-white font-black text-xl uppercase tracking-tighter italic">Visto Imediato</h3>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">Cada 200 Kz investidos colocam o seu nome instantaneamente na lista oficial da roda.</p>
        </div>
        <div className="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 space-y-5 hover:border-purple-500/30 transition-all shadow-xl">
          <div className="bg-purple-500/10 w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-purple-500"><Zap size={32} /></div>
          <h3 className="text-white font-black text-xl uppercase tracking-tighter italic">Lista Aberta</h3>
          <p className="text-slate-500 text-sm leading-relaxed font-medium">Atualmente existem <span className="text-white font-black">{participantCount}</span> nomes na Roda da Sorte para este Sábado.</p>
        </div>
      </div>
    </div>
  );
};

export default ParticipateView;
