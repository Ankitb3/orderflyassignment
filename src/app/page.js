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
const { Content } = Layout;

export default function Home() {
  const { users, posts, loading, error, fetchPosts } = useUsersAndPosts();
  const [activeUser, setActiveUser] = useState(null);
  const { user } = useUser();
  console.log(user, "users");

  const handleUserClick = (user) => {
    setActiveUser(user);
    fetchPosts(user.id);
  };

  return (
    <Layout style={{ minHeight: "100vh" }} className="font-sans  text-white">
      {/* Content */}
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
                </div>{" "}
                <div className="bg-black text-white rounded-md p-2 w-fit m-2">
                  <SignInButton />
                </div>
              </>
            ) : (
              <>
                <h1 className="font-semibold text-2xl text-center">
                  Users{" "}
                  <span className="relative bottom-4 bg-blue-400 text-white border rounded">
                    {users?.length}+
                  </span>{" "}
                  & Posts Dashboard
                </h1>

                {loading ? (
                  <Loader />
                ) : (
                  <div className="grid grid-cols- md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h2 className="text-xl font-semibold">Users</h2>
                      <ul className="border p-2 rounded-lg">
                        {users?.map((user) => (
                          <UserCard
                            key={user.id}
                            user={user}
                            onClick={() => handleUserClick(user)}
                          />
                        ))}
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
