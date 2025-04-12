import { Suspense } from 'react';
import LoginForm from '@/app/components/LoginForm';
 
export default function LoginPage() {
  return (
    <div className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[650px] flex-col space-y-2.5 p-4 md:-mt-32">
      <div className="flex items-center justify-center mx-4 py-4 hh-bg-form-login">
        <h1 className="handwriting hh-title">Handcrafted-Haven</h1>
      </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}