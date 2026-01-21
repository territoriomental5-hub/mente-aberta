// 🗄️ Supabase Client Configuration with SSR Support

import { createBrowserClient, createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Missing Supabase environment variables. Please configure them in the project settings.');
}

// Browser client for client-side operations
export const supabase = createBrowserClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Server client for server-side operations
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

// 🎟️ Invite Code Functions (using existing table: invite_codes)
// ✅ UPDATED: Using new column names: usa, ativo, contagem_de_uso

/**
 * Normalize string: remove accents and convert to uppercase
 */
function normalizeString(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .trim();
}

/**
 * Validate invite code from database
 * Table: invite_codes (usa: text, ativo: boolean, contagem_de_uso: integer)
 * Validation: case-insensitive and accent-insensitive
 */
export async function validateInviteCode(code: string): Promise<{
  valid: boolean;
  reason?: string;
}> {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      return { valid: false, reason: 'Configuração do Supabase pendente' };
    }

    const supabaseClient = createClient();
    const normalizedCode = normalizeString(code);

    const { data, error } = await supabaseClient
      .from('invite_codes')
      .select('*')
      .ilike('usa', normalizedCode)
      .single();

    if (error || !data) {
      return { valid: false, reason: 'Código não encontrado' };
    }

    // Check if active (ativo column)
    if (!data.ativo) {
      return { valid: false, reason: 'Código desativado' };
    }

    // Check usage limit (contagem_de_uso must be < 10)
    const usesCount = data.contagem_de_uso || 0;
    if (usesCount >= 10) {
      return { valid: false, reason: 'Código esgotado (limite de 10 usos)' };
    }

    return { valid: true };
  } catch (error) {
    console.error('Error validating invite code:', error);
    return { valid: false, reason: 'Erro ao validar código' };
  }
}

/**
 * Consume invite code (increment contagem_de_uso by 1)
 */
export async function consumeInviteCode(code: string): Promise<boolean> {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase not configured');
      return false;
    }

    const supabaseClient = createClient();
    const normalizedCode = normalizeString(code);

    // First, get current contagem_de_uso
    const { data: currentData, error: fetchError } = await supabaseClient
      .from('invite_codes')
      .select('contagem_de_uso')
      .ilike('usa', normalizedCode)
      .single();

    if (fetchError || !currentData) {
      console.error('Error fetching invite code:', fetchError);
      return false;
    }

    const currentUses = currentData.contagem_de_uso || 0;

    // Increment contagem_de_uso by 1
    const { error: updateError } = await supabaseClient
      .from('invite_codes')
      .update({ contagem_de_uso: currentUses + 1 })
      .ilike('usa', normalizedCode);

    if (updateError) {
      console.error('Error consuming invite code:', updateError);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error consuming invite code:', error);
    return false;
  }
}

// 🔐 Auth Functions

/**
 * Sign up with email and password
 */
export async function signUp(email: string, password: string) {
  if (!supabaseUrl || !supabaseAnonKey) {
    return { data: null, error: new Error('Supabase not configured') };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  return { data, error };
}

/**
 * Sign in with email and password
 */
export async function signIn(email: string, password: string) {
  if (!supabaseUrl || !supabaseAnonKey) {
    return { data: null, error: new Error('Supabase not configured') };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

/**
 * Sign out
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * Get current user
 */
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}

/**
 * Reset password
 */
export async function resetPassword(email: string) {
  if (!supabaseUrl || !supabaseAnonKey) {
    return { data: null, error: new Error('Supabase not configured') };
  }

  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  return { data, error };
}