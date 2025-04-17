import { useContext } from "react";

import PostsContext from "../contexts/PostsContext";
import { PostsContextTypes } from "../../types";
import PostCard from "../UI/molecules/PostCard";

const Home = () => {

  const { posts } = useContext(PostsContext) as PostsContextTypes;

  return (
    <section>
      <h2>Home</h2>
      <div>
        {
          posts ?
          posts.map(post =>
            <PostCard
              data={post}
              key={post.id}
            />
          ) :
          <p>Loading gif</p>
        }
      </div>
    </section>
  );
}
 
export default Home;