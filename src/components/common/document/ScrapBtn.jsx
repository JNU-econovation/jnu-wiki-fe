import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const ScrapBtn = ({ onClick, scrap }) => {
  return (
    <>
      <div onClick={onClick}>
        {scrap ? <AiFillHeart /> : <AiOutlineHeart />}
      </div>
    </>
  );
};

export default ScrapBtn;
