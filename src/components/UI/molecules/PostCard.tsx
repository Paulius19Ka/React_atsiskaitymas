import { Post } from "../../../types";

type Props = {
  data: Post
}

const PostCard = ({ data }: Props) => {



  return (
    <div>{data.content}</div>
  );
}
 
export default PostCard;