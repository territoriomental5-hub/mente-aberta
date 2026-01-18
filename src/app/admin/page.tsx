'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Users,
  UserPlus,
  Trash2,
  Copy,
  Check,
  Calendar,
  Shield,
  AlertCircle,
  Plus,
  X
} from 'lucide-react';
import { COLORS } from '@/lib/constants';
import { generateInviteCode, formatInviteCode } from '@/lib/invite-helpers';
import type { InviteCode, User, Feedback } from '@/lib/types';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'testers' | 'invites' | 'feedback'>('testers');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showCreateInvite, setShowCreateInvite] = useState(false);

  // Mock data - will come from database
  const [testers, setTesters] = useState<User[]>([
    {
      id: '1',
      email: 'testador1@exemplo.com',
      name: 'João Silva',
      role: 'tester',
      createdAt: new Date('2024-01-15'),
      isActive: true,
      plan: 'annual',
      credits: 0,
      inviteCodeUsed: 'ABC123XY'
    },
    {
      id: '2',
      email: 'testador2@exemplo.com',
      name: 'Maria Santos',
      role: 'tester',
      createdAt: new Date('2024-01-20'),
      isActive: true,
      plan: 'annual',
      credits: 0
    }
  ]);

  const [inviteCodes, setInviteCodes] = useState<InviteCode[]>([
    {
      id: '1',
      code: 'ABC123XY',
      createdBy: 'admin',
      createdAt: new Date('2024-01-10'),
      expiresAt: new Date('2024-02-10'),
      maxUses: 5,
      currentUses: 1,
      isActive: true,
      description: 'Grupo de teste inicial'
    },
    {
      id: '2',
      code: 'XYZ789AB',
      createdBy: 'admin',
      createdAt: new Date('2024-01-15'),
      maxUses: 10,
      currentUses: 0,
      isActive: true,
      description: 'Testadores beta'
    }
  ]);

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: '1',
      userId: '1',
      userEmail: 'testador1@exemplo.com',
      type: 'feature',
      message: 'Seria ótimo ter notificações personalizadas',
      rating: 5,
      createdAt: new Date('2024-01-22'),
      status: 'pending'
    }
  ]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleToggleTester = (testerId: string) => {
    setTesters(testers.map(t => 
      t.id === testerId ? { ...t, isActive: !t.isActive } : t
    ));
  };

  const handleRemoveTester = (testerId: string) => {
    if (confirm('Tem certeza que deseja remover este testador?')) {
      setTesters(testers.filter(t => t.id !== testerId));
    }
  };

  const handleToggleInviteCode = (codeId: string) => {
    setInviteCodes(inviteCodes.map(c => 
      c.id === codeId ? { ...c, isActive: !c.isActive } : c
    ));
  };

  const handleCreateInvite = (data: { maxUses: number; expiresInDays?: number; description: string }) => {
    const newCode: InviteCode = {
      id: Date.now().toString(),
      code: generateInviteCode(),
      createdBy: 'admin',
      createdAt: new Date(),
      expiresAt: data.expiresInDays 
        ? new Date(Date.now() + data.expiresInDays * 24 * 60 * 60 * 1000)
        : undefined,
      maxUses: data.maxUses,
      currentUses: 0,
      isActive: true,
      description: data.description
    };
    setInviteCodes([newCode, ...inviteCodes]);
    setShowCreateInvite(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </Link>
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-[#7FCCFF]" />
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-800">
                    Painel Administrativo
                  </h1>
                  <p className="text-xs text-gray-600">Gerenciamento de testes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Admin Badge */}
        <div 
          className="rounded-2xl p-4 mb-6 text-white flex items-center gap-3"
          style={{
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`
          }}
        >
          <Shield className="w-6 h-6" />
          <div>
            <div className="font-bold">Modo Administrador</div>
            <div className="text-sm opacity-90">Acesso total ao sistema</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: 'testers', label: 'Testadores', icon: Users },
            { id: 'invites', label: 'Códigos de Convite', icon: UserPlus },
            { id: 'feedback', label: 'Feedbacks', icon: AlertCircle }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-[#7FCCFF] shadow-lg'
                  : 'bg-white/50 text-gray-600 hover:bg-white/80'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Testers Tab */}
        {activeTab === 'testers' && (
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Testadores Ativos ({testers.filter(t => t.isActive).length})
              </h2>
              <div className="space-y-3">
                {testers.map((tester) => (
                  <div
                    key={tester.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#7FCCFF]/10 to-[#A88BEB]/10 border border-[#7FCCFF]/30"
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{tester.name || tester.email}</div>
                      <div className="text-sm text-gray-600">{tester.email}</div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>Cadastro: {tester.createdAt.toLocaleDateString()}</span>
                        {tester.inviteCodeUsed && (
                          <span className="px-2 py-1 rounded bg-[#7FCCFF]/20 text-[#7FCCFF] font-mono">
                            {formatInviteCode(tester.inviteCodeUsed)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleTester(tester.id)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                          tester.isActive
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tester.isActive ? 'Ativo' : 'Inativo'}
                      </button>
                      <button
                        onClick={() => handleRemoveTester(tester.id)}
                        className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Invite Codes Tab */}
        {activeTab === 'invites' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Códigos de Convite ({inviteCodes.filter(c => c.isActive).length} ativos)
              </h2>
              <button
                onClick={() => setShowCreateInvite(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7FCCFF] text-white font-semibold hover:scale-105 transition-all"
              >
                <Plus className="w-5 h-5" />
                Criar Código
              </button>
            </div>

            {showCreateInvite && (
              <CreateInviteForm
                onSubmit={handleCreateInvite}
                onCancel={() => setShowCreateInvite(false)}
              />
            )}

            <div className="space-y-3">
              {inviteCodes.map((code) => (
                <div
                  key={code.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold font-mono text-[#7FCCFF]">
                          {formatInviteCode(code.code)}
                        </span>
                        <button
                          onClick={() => handleCopyCode(code.code)}
                          className="p-2 rounded-lg bg-[#7FCCFF]/10 hover:bg-[#7FCCFF]/20 transition-colors"
                        >
                          {copiedCode === code.code ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-[#7FCCFF]" />
                          )}
                        </button>
                      </div>
                      {code.description && (
                        <p className="text-sm text-gray-600 mb-3">{code.description}</p>
                      )}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>Usos: {code.currentUses}/{code.maxUses}</span>
                        <span>Criado: {code.createdAt.toLocaleDateString()}</span>
                        {code.expiresAt && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Expira: {code.expiresAt.toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleInviteCode(code.id)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        code.isActive
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {code.isActive ? 'Ativo' : 'Inativo'}
                    </button>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#7FCCFF] h-2 rounded-full transition-all"
                      style={{ width: `${(code.currentUses / code.maxUses) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feedback Tab */}
        {activeTab === 'feedback' && (
          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Feedbacks Recebidos ({feedbacks.length})
              </h2>
              <div className="space-y-3">
                {feedbacks.map((feedback) => (
                  <div
                    key={feedback.id}
                    className="p-4 rounded-xl bg-gradient-to-r from-[#7FCCFF]/10 to-[#A88BEB]/10 border border-[#7FCCFF]/30"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold text-gray-800">{feedback.userEmail}</div>
                        <div className="text-xs text-gray-500">
                          {feedback.createdAt.toLocaleDateString()} - {feedback.type}
                        </div>
                      </div>
                      {feedback.rating && (
                        <div className="flex items-center gap-1">
                          {Array.from({ length: feedback.rating }).map((_, i) => (
                            <span key={i} className="text-yellow-400">⭐</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-gray-700">{feedback.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CreateInviteForm({ 
  onSubmit, 
  onCancel 
}: { 
  onSubmit: (data: any) => void; 
  onCancel: () => void;
}) {
  const [maxUses, setMaxUses] = useState(10);
  const [expiresInDays, setExpiresInDays] = useState<number | undefined>(30);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ maxUses, expiresInDays, description });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Criar Novo Código</h3>
        <button onClick={onCancel} className="p-2 rounded-lg hover:bg-gray-100">
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Descrição
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Grupo de teste beta"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7FCCFF]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Máximo de usos
          </label>
          <input
            type="number"
            value={maxUses}
            onChange={(e) => setMaxUses(parseInt(e.target.value))}
            min="1"
            max="100"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7FCCFF]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Expira em (dias)
          </label>
          <input
            type="number"
            value={expiresInDays || ''}
            onChange={(e) => setExpiresInDays(e.target.value ? parseInt(e.target.value) : undefined)}
            min="1"
            max="365"
            placeholder="Deixe vazio para sem expiração"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7FCCFF]"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 px-6 py-3 rounded-xl bg-[#7FCCFF] text-white font-semibold hover:scale-105 transition-all"
          >
            Criar Código
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-all"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
