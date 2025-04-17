import { useContext, useEffect, useState } from "react";

import PostsContext from "../contexts/PostsContext";
import { PostsContextTypes } from "../../types";
import PostCard from "../UI/molecules/PostCard";

const Home = () => {

  const { posts } = useContext(PostsContext) as PostsContextTypes;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(posts !== undefined && posts !== null && posts.length > 0){
      setLoading(false);
    };
  }, [posts]);


  return (
    <section>
      <h2>Home</h2>
      <div>
        {
          loading ?
          <img src='/media/loadingCircle.gif' alt='loading circle animation' /> :
          posts.length === 0 ?
          <p>No posts exist.</p> :
          posts.map(post =>
            <PostCard
              data={post}
              key={post.id}
            />
          )          
        }
      </div>
    </section>
  );
}
 
export default Home;