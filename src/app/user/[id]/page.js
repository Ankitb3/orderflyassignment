
// import { useRouter } from 'next/router';

// const User= () => {
//   const router = useRouter();
//   const { id } = router.query;

//   return <p>User: {id}</p>;
// };

// export default User;

"use client"
import useUsersAndPosts from '@/app/Hooks/useUsersAndPosts';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const userId = () => {

  const { id } = useParams(); 

  const { posts,fetchPosts} = useUsersAndPosts();

  
  
  
useEffect(()=>{
  fetchPosts(id)
},[id])

  return (
    <div>
      <Link href={'/'}> <button  className='bg-black text-white p-2 rounded m-4'>Back</button>
      </Link>
      <h2 className=" z-10 text-lg md:text-4xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
      Total Post {posts?.length}
        </h2>
      <HoverEffect items={posts}/>
    </div>
  )
}

export default userId