import { useContext } from "react";

import PostsContext from "../contexts/PostsContext";
import { PostsContextTypes } from "../../types";
import PostCard from "../UI/molecules/PostCard";

const Home = () => {

  const { posts } = useContext(PostsContext) as PostsContextTypes;

  return (
    <section>
      <h2>Home</h2>
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
    </section>
  );
}
 
export default Home;