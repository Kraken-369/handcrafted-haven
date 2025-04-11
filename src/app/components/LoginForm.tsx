'use client';

import { useState } from 'react';
import Cookies from 'js-cookie';
import {
  AtSymbolIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { jwtDecode } from 'jwt-decode';
import { ErrorMessage } from '@/app/components/ErrorMessage'
import { useAuth } from '@/context/AuthContext';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const LoginForm = () => {
  const router = useRouter();
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      Cookies.set('token', data.token, { expires: 7, secure: true });
      const decoded = jwtDecode<User>(data.token);
      setUser(decoded);

      router.push('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Unknown error happen.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center px-4">
      <div className="flex overflow-hidden max-w-4xl w-full bg-white">
        
        <div className="relative hidden md:block w-1/3">
          <Image
            src="https://cdn.pixabay.com/photo/2021/03/21/14/17/woman-6112219_960_720.jpg"
            alt="Woman Artisan"
            className="object-cover"
            fill
            sizes="(max-width: 100%) 100vw, 50vw"
            priority
          />
        </div>

        <div className="w-full md:w-2/3 p-8 hh-bg-form-login">
          <h2 className="handwriting text-2xl font-bold mb-6 text-center">Login</h2>

          <form onSubmit={handleLogin}>
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm placeholder:text-gray-500 focus:outline-none"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>

            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm placeholder:text-gray-500 focus:outline-none"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>

            {error && <ErrorMessage message={error} />}

            <button
              type="submit"
              className="w-full mt-6 text-white py-2 rounded-md transition"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
