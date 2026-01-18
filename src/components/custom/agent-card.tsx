'use client';

import { Agent } from '@/lib/types';
import { Lock } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
  isUnlocked: boolean;
  currentWeek: number;
  onClick?: () => void;
}

export function AgentCard({ agent, isUnlocked, currentWeek, onClick }: AgentCardProps) {
  return (
    <div
      onClick={isUnlocked ? onClick : undefined}
      className={`
        relative overflow-hidden rounded-2xl p-6 transition-all duration-300
        ${isUnlocked 
          ? 'cursor-pointer hover:scale-105 hover:shadow-2xl' 
          : 'opacity-60 cursor-not-allowed'
        }
      `}
      style={{
        background: isUnlocked
          ? `linear-gradient(135deg, ${agent.color}20, ${agent.color}40)`
          : '#f3f4f6',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: isUnlocked ? agent.color : '#d1d5db'
      }}
    >
      {/* Lock Overlay */}
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-10">
          <div className="text-center">
            <Lock className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p className="text-sm font-medium text-gray-600">
              Desbloqueia na Semana {agent.weekUnlock}
            </p>
          </div>
        </div>
      )}

      {/* Agent Icon */}
      <div className="text-5xl mb-4">{agent.icon}</div>

      {/* Agent Info */}
      <h3 className="text-2xl font-bold mb-2" style={{ color: agent.color }}>
        {agent.name}
      </h3>
      <p className="text-sm font-semibold text-gray-700 mb-3">
        {agent.title}
      </p>
      <p className="text-sm text-gray-600 mb-4">
        {agent.description}
      </p>

      {/* Features */}
      <div className="space-y-2">
        {agent.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            <span className="text-xs mt-0.5" style={{ color: agent.color }}>●</span>
            <span className="text-xs text-gray-700">{feature}</span>
          </div>
        ))}
      </div>

      {/* Unlock Status */}
      {isUnlocked && (
        <div 
          className="mt-4 pt-4 border-t-2 text-center text-sm font-semibold"
          style={{ borderColor: agent.color, color: agent.color }}
        >
          ✓ Desbloqueado
        </div>
      )}
    </div>
  );
}
