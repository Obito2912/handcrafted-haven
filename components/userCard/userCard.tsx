// components/userCard/userCard.tsx
import Link from "next/link";

type UserCardProps = {
  user: {
    id: string;
    name: string;
  };
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <Link href={`/user/${user.id}`}>
      <div className="bg-[#606c38] p-4 rounded cursor-pointer hover:bg-[#283618]">
        <h2 className="text-[#fefae0] font-playfair">{user.name}</h2>
        <p className="text-[#dda15e]">Click to view products</p>
      </div>
    </Link>
  );
}
