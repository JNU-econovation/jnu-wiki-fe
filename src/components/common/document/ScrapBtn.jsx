import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const ScrapBtn = ({ onClick, scrap }) => {
  return (
    <>
      <div onClick={onClick}>
        {scrap ? (
          <AiFillHeart color="#216d32" />
        ) : (
          <AiOutlineHeart color="#216d32" />
        )}
      </div>
    </>
  );
};

export default ScrapBtn;
