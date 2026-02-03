
import React from 'react';
import { ArrowLeft, Zap, ShieldCheck, Trophy, Calendar, Ticket, Landmark, Target } from 'lucide-react';

interface Props {
  onBack: () => void;
}

/**
 * Página Informativa: Como Funciona o Sorteio.
 * Detalha as regras específicas de Angola.
 */
const HowItWorksView: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans px-6 py-12 pb-32">
      <div className="max-w-4xl mx-auto space-y-12">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-500 hover:text-white transition-colors uppercase font-black text-xs tracking-[0.3em] italic"
        >
          <ArrowLeft size={18} />
          <span>Sair da Ajuda</span>
        </button>

        <div className="space-y-4 text-center">
          <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
            GUIA DO <span className="text-yellow-500">JOGADOR</span>
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Entenda cada passo para ganhar 100.000 Kz</p>
        </div>

        <div className="grid gap-10">
          {[
            { 
              icon: <Zap className="text-yellow-500" />, 
              title: "1. Registo Obrigatório", 
              desc: "Crie a sua conta usando o seu número de telemóvel angolano. O sistema guarda os seus dados permanentemente para futuros acessos." 
            },
            { 
              icon: <Landmark className="text-blue-500" />, 
              title: "2. Carregamento de Saldo", 
              desc: "No menu Carteira, use a Entidade 10104 e o seu número de telefone como Referência no Multicaixa ou Express. Cada entrada custa 200 Kz." 
            },
            { 
              icon: <Target className="text-red-500" />, 
              title: "3. Entrada na Roda", 
              desc: "Clique em 'Entrar na Roda'. O seu nome será adicionado à lista oficial. O limite é de 2 participações por semana para garantir chances iguais." 
            },
            { 
              icon: <Calendar className="text-purple-500" />, 
              title: "4. Sorteio Automático", 
              desc: "Todos os Sábados às 20:00, a nossa Roda Digital gira sozinha. O sistema escolhe um vencedor de forma aleatória e auditável." 
            },
            { 
              icon: <Trophy className="text-yellow-500" />, 
              title: "5. Pagamento do Prémio", 
              desc: "O vencedor recebe 100.000 Kz. O valor é enviado para o IBAN ou Número de Conta que o utilizador escolheu na sua área pessoal." 
            }
          ].map((item, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800 p-10 rounded-[4rem] flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10 hover:border-yellow-500/20 transition-all group">
              <div className="bg-slate-950 p-6 rounded-[2rem] shadow-2xl group-hover:scale-110 transition-transform">{item.icon}</div>
              <div className="space-y-3 text-center md:text-left">
                <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-tight">{item.title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20 p-10 rounded-[4rem] text-center space-y-4">
          <ShieldCheck className="text-yellow-500 mx-auto" size={48} />
          <h4 className="text-xl font-black uppercase italic tracking-tighter">Transparência Total</h4>
          <p className="text-slate-400 italic">Os resultados de cada Sábado são públicos e podem ser verificados por qualquer participante através da lista digital de ganhadores.</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksView;
