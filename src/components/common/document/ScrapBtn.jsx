import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const ScrapBtn = ({ onClick, scrap }) => {
  return (
    <>
      <div onClick={onClick}>
        {!scrap ? <AiOutlineHeart /> : <AiFillHeart />}
      </div>
    </>
  );
};

export default ScrapBtn;
