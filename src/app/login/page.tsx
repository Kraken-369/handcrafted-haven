import { Suspense } from 'react';
import LoginForm from '@/app/components/LoginForm';
 
export default function LoginPage() {
  return (
    <div className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[650px] flex-col space-y-2.5 p-4 md:-mt-32">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}