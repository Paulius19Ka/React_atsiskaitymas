import { useContext, useEffect, useState } from "react";
import UsersContext from "../contexts/UsersContext";
import { PostsContextTypes, UsersContextTypes } from "../../types";
import PostsContext from "../contexts/PostsContext";
import PostCard from "../UI/molecules/PostCard";

const UserPage = () => {

  const { loggedInUser } = useContext(UsersContext) as UsersContextTypes;
  const { posts } = useContext(PostsContext) as PostsContextTypes;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(posts !== undefined && posts !== null && posts.length > 0){
      setLoading(false);
    };
  }, [posts]);

  return (
    <section>
      <h2>UserPage</h2>
      <span>{loggedInUser?.username}</span>
      <div>
        {
          !loggedInUser || loading ?
          <img src='/media/loadingCircle.gif' alt='loading circle animation' /> :
          posts.length === 0 ?
          <p>No posts to display</p> :
          loggedInUser.savedPosts?.length === 0 ?
          <p>No saved posts</p> :
          posts.filter(post => loggedInUser.savedPosts.includes(post.id)).map(post =>
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
 
export default UserPage;