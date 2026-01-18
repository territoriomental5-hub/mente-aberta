import { signUp } from './src/lib/supabase.ts';

async function testSignUp() {
  const result = await signUp('test@example.com', 'password123');
  console.log('SignUp result:', result);
}

testSignUp();