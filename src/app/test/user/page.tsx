'use client' 
import ListUsers from '@/app/ui/user/ListUsers';

export default function UsersPage() {
  return (
    <main className="p-4">
      <h1>Usuer list</h1>
      <ListUsers />
    </main>
  );
}