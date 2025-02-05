
"use client";

import { useState } from "react";
import { Layout } from "antd";
import UserCard from "../app/components/UserCard";
import PostList from "../app/components/PostList";
import Loader from "./components/Loader";
import useUsersAndPosts from "./Hooks/useUsersAndPosts";
import { ShineBorder } from "@/components/ui/shine-border";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
const { Content } = Layout;

export default function Home() {
  const { users, posts, loading, error, fetchPosts } = useUsersAndPosts();
  const [activeUser, setActiveUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const { user } = useUser();
  console.log(user, "users");
  const placeholders = [
    "Search By Name",
    "Search By Email",
  ];
  const handleUserClick = (user) => {
    setActiveUser(user);
    fetchPosts(user.id);
  };

  const filteredUsers = users?.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
 
  const onSubmit = (e) => {
    e.preventDefault();
    setSearchQuery("")
    console.log("submitted");
  };
  return (
    <Layout style={{ minHeight: "100vh" }} className="font-sans text-white">
      <ShineBorder
        className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      >
        <div className="flex justify-end">
          <SignedOut></SignedOut>
          <SignedIn>
            {" "}
            <span className="font-semibold m-2">Welcome {user?.firstName}</span>
            <UserButton />
          </SignedIn>
        </div>

        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {!user?.firstName ? (
              <>
                <div
                  class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
                  role="alert"
                >
                  <p className="font-bold text-red-600">Be Warned</p>
                  <p>
                    You need to sign in to access the dashboard. Please log in
                    to continue.
                  </p>
                </div>

                <SignInButton />
              </>
            ) : (
              <>
            
                <h2 className=" z-10 text-lg md:text-4xl  m-2 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
                Users & Posts Dashboard
        </h2>
                {/* Search Input */}
                <div className="my-4">
                <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={(e) => setSearchQuery(e.target.value)}

        onSubmit={onSubmit}
      />
                
                </div>

                {loading ? (
                  <Loader />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h2 className=" z-10 text-lg md:text-4xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Users
        </h2>
                      <ul className="border p-2 rounded-lg">
                        {filteredUsers?.length > 0 ? filteredUsers?.map((user) => (
                          <UserCard
                            key={user.id}
                            user={user}
                            onClick={() => handleUserClick(user)}
                          />
                        )): <h2 className=" z-10 text-lg md:text-2xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
                        User Not Found
                          </h2>}
                        
                      </ul>
                    </div>
                    <div>
                      {activeUser && (
                        <PostList user={activeUser} posts={posts} />
                      )}
                    </div>
                  </div>
                )}
                {error && <p className="text-red-500">{error}</p>}
              </>
            )}
          </Content>
        </Layout>
      </ShineBorder>
    </Layout>
  );
}
