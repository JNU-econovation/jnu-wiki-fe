import styled from "styled-components";

const Question = ({ para, children, onClick }) => {
  return (
    <QuestionStyle>
      {para}
      <QuestionBtnStyle onClick={onClick}>{children}</QuestionBtnStyle>
    </QuestionStyle>
  );
};

const QuestionStyle = styled.p`
  display: flex;

  color: #7d7d7d;
  font-size: 15px;
  margin-bottom: 2rem;
  @media screen and (max-width: 1023px) {
    margin-bottom: 5rem;
  }
`;
const QuestionBtnStyle = styled.p`
  color: #216d32;
  font-size: 15px;
  margin-left: 1rem;
  cursor: pointer;
`;

export default Question;
