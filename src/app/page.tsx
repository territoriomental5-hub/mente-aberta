import Link from 'next/link';
import { ArrowRight, Brain, Heart, Sparkles, Shield } from 'lucide-react';
import { COLORS, AGENTS, PLANS } from '@/lib/constants';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🦋</span>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#7FCCFF] to-[#A88BEB] bg-clip-text text-transparent">
                  MENTE ABERTA
                </h1>
                <p className="text-xs text-gray-600">Clínica Inteligente</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="px-4 py-2 rounded-full font-semibold text-gray-700 hover:bg-gray-100 transition-all duration-300 text-sm sm:text-base"
              >
                Entrar
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm sm:text-base"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`
                }}
              >
                Começar Agora
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-700">
              ⚠️ Ferramenta de apoio emocional • Não substitui acompanhamento médico
            </p>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Evolução Mental
            <br />
            <span className="bg-gradient-to-r from-[#7FCCFF] via-[#A88BEB] to-[#F5E77A] bg-clip-text text-transparent">
              Guiada por IA
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Sistema de organização mental baseado em Neurociência Aplicada para pessoas com 
            <strong> TDAH, Ansiedade, Bipolaridade</strong> e <strong>Autismo leve</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-white text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`
              }}
            >
              Iniciar Jornada
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#agents"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-gray-700 bg-white border-2 border-gray-300 hover:border-[#7FCCFF] transition-all duration-300"
            >
              Conhecer Agentes
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Brain,
              title: 'Neurociência Aplicada',
              description: 'Baseado em estudos científicos sobre cognição e emoção',
              color: COLORS.primary
            },
            {
              icon: Sparkles,
              title: 'Agentes de IA',
              description: '4 especialistas virtuais para diferentes necessidades',
              color: COLORS.secondary
            },
            {
              icon: Heart,
              title: 'Liberação Progressiva',
              description: 'Conteúdo desbloqueado no seu ritmo, sem sobrecarga',
              color: COLORS.accent
            },
            {
              icon: Shield,
              title: 'Dados Seguros',
              description: 'Criptografia e privacidade total das suas informações',
              color: COLORS.primary
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <feature.icon 
                className="w-12 h-12 mb-4" 
                style={{ color: feature.color }}
              />
              <h3 className="text-lg font-bold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Agents Section */}
      <section id="agents" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
            Conheça Seus Agentes de IA
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cada agente é especializado em uma área específica da saúde mental, 
            representado por uma borboleta simbolizando transformação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AGENTS.map((agent) => (
            <div
              key={agent.id}
              className="p-8 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${agent.color}20, ${agent.color}40)`,
                border: `2px solid ${agent.color}`
              }}
            >
              <div className="text-6xl mb-4">{agent.icon}</div>
              <h3 className="text-3xl font-bold mb-2" style={{ color: agent.color }}>
                {agent.name}
              </h3>
              <p className="text-lg font-semibold text-gray-700 mb-3">
                {agent.title}
              </p>
              <p className="text-gray-600 mb-6">
                {agent.description}
              </p>
              <div className="space-y-2">
                {agent.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span style={{ color: agent.color }}>●</span>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <div 
                className="mt-6 pt-4 border-t-2 text-center text-sm font-semibold"
                style={{ borderColor: agent.color, color: agent.color }}
              >
                Desbloqueia na Semana {agent.weekUnlock}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
            Escolha Seu Plano
          </h2>
          <p className="text-lg text-gray-600">
            Comece sua jornada de evolução mental hoje
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`
                p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105
                ${plan.highlighted 
                  ? 'bg-gradient-to-br from-[#7FCCFF]/20 to-[#A88BEB]/20 border-[#A88BEB] shadow-2xl' 
                  : 'bg-white border-gray-200'
                }
              `}
            >
              {plan.highlighted && (
                <div className="inline-block px-4 py-1 rounded-full bg-[#A88BEB] text-white text-sm font-bold mb-4">
                  MAIS POPULAR
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                {plan.name}
              </h3>

              <div className="mb-6">
                {plan.originalPrice && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg text-gray-400 line-through">
                      R$ {plan.originalPrice.toFixed(2)}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-red-500 text-white text-xs font-bold">
                      {plan.discount}
                    </span>
                  </div>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-800">
                    R$ {plan.price.toFixed(2)}
                  </span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/auth/signup"
                className={`
                  block w-full py-3 rounded-full font-semibold text-center transition-all duration-300 hover:scale-105
                  ${plan.highlighted
                    ? 'bg-gradient-to-r from-[#7FCCFF] to-[#A88BEB] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }
                `}
              >
                Começar Agora
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div 
          className="rounded-3xl p-8 sm:p-12 text-center text-white"
          style={{
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Pronto para Transformar Sua Mente?
          </h2>
          <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já estão evoluindo com a MENTE ABERTA
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg bg-white text-[#7FCCFF] hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Começar Jornada Gratuita
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">
              🦋 <strong>MENTE ABERTA</strong> - Clínica Inteligente
            </p>
            <p className="text-xs">
              Ferramenta de apoio emocional e organização mental baseada em IA.
              <br />
              Não substitui acompanhamento médico ou psicológico profissional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
