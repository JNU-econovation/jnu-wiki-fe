import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";

const ScrapBtn = ({ onClick, scrap, className }) => {
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <div onClick={onClick} className={className}>
      {isLogin && scrap ? (
        <AiFillHeart size="1.2rem" color="#216d32" />
      ) : (
        isLogin && <AiOutlineHeart size="1.2rem" color="#216d32" />
      )}
    </div>
  );
};

export default ScrapBtn;
