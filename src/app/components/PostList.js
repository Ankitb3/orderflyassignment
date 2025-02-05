import { Carousel, Card } from "antd";

const PostList = ({ user, posts }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Posts by {user.name}</h2>
      <Carousel autoplay dots>
        {posts.map((post) => (
          <div key={post.id}>
            <Card className="p-4 border rounded-lg">
              <h3 className="font-semibold text-lg underline">{post.title}</h3>
              <p>{post.body}</p>
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default PostList;
