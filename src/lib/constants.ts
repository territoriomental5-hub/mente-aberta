// 🦋 MENTE ABERTA - Constants

import { Agent, Plan, CreditPackage } from './types';

// 🎨 Brand Colors
export const COLORS = {
  primary: '#7FCCFF', // Azul claro
  secondary: '#A88BEB', // Roxo suave
  accent: '#F5E77A', // Amarelo pastel
  gradient: {
    blue: '#7FCCFF',
    purple: '#A88BEB',
  }
} as const;

// 🔐 Admin & Whitelist Configuration
export const ADMIN_EMAILS = [
  'seu-email@exemplo.com', // 👈 SUBSTITUA pelo seu e-mail real
];

export const WHITELIST_EMAILS = [
  // Adicione e-mails de testadores autorizados aqui
  // 'testador1@exemplo.com',
  // 'testador2@exemplo.com',
];

// 🦋 AI Agents
export const AGENTS: Agent[] = [
  {
    id: 'lumi',
    name: 'LUMI',
    title: 'Atenção e Organização',
    description: 'Foco, TDAH, Disciplina e Rotina',
    color: '#7FCCFF',
    icon: '🦋',
    features: [
      'Planejamento diário',
      'Técnicas de foco',
      'Rotinas estruturadas',
      'Organização mental'
    ],
    weekUnlock: 1
  },
  {
    id: 'auri',
    name: 'AURI',
    title: 'Equilíbrio Emocional',
    description: 'Ansiedade, Crises e Respiração Guiada',
    color: '#A88BEB',
    icon: '🦋',
    features: [
      'Exercícios de respiração',
      'Registro de crises',
      'Regulação emocional',
      'Técnicas de calma'
    ],
    weekUnlock: 2
  },
  {
    id: 'solen',
    name: 'SOLEN',
    title: 'Estabilidade',
    description: 'Bipolaridade leve/moderada e Oscilação de humor',
    color: '#F5E77A',
    icon: '🦋',
    features: [
      'Monitoramento de humor',
      'Previsibilidade emocional',
      'Relatórios avançados',
      'Padrões de comportamento'
    ],
    weekUnlock: 3
  },
  {
    id: 'kora',
    name: 'KORA',
    title: 'Neurodiversidade',
    description: 'Autismo leve, Comunicação e Rotinas Sensoriais',
    color: '#A88BEB',
    icon: '🦋',
    features: [
      'Rotinas previsíveis',
      'Comunicação estruturada',
      'Gestão sensorial',
      'Conteúdo aprofundado'
    ],
    weekUnlock: 4
  }
];

// 💳 Subscription Plans
export const PLANS: Plan[] = [
  {
    id: 'monthly',
    name: 'Plano Mensal',
    price: 39.99,
    period: 'mês',
    features: [
      'Acompanhamento básico',
      'Diário emocional',
      'Exercícios diários',
      'Agente LUMI'
    ]
  },
  {
    id: 'quarterly',
    name: 'Plano Trimestral',
    price: 80.00,
    period: '3 meses',
    features: [
      'Todos os agentes IA',
      'Ferramentas completas',
      'Loja de eBooks',
      'Relatórios semanais'
    ]
  },
  {
    id: 'annual',
    name: 'Plano Anual',
    price: 259.20,
    originalPrice: 360.00,
    discount: '28% OFF',
    period: 'ano',
    highlighted: true,
    features: [
      'Todos os agentes',
      'Relatórios completos',
      'Diário emocional avançado',
      'Rotinas personalizadas',
      'Neurociência exclusiva',
      'eBook incluso',
      'Suporte inteligente',
      '7 dias grátis'
    ]
  }
];

// 🪙 Credit Packages
export const CREDIT_PACKAGES: CreditPackage[] = [
  {
    id: 'small',
    credits: 5,
    price: 39.90,
    color: '#7FCCFF'
  },
  {
    id: 'medium',
    credits: 10,
    price: 69.90,
    color: '#F5E77A'
  },
  {
    id: 'large',
    credits: 20,
    price: 119.90,
    color: '#A88BEB'
  }
];

// 📚 eBook Price
export const EBOOK_PRICE = 10.99;

// ⏰ Release Times
export const RELEASE_TIMES = {
  morning: '07:00-09:00',
  afternoon: '14:00-16:00',
  evening: '19:00-21:00'
} as const;

// 🎯 Week Unlocks
export const WEEK_CONTENT = {
  1: {
    agent: 'lumi',
    features: ['Check-in emocional', 'Diário', 'Exercícios básicos'],
    trail: 'Organizando a mente caótica'
  },
  2: {
    agent: 'auri',
    features: ['Exercícios de respiração', 'Registro de crises', 'Relatório semanal'],
    trail: 'Equilibrando emoções'
  },
  3: {
    agent: 'solen',
    features: ['Relatórios avançados', 'Jornadas guiadas', 'Planejamento por IA'],
    trail: 'Estabilidade emocional'
  },
  4: {
    agent: 'kora',
    features: ['Loja completa', 'Protocolos personalizados', 'Conteúdo aprofundado'],
    trail: 'Neurodiversidade consciente'
  }
} as const;
