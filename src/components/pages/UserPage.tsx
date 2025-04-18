import { useContext } from "react";
import UsersContext from "../contexts/UsersContext";
import { PostsContextTypes, UsersContextTypes } from "../../types";
import PostsContext from "../contexts/PostsContext";
import PostCard from "../UI/molecules/PostCard";
import styled from "styled-components";

const StyledSection = styled.section`
  > div{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  > h2{
    text-align: center;
    font-size: 1.6rem;
    margin: 10px 0px;
  }

  @media (min-width: 768px){
    > div{
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: center;
    }
  }
`;

const UserPage = () => {

  const { loggedInUser } = useContext(UsersContext) as UsersContextTypes;
  const { posts, loading } = useContext(PostsContext) as PostsContextTypes;

  return (
    <StyledSection>
      <h2>{loggedInUser?.username}'s Saved Posts</h2>
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
    </StyledSection>
  );
}
 
export default UserPage;