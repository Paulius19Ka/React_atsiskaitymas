import styled from "styled-components";
import { Post, User, UsersContextTypes } from "../../../types";
import { useContext, useEffect, useState } from "react";
import UsersContext from "../../contexts/UsersContext";

type Props = {
  data: Post
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 90%;
  background-color: black;
  padding: 10px 20px;
  border-radius: 15px;

  > div.userInfo{
    display: flex;
    justify-content: space-around;
    align-items: center;

    > img{
      height: 50px;
      width: 50px;
      object-fit: cover;
    }
  }

  > div.cardContent{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    > img{
      width: 200px;
      height: 200px;
      object-fit: cover;
    }
  }
`;

const PostCard = ({ data }: Props) => {

  const { loggedInUser, findUserById } = useContext(UsersContext) as UsersContextTypes;
  const [creator, setCreator] = useState<User | undefined>(undefined);

  const findCreator = () => {
    const foundUser = findUserById(data.posterId);
    setCreator(foundUser as User);
  };

  useEffect(() => {
    findCreator();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <StyledDiv>
      <div className="userInfo">
        {
          creator?.avatar ?
          <img src={creator.avatar} alt={creator.username} /> :
          <img src='https://t3.ftcdn.net/jpg/08/05/28/22/360_F_805282248_LHUxw7t2pnQ7x8lFEsS2IZgK8IGFXePS.jpg' alt='placeholder profile picture' />
        }
        <span>{creator?.username}</span>
        <span>{data.dateOfPost.substring(0, 10)}</span>
      </div>
      <div className="cardContent">
        <span>{data.title}</span>
        <img src={data.picture} alt={data.title} />
        <p>{data.content}</p>
      </div>
      <div className="actions">
        {
          loggedInUser ?
          <button>Save</button> :
          <></>
        }
        {
          loggedInUser?.id === data.posterId ?
          <button>Delete</button> :
          <></>
        }
      </div>
    </StyledDiv>
  );
}
 
export default PostCard;