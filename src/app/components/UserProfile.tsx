import Image from 'next/image';

interface User {
  name: string;
  bio?: string; 
  profileImage?: string; 
}

const UserProfile = ({ user }: { user: User }) => {
  return (
    <div className="flex gap-6 items-start mb-8">
      <Image
        src={user.profileImage || "/default-profile.png"}
        alt="Profile"
        width={96}
        height={96}
        className="rounded-full object-cover border"
      />
      <p className="text-gray-700">{user.bio || "No bio available"}</p>
    </div>
  );
};

export default UserProfile;
