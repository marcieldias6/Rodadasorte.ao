
/**
 * Tipos de transações financeiras no sistema.
 */
export enum TransactionType {
  DEPOSIT = 'deposit',      // Depósito de fundos
  WITHDRAWAL = 'withdrawal',   // Levantamento de fundos
  PARTICIPATION = 'participation' // Gasto em participação de sorteio
}

/**
 * Interface que representa uma transação na carteira.
 */
export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: Date;
  status: 'pending' | 'completed';
}

/**
 * Interface principal do Utilizador com dados sensíveis protegidos.
 */
export interface User {
  id: string;
  name: string;
  phone: string;
  password?: string; // Senha armazenada de forma criptografada (simulada)
  balance: number;
  ticketsThisWeek: number;
  iban?: string;
  accountNumber?: string;
  isVerified: boolean;
}

/**
 * Representação de um participante na lista digital da Roda da Sorte.
 */
export interface DrawParticipant {
  userId: string;
  name: string;
  timestamp: number;
}

/**
 * Status de verificação do participante.
 */
export enum ParticipantStatus {
  PENDING = 'pending',
  VERIFIED = 'verified'
}

/**
 * Interface detalhada de participante para gestão interna.
 */
export interface Participant {
  id: string;
  name: string;
  phone: string;
  tickets: number;
  status: ParticipantStatus;
  registrationDate: Date;
}
