import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const ScrapBtn = ({ onClick, scrap }) => {
  return (
    <>
      <div onClick={onClick}>
        {scrap ? (
          <AiFillHeart size="1.2rem" color="#216d32" />
        ) : (
          <AiOutlineHeart size="1.2rem" color="#216d32" />
        )}
      </div>
    </>
  );
};

export default ScrapBtn;
