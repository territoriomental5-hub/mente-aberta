// 🦋 MENTE ABERTA - Types

export type AgentType = 'lumi' | 'auri' | 'solen' | 'kora';

// 🔐 User Roles
export type UserRole = 'admin' | 'tester' | 'user';

export interface Agent {
  id: AgentType;
  name: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  features: string[];
  weekUnlock: number;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  period: string;
  features: string[];
  highlighted?: boolean;
}

export interface CreditPackage {
  id: string;
  credits: number;
  price: number;
  color: string;
}

// 🎟️ Invite Code System
export interface InviteCode {
  id: string;
  code: string;
  createdBy: string; // admin user id
  createdAt: Date;
  expiresAt?: Date;
  maxUses: number;
  currentUses: number;
  isActive: boolean;
  description?: string;
}

// 👤 User System
export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  createdAt: Date;
  isActive: boolean;
  inviteCodeUsed?: string;
  plan: string;
  credits: number;
}

export interface UserProgress {
  userId: string;
  currentWeek: number;
  unlockedAgents: AgentType[];
  completedExercises: string[];
  emotionalCheckins: EmotionalCheckin[];
  plan: string;
  credits: number;
}

export interface EmotionalCheckin {
  id: string;
  date: Date;
  mood: number; // 1-10
  energy: number; // 1-10
  focus: number; // 1-10
  notes?: string;
  agentId: AgentType;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  agentId: AgentType;
  weekUnlock: number;
  completed?: boolean;
}

// 💬 Feedback System
export interface Feedback {
  id: string;
  userId: string;
  userEmail: string;
  type: 'bug' | 'feature' | 'improvement' | 'general';
  message: string;
  rating?: number; // 1-5
  createdAt: Date;
  status: 'pending' | 'reviewed' | 'resolved';
}
