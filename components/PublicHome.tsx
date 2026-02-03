
import React from 'react';
import { Trophy, Star, Zap, ShieldCheck, CreditCard, ChevronRight, Menu, Phone } from 'lucide-react';

interface PublicHomeProps {
  onStart: () => void;
  onHowItWorks: () => void;
  onPrizes: () => void;
}

/**
 * Componente de Página Inicial Pública.
 * Apresenta a marca, menus e propagandas antes do utilizador entrar no sistema.
 */
const PublicHome: React.FC<PublicHomeProps> = ({ onStart, onHowItWorks, onPrizes }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Navegação Superior Pública */}
      <nav className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-[100]">
        <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Trophy className="text-yellow-500 w-8 h-8" />
            <span className="font-black text-2xl tracking-tighter uppercase italic">
              RODA DA <span className="text-yellow-500">SORTE</span>
            </span>
          </div>

          {/* Menus Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => window.scrollTo(0, 0)} className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Início</button>
            <button onClick={onHowItWorks} className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Como Funciona</button>
            <button onClick={onPrizes} className="text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Prémios</button>
            <button 
              onClick={onStart}
              className="bg-yellow-500 text-slate-950 px-6 py-2.5 rounded-xl font-black text-sm uppercase tracking-tighter hover:bg-white transition-all active:scale-95"
            >
              Entrar / Registar
            </button>
          </div>

          <button className="md:hidden text-slate-400"><Menu size={28} /></button>
        </div>
      </nav>

      {/* Hero Section (Propaganda Principal) */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-yellow-500/5 blur-[120px] rounded-full -z-10"></div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-yellow-500/10 text-yellow-500 px-4 py-1.5 rounded-full border border-yellow-500/20">
              <Zap size={14} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">O maior sorteio digital de Angola</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter uppercase italic">
              A SUA SORTE<br/>
              ESTÁ <span className="text-yellow-500">AQUI!</span>
            </h1>

            <p className="text-slate-400 text-xl font-medium max-w-lg mx-auto lg:mx-0">
              Participe todas as semanas e ganhe prémios garantidos de 100.000 Kz. Transparente, seguro e 100% automático.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={onStart}
                className="w-full sm:w-auto px-10 py-5 bg-yellow-500 text-slate-950 rounded-3xl font-black text-xl flex items-center justify-center space-x-3 hover:bg-white transition-all shadow-2xl shadow-yellow-500/20 active:scale-95"
              >
                <span>CRIAR CONTA GRÁTIS</span>
                <ChevronRight size={24} />
              </button>
              <div className="flex items-center space-x-3 text-slate-500">
                <ShieldCheck size={20} className="text-green-500" />
                <span className="text-xs font-bold uppercase tracking-widest">Acesso Seguro</span>
              </div>
            </div>
          </div>

          {/* Visual Propaganda */}
          <div className="relative group">
            <div className="absolute inset-0 bg-yellow-500/10 rounded-[4rem] rotate-3 -z-10 transition-transform group-hover:rotate-6"></div>
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-[4rem] shadow-2xl space-y-6">
              <div className="aspect-square bg-slate-950 rounded-[3rem] border border-slate-800 flex items-center justify-center overflow-hidden relative">
                <Star className="text-yellow-500/10 absolute scale-[3]" size={100} />
                <div className="text-center space-y-4 relative z-10">
                  <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">Próximo Sorteio</p>
                  <p className="text-5xl font-black text-white italic tracking-tighter">SÁBADO 20H</p>
                  <div className="bg-yellow-500 text-slate-950 px-6 py-2 rounded-2xl font-black text-2xl">
                    100.000 KZ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secção de Vantagens (Propaganda Secundária) */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-900 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">Porquê a <span className="text-yellow-500">Roda da Sorte?</span></h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Simplicidade e Confiança</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-950 p-10 rounded-[3rem] border border-slate-800 space-y-6">
              <div className="bg-yellow-500/10 w-16 h-16 rounded-2xl flex items-center justify-center text-yellow-500"><Zap size={32} /></div>
              <h3 className="text-white font-black text-xl uppercase tracking-tighter italic">Entrada Rápida</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Crie conta em 30 segundos. Com apenas 200 Kz o seu nome entra na roda para ganhar.</p>
            </div>
            <div className="bg-slate-950 p-10 rounded-[3rem] border border-slate-800 space-y-6">
              <div className="bg-green-500/10 w-16 h-16 rounded-2xl flex items-center justify-center text-green-500"><CreditCard size={32} /></div>
              <h3 className="text-white font-black text-xl uppercase tracking-tighter italic">Pagamento Fácil</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Depósitos e levantamentos via IBAN ou Conta Bancária em todos os bancos de Angola.</p>
            </div>
            <div className="bg-slate-950 p-10 rounded-[3rem] border border-slate-800 space-y-6">
              <div className="bg-blue-500/10 w-16 h-16 rounded-2xl flex items-center justify-center text-blue-500"><ShieldCheck size={32} /></div>
              <h3 className="text-white font-black text-xl uppercase tracking-tighter italic">100% Automático</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Ninguém mexe na roda. O sistema inteligente realiza o sorteio sozinho aos Sábados.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Público */}
      <footer className="py-12 px-6 border-t border-slate-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-2">
            <Trophy className="text-yellow-500 w-6 h-6" />
            <span className="font-black text-lg tracking-tighter uppercase italic">RODA DA SORTE</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-slate-600 hover:text-white transition-colors"><Phone size={20} /></a>
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">© 2024 • ANGOLA • JOGO RESPONSÁVEL (+18)</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicHome;
