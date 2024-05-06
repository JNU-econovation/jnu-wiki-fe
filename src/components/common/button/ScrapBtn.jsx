import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

const ScrapBtn = ({ onClick, isScraped, className }) => {
  const isLogin = useSelector((state) => state.user.isLogin);

  return (
    <section onClick={onClick} className={className}>
      {isLogin && (isScraped ? <StyledFill /> : <StyledOut />)}
    </section>
  );
};

const baseStyles = css`
  font-size: 1.5rem;
  color: #216d32;
  cursor: pointer;
`;

const StyledFill = styled(AiFillHeart)`
  ${baseStyles}
`;

const StyledOut = styled(AiOutlineHeart)`
  ${baseStyles}
`;

export default ScrapBtn;
