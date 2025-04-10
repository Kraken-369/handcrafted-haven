'use client'
 
import ListUsers from "../ui/user/ListUsers"

export default function Home() {
  

  return (
    <div>
    <h1 className="text-3xl text-center pt-2 font-bold text-primary mb-8">User Profiles</h1>
    <ListUsers/>
  
    </div>
  );
}