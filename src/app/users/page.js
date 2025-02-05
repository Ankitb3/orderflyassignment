"use client"
import { useState } from "react";
import UserCard from "../components/UserCard";
import useUsersAndPosts from "../Hooks/useUsersAndPosts";

export default function Users() {
  const { users, loading, error } = useUsersAndPosts();
  const [activeUser, setActiveUser] = useState(null);

  const handleUserClick = (user) => {
    setActiveUser(user);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Users</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="border p-2 rounded-lg">
          {users?.map((user) => (
            <UserCard key={user.id} user={user} onClick={() => handleUserClick(user)} />
          ))}
        </ul>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
