/*'use client'
// pages/users.tsx
import { useEffect, useState } from 'react';
import { isConnected } from '../../lib/db';
import { getAllUsers } from '../../lib/data';
import {UserDocument} from '@/app/models/user'

export default function UsersPage() {
  const [users, setUsers] = useState<UserDocument[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const Connected =  await isConnected();


        console.log(`Connected: ${Connected}`);


        const data = await getAllUsers();

        console.log(data);

        setUsers(data);
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
      }
    };

    loadUsers();
  }, []);

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {users.map((user: any) => (
          <li key={user._id}>{user.email}</li>
        ))}
      </ul>
    </div>
  );
}
*/
import ListUsers from '@/app/ui/listUsers/listUsers';

export default function UsersPage() {
  return (
    <main className="p-4">
      <h1>Lista de Usuarios</h1>
      <ListUsers />
    </main>
  );
}