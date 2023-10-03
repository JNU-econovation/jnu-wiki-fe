import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const ScrapBtn = ({ onClick, scrap }) => {
  const token = localStorage.getItem("token");

  return (
    <>
      <div onClick={onClick}>
        {token && scrap ? (
          <AiFillHeart size="1.2rem" color="#216d32" />
        ) : (
          token && <AiOutlineHeart size="1.2rem" color="#216d32" />
        )}
      </div>
    </>
  );
};

export default ScrapBtn;
