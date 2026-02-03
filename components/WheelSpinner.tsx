
import React, { useState, useEffect, useCallback } from 'react';
import { DrawParticipant } from '../types';
import { Trophy, Star, Clock } from 'lucide-react';

interface WheelProps {
  participants: DrawParticipant[];
}

/**
 * Componente da Roda da Sorte Visual.
 * Segue o padrão de cores: Azul, Amarelo, Verde e Branco.
 * Nomes em Preto e Negrito.
 */
const WheelSpinner: React.FC<WheelProps> = ({ participants }) => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<DrawParticipant | null>(null);
  const [timeLeft, setTimeLeft] = useState<{h: number, m: number, s: number}>({h:0, m:0, s:0});
  const [isDrawTime, setIsDrawTime] = useState(false);

  // Cores baseadas na imagem enviada pelo utilizador
  const colors = ['#3b82f6', '#eab308', '#22c55e', '#ffffff'];

  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const result = new Date();
    result.setDate(now.getDate() + (6 + 7 - now.getDay()) % 7);
    result.setHours(20, 0, 0, 0);
    if (now > result) result.setDate(result.getDate() + 7);
    const diff = result.getTime() - now.getTime();
    if (diff <= 0) return { h: 0, m: 0, s: 0 };
    return {
      h: Math.floor((diff / (1000 * 60 * 60)) % 24),
      m: Math.floor((diff / 1000 / 60) % 60),
      s: Math.floor((diff / 1000) % 60)
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      if (remaining.h === 0 && remaining.m === 0 && remaining.s === 0) setIsDrawTime(true);
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const triggerAutoSpin = useCallback(() => {
    if (isSpinning || participants.length === 0) return;
    setIsSpinning(true);
    setWinner(null);
    const extraSpins = 10 + Math.random() * 5;
    const finalRotation = rotation + (extraSpins * 360) + Math.random() * 360;
    setRotation(finalRotation);
    setTimeout(() => {
      setIsSpinning(false);
      const degreesPerEntry = 360 / participants.length;
      const actualRotation = (360 - (finalRotation % 360)) % 360;
      const index = Math.floor(actualRotation / degreesPerEntry);
      setWinner(participants[index]);
    }, 7000); 
  }, [isSpinning, participants, rotation]);

  useEffect(() => {
    if (isDrawTime && !isSpinning && !winner) triggerAutoSpin();
  }, [isDrawTime, isSpinning, winner, triggerAutoSpin]);

  if (participants.length === 0) {
    return (
      <div className="text-center p-20 bg-slate-900 rounded-[50px] border-4 border-dashed border-slate-800">
        <p className="text-slate-500 font-bold text-xl uppercase tracking-tighter italic">Nenhum jogador na roda para o sorteio atual.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-12 py-10">
      {!isSpinning && !winner && (
        <div className="bg-slate-900 px-8 py-5 rounded-3xl border border-slate-800 flex items-center space-x-6 shadow-2xl">
          <Clock className="text-yellow-500 animate-pulse" />
          <div className="flex space-x-4 font-black text-3xl text-white font-mono">
            <div className="text-center">{timeLeft.h.toString().padStart(2, '0')}<span className="text-[9px] text-slate-500 block font-bold uppercase">Horas</span></div>
            <span className="text-slate-700">:</span>
            <div className="text-center">{timeLeft.m.toString().padStart(2, '0')}<span className="text-[9px] text-slate-500 block font-bold uppercase">Minutos</span></div>
            <span className="text-slate-700">:</span>
            <div className="text-center">{timeLeft.s.toString().padStart(2, '0')}<span className="text-[9px] text-slate-500 block font-bold uppercase">Segundos</span></div>
          </div>
        </div>
      )}

      <div className="relative w-80 h-80 md:w-[500px] md:h-[500px] animate-in zoom-in duration-700">
        {/* Ponteiro Branco Superior */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-30">
          <div className="w-10 h-10 bg-white shadow-2xl" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}></div>
        </div>

        <div 
          className="w-full h-full rounded-full border-[12px] border-slate-900 shadow-[0_0_80px_rgba(0,0,0,0.5)] relative overflow-hidden transition-transform ease-out duration-[7000ms]"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {participants.map((p, i) => {
            const angle = 360 / participants.length;
            return (
              <div 
                key={i}
                className="absolute top-0 right-0 w-1/2 h-1/2 origin-bottom-left"
                style={{ 
                  transform: `rotate(${i * angle}deg) skewY(-${90 - angle}deg)`,
                  backgroundColor: colors[i % colors.length]
                }}
              >
                <div 
                  className="absolute bottom-8 left-8 origin-bottom-left font-black text-xs md:text-sm whitespace-nowrap uppercase italic tracking-tighter"
                  style={{ 
                    transform: `skewY(${90 - angle}deg) rotate(${angle/2}deg)`,
                    color: '#000000' // Nomes em preto conforme solicitado
                  }}
                >
                  <span className="block translate-y-6 px-6 font-extrabold">{p.name}</span>
                </div>
              </div>
            );
          })}
          {/* Círculo Central Escuro com Estrela Amarela */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#0a0f1e] rounded-full border-8 border-slate-900 z-20 flex items-center justify-center shadow-inner">
            <Star className="text-yellow-500 fill-yellow-500" size={28} />
          </div>
        </div>
      </div>

      {winner && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/98 backdrop-blur-3xl animate-in fade-in duration-500">
          <div className="bg-slate-900 border-2 border-yellow-500/30 p-12 rounded-[4rem] text-center space-y-8 max-w-md shadow-[0_0_200px_rgba(234,179,8,0.3)] animate-in zoom-in duration-500 relative">
            <Trophy className="w-28 h-28 text-yellow-500 mx-auto animate-bounce" />
            <h3 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">Vencedor<br/><span className="text-yellow-500">Confirmado!</span></h3>
            <div className="py-6 border-y border-white/5">
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-2">Feliz Contemplado</p>
              <p className="text-5xl font-black text-white italic">{winner.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-white text-3xl font-black">100.000 KZ</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Pago via transferência imediata</p>
            </div>
            <button 
              onClick={() => { setWinner(null); setIsDrawTime(false); }}
              className="w-full bg-yellow-500 text-slate-950 font-black py-5 rounded-3xl hover:bg-white transition-all shadow-xl text-lg uppercase tracking-tighter"
            >
              Fechar e Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WheelSpinner;
