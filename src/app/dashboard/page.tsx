'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Home, 
  Calendar, 
  BookOpen, 
  Settings, 
  TrendingUp,
  Heart,
  Brain,
  Sparkles,
  Lock,
  ChevronRight,
  Shield
} from 'lucide-react';
import { COLORS, AGENTS, WEEK_CONTENT } from '@/lib/constants';
import { AgentCard } from '@/components/custom/agent-card';
import { FeedbackModal } from '@/components/custom/feedback-modal';

export default function DashboardPage() {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [showFeedback, setShowFeedback] = useState(false);
  const userName = 'Usuário'; // Will come from auth later
  
  // Mock user data - will come from auth
  const userId = 'mock-user-id';
  const userEmail = 'usuario@exemplo.com';
  const userRole: 'admin' | 'tester' | 'user' = 'tester'; // Change to test different roles
  const isTester = userRole === 'tester';
  const isAdmin = userRole === 'admin';

  // Simulate user progress
  const unlockedAgents = AGENTS.filter(agent => agent.weekUnlock <= currentWeek);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🦋</span>
              <div>
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#7FCCFF] to-[#A88BEB] bg-clip-text text-transparent">
                  MENTE ABERTA
                </h1>
                <p className="text-xs text-gray-600">Olá, {userName}!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Link 
                  href="/admin"
                  className="p-2 rounded-full bg-[#7FCCFF]/10 hover:bg-[#7FCCFF]/20 transition-colors"
                  title="Painel Admin"
                >
                  <Shield className="w-6 h-6 text-[#7FCCFF]" />
                </Link>
              )}
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Settings className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Test Mode Badge */}
        {isTester && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 mb-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 flex-shrink-0" />
              <div>
                <div className="font-bold">Modo Teste Ativo</div>
                <div className="text-sm opacity-90">Você tem acesso completo como testador beta</div>
              </div>
            </div>
            <button 
              onClick={() => setShowFeedback(true)}
              className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 font-semibold text-sm transition-all whitespace-nowrap"
            >
              Enviar Feedback
            </button>
          </div>
        )}

        {/* Admin Badge */}
        {isAdmin && (
          <div 
            className="rounded-2xl p-4 mb-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            style={{
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`
            }}
          >
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 flex-shrink-0" />
              <div>
                <div className="font-bold">Modo Administrador</div>
                <div className="text-sm opacity-90">Acesso total ao sistema</div>
              </div>
            </div>
            <Link 
              href="/admin"
              className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 font-semibold text-sm transition-all whitespace-nowrap"
            >
              Painel Admin
            </Link>
          </div>
        )}

        {/* Welcome Section */}
        <div 
          className="rounded-3xl p-6 sm:p-8 mb-8 text-white"
          style={{
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`
          }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                Bem-vindo de volta! 🦋
              </h2>
              <p className="text-white/90">
                Você está na <strong>Semana {currentWeek}</strong> da sua jornada
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 text-center">
              <div className="text-3xl font-bold">{currentWeek}</div>
              <div className="text-sm opacity-90">Semana Atual</div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Heart, label: 'Check-ins', value: '12', color: COLORS.primary },
            { icon: Brain, label: 'Exercícios', value: '8', color: COLORS.secondary },
            { icon: TrendingUp, label: 'Progresso', value: '67%', color: COLORS.accent },
            { icon: Sparkles, label: 'Sequência', value: '5 dias', color: COLORS.primary }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 mb-3" style={{ color: stat.color }} />
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Current Week Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 mb-8 border border-gray-200">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
            📚 Conteúdo da Semana {currentWeek}
          </h3>
          <div className="space-y-4">
            {WEEK_CONTENT[currentWeek as keyof typeof WEEK_CONTENT]?.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#7FCCFF]/10 to-[#A88BEB]/10 border border-[#7FCCFF]/30 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <span className="text-lg">✓</span>
                  </div>
                  <span className="font-medium text-gray-800">{feature}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl bg-yellow-50 border border-yellow-200">
            <p className="text-sm text-gray-700">
              <strong>🎯 Trilha Atual:</strong> {WEEK_CONTENT[currentWeek as keyof typeof WEEK_CONTENT]?.trail}
            </p>
          </div>
        </div>

        {/* Agents Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
              Seus Agentes de IA
            </h3>
            <button
              onClick={() => setCurrentWeek(Math.min(currentWeek + 1, 4))}
              className="text-sm font-semibold text-[#7FCCFF] hover:text-[#A88BEB] transition-colors"
            >
              Simular próxima semana →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AGENTS.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                isUnlocked={agent.weekUnlock <= currentWeek}
                currentWeek={currentWeek}
                onClick={() => {
                  if (agent.weekUnlock <= currentWeek) {
                    alert(`Abrindo ${agent.name}...`);
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Daily Check-in CTA */}
        <div 
          className="rounded-3xl p-6 sm:p-8 text-white text-center"
          style={{
            background: `linear-gradient(135deg, ${COLORS.secondary}, ${COLORS.accent})`
          }}
        >
          <h3 className="text-2xl font-bold mb-2">
            Como você está se sentindo hoje?
          </h3>
          <p className="mb-6 opacity-90">
            Faça seu check-in emocional diário
          </p>
          <button className="px-8 py-3 rounded-full font-semibold bg-white text-[#A88BEB] hover:scale-105 transition-all duration-300 shadow-xl">
            Fazer Check-in Agora
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 safe-area-bottom">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-around py-3">
            {[
              { icon: Home, label: 'Início', active: true },
              { icon: Calendar, label: 'Rotina', active: false },
              { icon: BookOpen, label: 'Diário', active: false },
              { icon: TrendingUp, label: 'Progresso', active: false }
            ].map((item, index) => (
              <button
                key={index}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                  item.active
                    ? 'text-[#7FCCFF]'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        userEmail={userEmail}
        userId={userId}
      />
    </div>
  );
}
