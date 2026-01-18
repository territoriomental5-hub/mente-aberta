import { signUp } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const email = 'test@example.com';
  const password = 'password123';

  const result = await signUp(email, password);

  return NextResponse.json(result);
}