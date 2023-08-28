import styled from "styled-components";

const Question = ({ para, children, onClick }) => {
  return (
    <QuestionStyle>
      {para}
      <QuestionBtnStyle onClick={onClick}>{children}</QuestionBtnStyle>
    </QuestionStyle>
  );
};

const QuestionStyle = styled.div`
  display: flex;
  justify-content: center;

  color: #7d7d7d;
  font-size: 15px;
`;
const QuestionBtnStyle = styled.div`
  color: #216d32;
  font-size: 15px;
  margin-left: 1rem;
  margin-bottom: 5rem;
`;

export default Question;
