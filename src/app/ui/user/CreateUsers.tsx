'use client';

import { Button } from '@/app/ui/button';
// import { CustomerField } from '@/app/lib/definitions';

import Link from 'next/link';

  

import { createUserForm , State } from '@/app/lib/actions/user';

import { useActionState } from 'react';

/*export type CustomerField = {
    p: string;
    name: string;
  };*/


export default function Form() {
  
  const initialState: State = { message: null, errors: {} };

  const [, formAction] = useActionState( createUserForm, initialState);
  //console.log(state);

  return (
   
   <form action={formAction}>
   
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
 

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />

              
            </div>
          </div>
        </div>

                {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
          Password
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              
              
            </div>
          </div>
        </div>
      </div>


      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/test/user"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create user</Button>
      </div>
    </form>
  );
}
