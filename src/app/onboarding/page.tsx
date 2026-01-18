'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { COLORS, AGENTS } from '@/lib/constants';

const STEPS = [
  {
    id: 'welcome',
    title: 'Bem-vindo à MENTE ABERTA',
    subtitle: 'Sua jornada de evolução mental começa aqui'
  },
  {
    id: 'profile',
    title: 'Conte-nos sobre você',
    subtitle: 'Vamos personalizar sua experiência'
  },
  {
    id: 'goals',
    title: 'Quais são seus objetivos?',
    subtitle: 'Selecione as áreas que deseja trabalhar'
  },
  {
    id: 'plan',
    title: 'Escolha seu plano',
    subtitle: 'Comece com 7 dias grátis'
  }
];

const GOALS = [
  { id: 'focus', label: 'Melhorar foco e atenção', agent: 'lumi' },
  { id: 'anxiety', label: 'Controlar ansiedade', agent: 'auri' },
  { id: 'mood', label: 'Estabilizar humor', agent: 'solen' },
  { id: 'routine', label: 'Criar rotinas previsíveis', agent: 'kora' },
  { id: 'organization', label: 'Organizar pensamentos', agent: 'lumi' },
  { id: 'emotional', label: 'Regular emoções', agent: 'auri' }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    goals: [] as string[],
    plan: 'annual'
  });

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleGoal = (goalId: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId]
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return true;
      case 1: return formData.name.length > 0;
      case 2: return formData.goals.length > 0;
      case 3: return true;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🦋</span>
            <div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#7FCCFF] to-[#A88BEB] bg-clip-text text-transparent">
                MENTE ABERTA
              </h1>
              <p className="text-xs text-gray-600">Clínica Inteligente</p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`flex-1 h-2 rounded-full mx-1 transition-all duration-300 ${
                  index <= currentStep
                    ? 'bg-gradient-to-r from-[#7FCCFF] to-[#A88BEB]'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 text-center">
            Passo {currentStep + 1} de {STEPS.length}
          </p>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-2xl">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-10">
            {/* Step Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">
                {STEPS[currentStep].title}
              </h2>
              <p className="text-gray-600">
                {STEPS[currentStep].subtitle}
              </p>
            </div>

            {/* Step Content */}
            <div className="mb-8">
              {currentStep === 0 && (
                <div className="text-center space-y-6">
                  <div className="text-7xl mb-4">🦋</div>
                  <p className="text-lg text-gray-700 max-w-lg mx-auto">
                    A <strong>MENTE ABERTA</strong> é um sistema de organização mental 
                    baseado em IA e Neurociência, criado para apoiar pessoas com 
                    <strong> TDAH, Ansiedade, Bipolaridade</strong> e <strong>Autismo leve</strong>.
                  </p>
                  <div className="inline-block px-4 py-2 rounded-full bg-yellow-100 border border-yellow-300">
                    <p className="text-sm text-gray-700">
                      ⚠️ Ferramenta de apoio • Não substitui acompanhamento médico
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Como podemos te chamar?
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Seu nome"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#7FCCFF] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Qual sua idade? (opcional)
                    </label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="Sua idade"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#7FCCFF] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  {GOALS.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className={`
                        w-full p-4 rounded-xl border-2 transition-all duration-300 text-left
                        ${formData.goals.includes(goal.id)
                          ? 'border-[#7FCCFF] bg-[#7FCCFF]/10'
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-800">{goal.label}</span>
                        {formData.goals.includes(goal.id) && (
                          <Check className="w-5 h-5 text-[#7FCCFF]" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  {[
                    { id: 'monthly', name: 'Mensal', price: 39.99, period: 'mês' },
                    { id: 'quarterly', name: 'Trimestral', price: 80.00, period: '3 meses' },
                    { id: 'annual', name: 'Anual', price: 259.20, original: 360.00, period: 'ano', badge: 'MELHOR OFERTA' }
                  ].map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => setFormData({ ...formData, plan: plan.id })}
                      className={`
                        w-full p-6 rounded-xl border-2 transition-all duration-300 text-left
                        ${formData.plan === plan.id
                          ? 'border-[#A88BEB] bg-gradient-to-br from-[#7FCCFF]/10 to-[#A88BEB]/10 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{plan.name}</h3>
                          {plan.badge && (
                            <span className="inline-block mt-1 px-2 py-1 rounded-full bg-[#A88BEB] text-white text-xs font-bold">
                              {plan.badge}
                            </span>
                          )}
                        </div>
                        {formData.plan === plan.id && (
                          <Check className="w-6 h-6 text-[#A88BEB]" />
                        )}
                      </div>
                      <div className="flex items-baseline gap-2">
                        {plan.original && (
                          <span className="text-sm text-gray-400 line-through">
                            R$ {plan.original.toFixed(2)}
                          </span>
                        )}
                        <span className="text-2xl font-bold text-gray-800">
                          R$ {plan.price.toFixed(2)}
                        </span>
                        <span className="text-gray-600">/{plan.period}</span>
                      </div>
                    </button>
                  ))}
                  <p className="text-sm text-center text-gray-600 mt-4">
                    ✨ Teste grátis por 7 dias • Cancele quando quiser
                  </p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex gap-4">
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="flex-1 px-6 py-3 rounded-full font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Voltar
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`
                  flex-1 px-6 py-3 rounded-full font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2
                  ${canProceed()
                    ? 'bg-gradient-to-r from-[#7FCCFF] to-[#A88BEB] hover:scale-105 hover:shadow-xl'
                    : 'bg-gray-300 cursor-not-allowed'
                  }
                `}
              >
                {currentStep === STEPS.length - 1 ? 'Começar Jornada' : 'Continuar'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
