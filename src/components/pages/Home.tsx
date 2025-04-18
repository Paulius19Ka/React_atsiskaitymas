import { useContext } from "react";

import PostsContext from "../contexts/PostsContext";
import { PostsContextTypes } from "../../types";
import PostCard from "../UI/molecules/PostCard";
import styled from "styled-components";

const StyledSection = styled.section`
  > div{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  @media (min-width: 768px){
    > div{
      display: flex;
      
    }
  }

  @media (min-width: 1000px){
    > div{
      display: grid;
      grid-template-columns: 400px 400px 400px;
      justify-content: center;
      
    }
  }
`;

const Home = () => {

  const { posts, loading } = useContext(PostsContext) as PostsContextTypes;

  return (
    <StyledSection>
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
    </StyledSection>
  );
}
 
export default Home;