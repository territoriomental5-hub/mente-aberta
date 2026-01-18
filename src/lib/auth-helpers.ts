// 🔐 Authentication & Authorization Helpers

import { UserRole } from './types';
import { ADMIN_EMAILS, WHITELIST_EMAILS } from './constants';

/**
 * Check if email is admin/creator
 */
export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

/**
 * Check if email is in whitelist (authorized tester)
 */
export function isWhitelistedEmail(email: string): boolean {
  return WHITELIST_EMAILS.includes(email.toLowerCase());
}

/**
 * Determine user role based on email
 */
export function getUserRole(email: string, inviteCodeUsed?: string): UserRole {
  if (isAdminEmail(email)) {
    return 'admin';
  }
  
  if (isWhitelistedEmail(email) || inviteCodeUsed) {
    return 'tester';
  }
  
  return 'user';
}

/**
 * Check if user has premium access (admin or tester)
 */
export function hasPremiumAccess(role: UserRole): boolean {
  return role === 'admin' || role === 'tester';
}

/**
 * Check if user can access admin panel
 */
export function canAccessAdminPanel(role: UserRole): boolean {
  return role === 'admin';
}

/**
 * Get user plan based on role
 */
export function getUserPlan(role: UserRole): string {
  if (role === 'admin' || role === 'tester') {
    return 'annual'; // Full access
  }
  return 'free';
}

/**
 * Check if email can register
 */
export function canRegister(email: string, inviteCode?: string): {
  allowed: boolean;
  reason?: string;
} {
  // Admin always allowed
  if (isAdminEmail(email)) {
    return { allowed: true };
  }
  
  // Whitelisted emails allowed
  if (isWhitelistedEmail(email)) {
    return { allowed: true };
  }
  
  // With valid invite code allowed
  if (inviteCode) {
    // TODO: Validate invite code in database
    return { allowed: true };
  }
  
  // Regular users allowed (will need to pay)
  return { allowed: true };
}
