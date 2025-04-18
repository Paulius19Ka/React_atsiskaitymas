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
  background-color: var(--background-main-dark);
  padding: 20px 20px;
  border-radius: 15px;

  &:hover{
    box-shadow: 0px 0px 20px var(--background-tertiary);
  }

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
      background-color: var(--button-main);

      &:hover{
        cursor: pointer;
        background-color: var(--accent-main);
      }
    }

    > div{
      display: flex;
      gap: 5px;

      > span{
        color: var(--accent-main);
        font-size: 0.8rem;
        align-self: center;
      }

      > button{
        min-width: 50px;
        border: none;
        border-radius: 10px;
        padding: 5px 10px;
        font-size: 1rem;
        background-color: var(--button-main);

        &:hover{
          cursor: pointer;
          background-color: var(--accent-main);
        }
      }
      > button.yes{

        &:hover{
          background-color: var(--message-success);
        }
      }

      > button.no{

        &:hover{
          background-color: var(--message-error);
        }
      }
    }
  }

  @media (min-width: 768px){
    width: 400px;
    height: 450px;

    > div.cardContent{

      > p{
        height: 70px;
        overflow-y: auto;
        scrollbar-color: var(--accent-main) var(--background-secondary);
        scrollbar-width: thin;
      }
    }
  }
`;

const PostCard = ({ data }: Props) => {

  const { loggedInUser, findUserById, savePostToggle } = useContext(UsersContext) as UsersContextTypes;
  const { deletePost } = useContext(PostsContext) as PostsContextTypes;
  const [creator, setCreator] = useState<User | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

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
        <span>{data.dateOfPost.substring(0, 10)}, {data.dateOfPost.substring(11, 15)}</span>
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
          (
            !deleteConfirm ?
            <div>
              <button onClick={() => setDeleteConfirm(true)}>Delete</button>
            </div> :
            <div>
              <span>Delete this post?</span>
              <button onClick={() => deletePost(data.id)} className="yes">Yes</button>
              <button onClick={() => setDeleteConfirm(false)} className="no">No</button>
            </div>
          )
        }
      </div>
    </StyledDiv>
  );
}
 
export default PostCard;