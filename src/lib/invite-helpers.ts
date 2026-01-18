// 🎟️ Invite Code Management

import { InviteCode } from './types';

/**
 * Generate a random invite code
 */
export function generateInviteCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed confusing chars
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Validate invite code format
 */
export function isValidCodeFormat(code: string): boolean {
  return /^[A-Z0-9]{8}$/.test(code);
}

/**
 * Check if invite code is valid and usable
 */
export function canUseInviteCode(inviteCode: InviteCode): {
  valid: boolean;
  reason?: string;
} {
  // Check if active
  if (!inviteCode.isActive) {
    return { valid: false, reason: 'Código desativado' };
  }
  
  // Check expiration
  if (inviteCode.expiresAt && new Date() > inviteCode.expiresAt) {
    return { valid: false, reason: 'Código expirado' };
  }
  
  // Check usage limit
  if (inviteCode.currentUses >= inviteCode.maxUses) {
    return { valid: false, reason: 'Código esgotado' };
  }
  
  return { valid: true };
}

/**
 * Format invite code for display
 */
export function formatInviteCode(code: string): string {
  return code.match(/.{1,4}/g)?.join('-') || code;
}

/**
 * Create invite code object (for database)
 */
export function createInviteCodeObject(
  adminId: string,
  options: {
    maxUses?: number;
    expiresInDays?: number;
    description?: string;
  } = {}
): Omit<InviteCode, 'id'> {
  const code = generateInviteCode();
  const now = new Date();
  
  let expiresAt: Date | undefined;
  if (options.expiresInDays) {
    expiresAt = new Date(now);
    expiresAt.setDate(expiresAt.getDate() + options.expiresInDays);
  }
  
  return {
    code,
    createdBy: adminId,
    createdAt: now,
    expiresAt,
    maxUses: options.maxUses || 10,
    currentUses: 0,
    isActive: true,
    description: options.description
  };
}
