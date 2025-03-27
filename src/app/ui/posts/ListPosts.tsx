'use client';

import { useEffect, useState } from 'react';
import  listPostAction  from '@/app/lib/actions/post';
// import { Button } from '@/app/ui/button';


interface Posts{ 
  _id:string;
  msg: string;
  optional: string;
}

 
 

  
export default function ListUsers() {
 
  const [posts, setPosts] = useState<Posts[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);      
      setError(null);
      try {
         
      const { data, error } = await listPostAction();

      console.log('Data received:',data);
      
      
      if (error ) {
        setError(error);
      } else {
        setPosts(data );
      }
      
    } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
    };

    fetchPosts();
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
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Optional
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((post) => (

                  <tr key={post._id}>

                    <td className="px-6 py-4 whitespace-nowrap text-black">
                      {post._id}
                    </td>
                  
                    <td className="px-6 py-4 whitespace-nowrap text-black">
                      {post.msg}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-black">
                      {post.optional}
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