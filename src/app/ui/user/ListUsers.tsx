'use client';

import { useEffect, useState } from 'react';
import { listUsers } from '@/api/controllers/user';

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export default function ListUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await listUsers();
        if (error) {
          setError(error);
        } else {
          setUsers(data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">List of Users</h1>
        <button
          onClick={() => window.location.reload()}
          disabled={loading}
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-400"
        >
          {loading ? 'Cargando...' : 'Actualizar'}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                 
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.role === 'admin'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {user.role}
                  </span>
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