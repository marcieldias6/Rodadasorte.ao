
import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Wallet, 
  LogOut, 
  LayoutDashboard,
  PlayCircle,
  HelpCircle,
  Gift
} from 'lucide-react';
import { User, DrawParticipant } from './types';
import Login from './components/Login';
import WalletView from './components/WalletView';
import ParticipateView from './components/ParticipateView';
import WheelSpinner from './components/WheelSpinner';
import PublicHome from './components/PublicHome';
import HowItWorksView from './components/HowItWorksView';
import PrizesView from './components/PrizesView';

/**
 * Componente Raiz da Aplicação Roda da Sorte.
 * Gere o estado global de autenticação, navegação e persistência.
 */
const App: React.FC = () => {
  // Estado para o utilizador autenticado
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Controle de visualização ampliado para as novas secções
  const [view, setView] = useState<'public' | 'home' | 'wallet' | 'draw' | 'login' | 'how-it-works' | 'prizes'>('public');
  
  // Lista de participantes ativos no sorteio atual
  const [participants, setParticipants] = useState<DrawParticipant[]>([]);

  /**
   * Efeito Inicial: Carrega dados persistentes do navegador.
   */
  useEffect(() => {
    // Verifica se existe uma sessão ativa salva
    const activeSession = localStorage.getItem('roda_sorte_session');
    if (activeSession) {
      setCurrentUser(JSON.parse(activeSession));
      setView('home'); // Se logado, vai para o dashboard
    }

    // Carrega a lista de participantes inscritos para o sorteio semanal
    const savedParticipants = localStorage.getItem('roda_sorte_participants');
    if (savedParticipants) {
      setParticipants(JSON.parse(savedParticipants));
    }
  }, []);

  /**
   * Função para processar o Login/Registo com sucesso.
   */
  const handleLogin = (userData: User) => {
    setCurrentUser(userData);
    localStorage.setItem('roda_sorte_session', JSON.stringify(userData));
    setView('home');
  };

  /**
   * Função de Logout: Limpa a sessão e redireciona para a página inicial pública.
   */
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('roda_sorte_session');
    setView('public'); 
  };

  /**
   * Atualiza o saldo do utilizador e sincroniza com a base de dados local.
   */
  const updateBalance = (amount: number) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, balance: currentUser.balance + amount };
    setCurrentUser(updatedUser);
    
    localStorage.setItem('roda_sorte_session', JSON.stringify(updatedUser));
    
    const allUsers = JSON.parse(localStorage.getItem('roda_sorte_users') || '[]');
    const updatedAllUsers = allUsers.map((u: User) => u.id === updatedUser.id ? updatedUser : u);
    localStorage.setItem('roda_sorte_users', JSON.stringify(updatedAllUsers));
  };

  /**
   * Lógica de participação no sorteio.
   */
  const handleParticipate = () => {
    if (!currentUser || currentUser.balance < 200 || currentUser.ticketsThisWeek >= 2) return;
    
    const newParticipant: DrawParticipant = {
      userId: currentUser.id,
      name: currentUser.name,
      timestamp: Date.now()
    };

    const updatedParticipants = [...participants, newParticipant];
    setParticipants(updatedParticipants);
    localStorage.setItem('roda_sorte_participants', JSON.stringify(updatedParticipants));

    const updatedUser = {
      ...currentUser,
      balance: currentUser.balance - 200,
      ticketsThisWeek: currentUser.ticketsThisWeek + 1
    };
    
    setCurrentUser(updatedUser);
    localStorage.setItem('roda_sorte_session', JSON.stringify(updatedUser));

    const allUsers = JSON.parse(localStorage.getItem('roda_sorte_users') || '[]');
    const updatedAllUsers = allUsers.map((u: User) => u.id === updatedUser.id ? updatedUser : u);
    localStorage.setItem('roda_sorte_users', JSON.stringify(updatedAllUsers));
  };

  /**
   * RENDERIZAÇÃO PÚBLICA (Landing Page e Páginas de Informação)
   */
  if (!currentUser && (view === 'public' || view === 'how-it-works' || view === 'prizes')) {
    if (view === 'how-it-works') return <HowItWorksView onBack={() => setView('public')} />;
    if (view === 'prizes') return <PrizesView onBack={() => setView('public')} />;
    
    return (
      <PublicHome 
        onStart={() => setView('login')} 
        onHowItWorks={() => setView('how-it-works')} 
        onPrizes={() => setView('prizes')} 
      />
    );
  }

  /**
   * Ecrã de Login/Registo
   */
  if (!currentUser) {
    return <Login onLogin={handleLogin} onBack={() => setView('public')} />;
  }

  /**
   * INTERFACE PRIVADA (DASHBOARD)
   */
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-yellow-500 p-1.5 rounded-lg">
              <Trophy className="text-slate-900 w-5 h-5" />
            </div>
            <span className="font-black text-xl tracking-tighter text-white uppercase italic">
              RODA DA <span className="text-yellow-500">SORTE</span>
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Saldo</span>
              <span className="text-yellow-500 font-black text-lg">{currentUser.balance.toLocaleString()} Kz</span>
            </div>
            <button 
              onClick={handleLogout} 
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-all border border-transparent hover:border-red-500/20"
            >
              <span className="text-xs font-bold uppercase hidden sm:inline">Sair</span>
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-6xl mx-auto px-4 py-8 w-full pb-24">
        {view === 'home' && (
          <ParticipateView 
            user={currentUser} 
            onParticipate={handleParticipate} 
            participantCount={participants.length}
          />
        )}
        {view === 'wallet' && (
          <WalletView user={currentUser} onUpdateBalance={updateBalance} />
        )}
        {view === 'draw' && (
          <div className="space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Sorteio Semanal</h2>
              <p className="text-slate-400">Assista ao sistema girar a roda automaticamente.</p>
            </div>
            <WheelSpinner participants={participants} />
          </div>
        )}
      </main>

      {/* Navegação Inferior (App Style) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 px-6 py-3 flex justify-around items-center z-50">
        <button 
          onClick={() => setView('home')}
          className={`flex flex-col items-center space-y-1 ${view === 'home' ? 'text-yellow-500' : 'text-slate-50'}`}
        >
          <LayoutDashboard size={22} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Painel</span>
        </button>
        <button 
          onClick={() => setView('draw')}
          className={`flex flex-col items-center space-y-1 -mt-8 bg-slate-950 p-4 rounded-full border-4 border-slate-900 shadow-xl ${view === 'draw' ? 'text-yellow-500' : 'text-slate-500'}`}
        >
          <PlayCircle size={32} />
        </button>
        <button 
          onClick={() => setView('wallet')}
          className={`flex flex-col items-center space-y-1 ${view === 'wallet' ? 'text-yellow-500' : 'text-slate-50'}`}
        >
          <Wallet size={22} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Carteira</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
