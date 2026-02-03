
import React, { useState } from 'react';
import { User as UserIcon, Trophy, Phone, Lock, ShieldCheck, ArrowRight, UserPlus, ArrowLeft } from 'lucide-react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  onBack: () => void;
}

/**
 * Componente de Autenticação Seguro.
 * Gere Login, Registo e Verificação OTP com persistência no LocalStorage.
 */
const Login: React.FC<LoginProps> = ({ onLogin, onBack }) => {
  // Controle de fluxo: autenticação inicial ou código SMS
  const [step, setStep] = useState<'auth' | 'otp'>('auth');
  const [isRegister, setIsRegister] = useState(false);
  
  // Campos do formulário
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');

  /**
   * Simulação de Criptografia de Dados para Proteção de Privacidade.
   */
  const encryptData = (data: string) => btoa(`RODA_SORTE_SECURE_${data}`);

  /**
   * Valida o Login ou solicita o código de registo.
   */
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Busca utilizadores registados (Base de Dados Local)
    const savedUsersStr = localStorage.getItem('roda_sorte_users');
    const allUsers: User[] = savedUsersStr ? JSON.parse(savedUsersStr) : [];

    if (isRegister) {
      // Validações de novo registo
      if (allUsers.find(u => u.phone === phone)) {
        setError('Este número já tem uma conta ativa no sistema.');
        return;
      }
      if (password !== confirmPassword) {
        setError('As senhas digitadas não são iguais.');
        return;
      }
      if (password.length < 6) {
        setError('A senha deve ter no mínimo 6 dígitos para sua segurança.');
        return;
      }
      // Se ok, vai para a verificação por SMS (OTP)
      setStep('otp');
    } else {
      // Validação de Login Real
      const userFound = allUsers.find(u => u.phone === phone);
      
      // Se não criou conta, o sistema rejeita o login
      if (!userFound) {
        setError('Conta inexistente. Registe-se primeiro na plataforma.');
        return;
      }

      // Verifica se a senha criptografada coincide
      const encryptedAttempt = encryptData(password);
      if (userFound.password !== encryptedAttempt) {
        setError('Senha incorreta. Por favor, tente novamente.');
        return;
      }

      // Login autorizado
      onLogin(userFound);
    }
  };

  /**
   * Conclui o registo e salva os dados permanentemente.
   */
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    
    // Código padrão para testes: 1234
    if (fullOtp === '1234') { 
      const encryptedPass = encryptData(password);
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: name,
        phone: phone,
        password: encryptedPass,
        balance: 1000, // Prémio de boas-vindas
        ticketsThisWeek: 0,
        isVerified: true
      };

      // Adiciona o novo utilizador à lista global permanente
      const savedUsersStr = localStorage.getItem('roda_sorte_users');
      const allUsers: User[] = savedUsersStr ? JSON.parse(savedUsersStr) : [];
      localStorage.setItem('roda_sorte_users', JSON.stringify([...allUsers, newUser]));

      onLogin(newUser);
    } else {
      setError('Código OTP incorreto. Use o código padrão 1234.');
    }
  };

  /**
   * Navegação entre campos do código OTP.
   */
  const handleOtpChange = (val: string, index: number) => {
    if (isNaN(Number(val))) return;
    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);
    
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Ecrã de Verificação SMS
  if (step === 'otp') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 animate-in fade-in duration-500">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-yellow-500 p-5 rounded-3xl shadow-2xl shadow-yellow-500/20">
              <ShieldCheck className="text-slate-950 w-12 h-12" />
            </div>
            <h2 className="text-3xl font-black text-white italic uppercase">Verificar Número</h2>
            <p className="text-slate-400 text-sm">Insira o código de 4 dígitos enviado para <span className="text-white font-bold">{phone}</span></p>
          </div>

          <form onSubmit={handleOtpSubmit} className="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 shadow-2xl space-y-8">
            <div className="flex justify-center space-x-3">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  className="w-14 h-16 bg-slate-950 border-2 border-slate-800 rounded-2xl text-center text-2xl font-black text-yellow-500 focus:border-yellow-500 outline-none transition-all shadow-inner"
                />
              ))}
            </div>

            {error && <p className="text-red-500 text-xs font-bold uppercase tracking-widest">{error}</p>}

            <button 
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black py-5 rounded-2xl transition-all shadow-xl active:scale-95 text-lg"
            >
              VALIDAR CONTA
            </button>
            
            <button 
              type="button"
              onClick={() => setStep('auth')}
              className="text-slate-500 text-[10px] font-black uppercase hover:text-white tracking-widest"
            >
              Voltar aos dados iniciais
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Ecrã de Acesso (Login / Registo)
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 relative">
      {/* Botão para voltar à Landing Page Pública */}
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center space-x-2 text-slate-500 hover:text-white transition-colors uppercase font-black text-xs tracking-widest"
      >
        <ArrowLeft size={18} />
        <span>Voltar</span>
      </button>

      <div className="w-full max-w-md space-y-10 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-yellow-500 p-5 rounded-[2.5rem] rotate-12 shadow-2xl shadow-yellow-500/30">
            <Trophy className="text-slate-950 w-12 h-12" />
          </div>
          <div className="space-y-1">
            <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase">
              RODA DA <span className="text-yellow-500">SORTE</span>
            </h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">Acesso Restrito & Criptografado</p>
          </div>
        </div>

        <form onSubmit={handleAuthSubmit} className="bg-slate-900 p-8 rounded-[3rem] border border-slate-800 shadow-2xl space-y-5 text-left relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-yellow-500"></div>
          
          {isRegister && (
            <div className="space-y-1.5 animate-in slide-in-from-top duration-300">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Seu Nome Completo</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input 
                  required
                  type="text" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                  placeholder="Ex: João da Silva"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nº Telemóvel</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
              <input 
                required
                type="tel" 
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-yellow-500 outline-none transition-all font-mono"
                placeholder="9XX XXX XXX"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Senha Pessoal</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
              <input 
                required
                type="password" 
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                placeholder="******"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          {isRegister && (
            <div className="space-y-1.5 animate-in slide-in-from-top duration-300">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Confirmar Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                <input 
                  required
                  type="password" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                  placeholder="******"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          )}

          {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest ml-1 animate-pulse">{error}</p>}

          <button 
            type="submit" 
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black py-5 rounded-2xl transition-all shadow-xl active:scale-95 text-lg flex items-center justify-center space-x-2 uppercase tracking-tighter italic"
          >
            <span>{isRegister ? 'Criar Minha Conta' : 'Aceder ao Sistema'}</span>
            {isRegister ? <UserPlus size={20} /> : <ArrowRight size={20} />}
          </button>

          <button 
            type="button"
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
            className="w-full text-slate-500 text-[10px] font-black hover:text-white transition-colors pt-2 uppercase tracking-[0.2em]"
          >
            {isRegister ? 'Já sou um jogador registado' : 'Não tem conta? Registe-se aqui'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
