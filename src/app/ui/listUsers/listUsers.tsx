'use client';

import { useEffect, useState } from 'react';
import { listUsers } from '@/app/lib/actions/listUsers';
// import { Button } from '@/app/ui/button';


interface User{
  _id: string;
  email: string;
  password: string;
}


 

  
export default function ListUsers() {
 
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const { data, error } = await listUsers();
      if (error) {
        setError(error);
      } else {
        setUsers(data);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

     

      return (
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h1>Lista de Usuarios</h1>
            <button onClick= {() => window.location.reload()} disabled={loading}>
              {loading ? 'Cargando...' : 'Actualizar'}
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Correo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contraseña
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.password}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    
          {loading && (
            <div className="mt-4 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            </div>
          )}
    
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </div>
      );

}