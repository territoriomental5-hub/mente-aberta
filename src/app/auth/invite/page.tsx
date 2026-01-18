'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { validateInviteCode, consumeInviteCode, getCurrentUser } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export default function InvitePage() {
  const router = useRouter();
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Get current user
    const fetchUser = async () => {
      const { user } = await getCurrentUser();
      if (!user) {
        router.push('/auth/login');
        return;
      }
      setUserId(user.id);

      // Check if user already used invite code
      const hasInviteCode = localStorage.getItem(`invite_code_${user.id}`);
      if (hasInviteCode) {
        router.push('/dashboard');
      }
    };

    fetchUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!inviteCode.trim()) {
      setError('Digite um código de convite');
      setLoading(false);
      return;
    }

    try {
      // Validate invite code
      const validation = await validateInviteCode(inviteCode.trim());

      if (!validation.valid) {
        setError(validation.reason || 'Código inválido');
        setLoading(false);
        return;
      }

      // Consume invite code (increment uses)
      const consumed = await consumeInviteCode(inviteCode.trim());

      if (!consumed) {
        setError('Erro ao processar código. Tente novamente.');
        setLoading(false);
        return;
      }

      // Save to localStorage
      if (userId) {
        localStorage.setItem(`invite_code_${userId}`, inviteCode.trim().toUpperCase());
      }

      // Success!
      setSuccess(true);
      
      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);

    } catch (err) {
      setError('Erro ao validar código. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#7FCCFF] via-[#A88BEB] to-[#F5E77A] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            🎟️ Código de Convite
          </CardTitle>
          <CardDescription className="text-center">
            Digite seu código de acesso para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="inviteCode">Código de Convite</Label>
              <Input
                id="inviteCode"
                type="text"
                placeholder="CORE01"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                maxLength={20}
                className="text-center text-lg font-mono tracking-wider"
                disabled={loading || success}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                required
              />
              <p className="text-xs text-gray-500 text-center">
                Digite o código fornecido (ex: CORE01)
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                <XCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 p-3 text-sm text-green-600 bg-green-50 rounded-lg">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Código validado! Redirecionando...</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading || success}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Validando...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Validado!
                </>
              ) : (
                'Validar Código'
              )}
            </Button>

            <div className="pt-4 border-t">
              <p className="text-xs text-center text-gray-600">
                O código de convite é necessário para acessar o aplicativo durante a fase de testes.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
