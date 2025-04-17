import { useContext } from "react";
import UsersContext from "../contexts/UsersContext";
import { PostsContextTypes, UsersContextTypes } from "../../types";
import PostsContext from "../contexts/PostsContext";
import PostCard from "../UI/molecules/PostCard";

const UserPage = () => {

  const { loggedInUser } = useContext(UsersContext) as UsersContextTypes;
  const { posts } = useContext(PostsContext) as PostsContextTypes;

  return (
    <section>
      <h2>UserPage</h2>
      <span>{loggedInUser?.username}</span>
      <div>
        {
          !loggedInUser || !posts ?
          <p>Loading</p> :
          loggedInUser.savedPosts?.length ?
          posts.filter(post => loggedInUser.savedPosts.includes(post.id)).map(post =>
            <PostCard
              data={post}
              key={post.id}
            />
          ) :
          <p>No saved posts</p>
        }
      </div>
    </section>
  );
}
 
export default UserPage;