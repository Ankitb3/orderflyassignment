import { Card, Title, Text } from "@tremor/react"; // Import Tremor components
import { BarChart } from "@tremor/react"; // Import BarChart from Tremor
import useUsersAndPosts from "../Hooks/useUsersAndPosts";

const UsersAndPostsChart = () => {
  const { users, posts, loading, error, fetchPosts } = useUsersAndPosts();

  // Prepare the data for the chart
  const userPostCounts = users.map((user) => {
    const userPosts = posts.filter((post) => post.userId === user.id);
    return { name: user.name, postsCount: userPosts.length };
  });

  // Calculate the total number of users and posts (for a StatCard or overall total)
  const totalUsers = users.length;

  return (
    <div className="space-y-4 mt-4">
      <div className="w-28 lg:w-18 gap-4">
        <Card className="border p-2 shadow-lg rounded-md">
          <Title className=" font-semibold text-lg">Total Users</Title>
          
          <Text className="bg-blue-500 text-white rounded p-2 w-fit">{totalUsers}</Text>
          
          
        </Card>
        
      </div>

      
    </div>
  );
};

export default UsersAndPostsChart;
