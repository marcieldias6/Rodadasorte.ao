
import React, { useState } from 'react';
import { User } from '../types';
import { ArrowUpCircle, ArrowDownCircle, Landmark, CreditCard, ChevronRight, Wallet, Info, Copy, CheckCircle2 } from 'lucide-react';

interface WalletProps {
  user: User;
  onUpdateBalance: (amount: number) => void;
}

/**
 * Gestão de Carteira Digital.
 * Atualizado com escolha entre IBAN ou Número de Conta para levantamentos.
 */
const WalletView: React.FC<WalletProps> = ({ user, onUpdateBalance }) => {
  const [tab, setTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [withdrawType, setWithdrawType] = useState<'iban' | 'account'>('iban');
  const [amount, setAmount] = useState('');
  const [iban, setIban] = useState('');
  const [accNum, setAccNum] = useState('');

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    
    if (tab === 'deposit') {
      onUpdateBalance(val);
      alert(`Depósito de ${val.toLocaleString()} Kz confirmado via rede Multicaixa (Entidade 10104)!`);
    } else {
      if (val > user.balance) return alert('Saldo insuficiente para levantamento.');
      onUpdateBalance(-val);
      alert(`Levantamento de ${val.toLocaleString()} Kz solicitado com sucesso para o ${withdrawType === 'iban' ? 'IBAN' : 'Número de Conta'} fornecido.`);
    }
    setAmount('');
  };

  const copyRef = () => {
    navigator.clipboard.writeText(user.phone);
    alert('Referência (Seu número) copiada!');
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto animate-in fade-in duration-500 pb-10">
      <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-10 rounded-[3rem] text-slate-950 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-20"><Wallet size={120} /></div>
        <div className="relative z-10">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 italic">Saldo Disponível</span>
          <h2 className="text-6xl font-black mt-2 leading-none italic">{user.balance.toLocaleString()} <span className="text-3xl font-bold">KZ</span></h2>
          <p className="mt-4 text-[10px] font-black opacity-70 uppercase tracking-widest">Protocolo Seguro de Transações</p>
        </div>
      </div>

      <div className="flex bg-slate-900 p-2 rounded-3xl border border-slate-800 shadow-xl">
        <button 
          onClick={() => setTab('deposit')}
          className={`flex-1 py-4 rounded-2xl flex items-center justify-center space-x-2 font-black text-sm transition-all uppercase tracking-tighter italic ${tab === 'deposit' ? 'bg-slate-800 text-yellow-500 shadow-lg' : 'text-slate-500'}`}
        >
          <ArrowUpCircle size={18} />
          <span>Depósito</span>
        </button>
        <button 
          onClick={() => setTab('withdraw')}
          className={`flex-1 py-4 rounded-2xl flex items-center justify-center space-x-2 font-black text-sm transition-all uppercase tracking-tighter italic ${tab === 'withdraw' ? 'bg-slate-800 text-yellow-500 shadow-lg' : 'text-slate-500'}`}
        >
          <ArrowDownCircle size={18} />
          <span>Levantamento</span>
        </button>
      </div>

      {tab === 'deposit' && (
        <div className="bg-blue-900/10 border border-blue-500/20 p-8 rounded-[3rem] space-y-6 animate-in slide-in-from-top duration-300">
          <div className="flex items-center space-x-3 text-blue-400">
            <Info size={24} />
            <h3 className="font-black text-lg uppercase italic tracking-tighter">Dados para Depósito</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center space-y-2">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Entidade</span>
              <p className="text-2xl font-black text-white">10104</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-center space-y-2">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Método</span>
              <p className="text-sm font-black text-blue-400 uppercase italic">Multicaixa / Express</p>
            </div>
          </div>

          <button 
            onClick={copyRef}
            className="w-full flex justify-between items-center bg-slate-950 p-6 rounded-2xl border border-slate-900 hover:border-blue-500/50 transition-colors group"
          >
            <div className="text-left">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Sua Referência Personalizada</p>
              <p className="text-2xl font-black text-white font-mono">{user.phone}</p>
            </div>
            <Copy className="text-slate-700 group-hover:text-blue-500 transition-colors" size={20} />
          </button>
          
          <p className="text-[9px] text-slate-600 text-center font-bold uppercase tracking-widest italic">O saldo é atualizado em tempo real após a confirmação bancária.</p>
        </div>
      )}

      <form onSubmit={handleAction} className="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 shadow-2xl space-y-8">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Valor em Kwanzas (Mín. 200 Kz)</label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600 font-black text-xl">KZ</span>
            <input 
              required
              type="number" 
              min="200"
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-6 pl-14 pr-4 text-3xl font-black text-white focus:ring-2 focus:ring-yellow-500 outline-none transition-all shadow-inner italic"
              placeholder="0.00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>
        </div>

        {tab === 'withdraw' && (
          <div className="space-y-6 animate-in slide-in-from-top duration-400">
            <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800">
              <button 
                type="button"
                onClick={() => setWithdrawType('iban')}
                className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase transition-all flex items-center justify-center space-x-2 ${withdrawType === 'iban' ? 'bg-slate-800 text-yellow-500' : 'text-slate-500'}`}
              >
                <Landmark size={14} />
                <span>Usar IBAN</span>
              </button>
              <button 
                type="button"
                onClick={() => setWithdrawType('account')}
                className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase transition-all flex items-center justify-center space-x-2 ${withdrawType === 'account' ? 'bg-slate-800 text-yellow-500' : 'text-slate-500'}`}
              >
                <CreditCard size={14} />
                <span>Nº de Conta</span>
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                {withdrawType === 'iban' ? 'IBAN Angolano (21 dígitos)' : 'Número de Conta Bancária'}
              </label>
              <div className="relative">
                {withdrawType === 'iban' ? <Landmark className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={20} /> : <CreditCard className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={20} />}
                <input 
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-5 pl-14 pr-4 text-white font-mono tracking-widest text-sm outline-none focus:ring-1 focus:ring-yellow-500"
                  placeholder={withdrawType === 'iban' ? "AO06 0000 0000 ...." : "123456789"}
                  value={withdrawType === 'iban' ? iban : accNum}
                  onChange={e => withdrawType === 'iban' ? setIban(e.target.value) : setAccNum(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        <button type="submit" className="w-full bg-white hover:bg-yellow-500 text-slate-950 font-black py-6 rounded-3xl transition-all shadow-xl flex items-center justify-center space-x-3 text-lg uppercase tracking-tighter italic group">
          <span>{tab === 'deposit' ? 'CONFIRMAR DEPÓSITO' : 'PEDIR LEVANTAMENTO'}</span>
          <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
};

export default WalletView;
