import { useState, useEffect } from "react";

const useUsersAndPosts = () => {
  const [state, setState] = useState({
    users: [],
    selectedUser: null,
    posts: [],
    loading: false,
    error: null
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setState((prevState) => ({ ...prevState, loading: true }));
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setState((prevState) => ({ ...prevState, users: data, loading: false }));
      } catch (err) {
        setState((prevState) => ({ ...prevState, error: "Failed to fetch users", loading: false }));
      }
    };
    fetchUsers();
  }, []);

  const fetchPosts = async (userId) => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      const data = await response.json();
      setState((prevState) => ({
        ...prevState,
        posts: data,
        selectedUser: userId,
        loading: false
      }));
    } catch (err) {
      setState((prevState) => ({ ...prevState, error: "Failed to fetch posts", loading: false }));
    }
  };

  // Destructure state object for easy access
  const { users, selectedUser, posts, loading, error } = state;

  return { users, selectedUser, posts, loading, error, fetchPosts };
};

export default useUsersAndPosts;
