import { Carousel, Card } from "antd";
import Link from "next/link";

const PostList = ({ user, posts }) => {
  return (
    <div>
      <h2 className=" z-10 text-lg md:text-4xl  m-2 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
      Posts by {user.name}
        </h2>
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
      <div className="flex items-end justify-end">     <Link href={`user/${user.id}`}><button className="bg-black text-white m-2 rounded p-2">See All Post</button></Link> 
      </div>
    </div>
  );
};

export default PostList;
