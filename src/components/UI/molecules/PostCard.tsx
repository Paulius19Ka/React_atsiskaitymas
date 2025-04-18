import styled from "styled-components";
import { Post, PostsContextTypes, User, UsersContextTypes } from "../../../types";
import { useContext, useEffect, useState } from "react";
import UsersContext from "../../contexts/UsersContext";
import PostsContext from "../../contexts/PostsContext";

type Props = {
  data: Post
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 90%;
  background-color: #171717;
  padding: 20px 20px;
  border-radius: 15px;

  > div.userInfo{
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div{
      display: flex;
      align-items: center;
      gap: 10px;

      > img{
        height: 30px;
        width: 30px;
        object-fit: cover;
        border-radius: 30px;
      }
    }
  }

  > div.cardContent{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    > img{
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 15px;
    }

    > p{
      margin: 5px 0;
      width: 100%;

      overflow-wrap: break-word;
    }
  }

  > div.actions{
    display: flex;
    align-items: center;
    justify-content: space-between;

    > button{
      border: none;
      border-radius: 10px;
      padding: 5px 10px;
      font-size: 1rem;
      background-color: #5d5d5d;

      &:hover{
        cursor: pointer;
        background-color: #939393;
      }
    }
  }

  @media (min-width: 768px){
    width: 400px;
  }
`;

const PostCard = ({ data }: Props) => {

  const { loggedInUser, findUserById, savePostToggle } = useContext(UsersContext) as UsersContextTypes;
  const { deletePost } = useContext(PostsContext) as PostsContextTypes;
  const [creator, setCreator] = useState<User | null>(null);

  useEffect(() => {
    const foundUser = findUserById(data.posterId);
    setCreator(foundUser as User);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.posterId]);

  return (
    <StyledDiv>
      <div className="userInfo">
        <div>
          {
            creator?.avatar ?
            <img src={creator.avatar} alt={creator.username} /> :
            <img src='https://t3.ftcdn.net/jpg/08/05/28/22/360_F_805282248_LHUxw7t2pnQ7x8lFEsS2IZgK8IGFXePS.jpg' alt='placeholder profile picture' />
          }
          <span>{creator?.username}</span>
        </div>
        <span>{data.dateOfPost.substring(0, 10)}</span>
      </div>
      <div className="cardContent">
        <span>{data.title}</span>
        <img src={data.picture} alt={data.title} />
        <p>{data.content}</p>
      </div>
      <div className="actions">
        {
          loggedInUser?.savedPosts.includes(data.id) ?
          <button onClick={() => savePostToggle(data.id)}>Unsave</button> :
          <button onClick={() => savePostToggle(data.id)}>Save</button>
        }
        {
          loggedInUser?.id === data.posterId &&
          <button onClick={() => deletePost(data.id)}>Delete</button>
        }
      </div>
    </StyledDiv>
  );
}
 
export default PostCard;