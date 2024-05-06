import { PiPlusBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AddPostBtn = () => {
  const navigate = useNavigate();

  return (
    <Button>
      <Label className="label">새 문서 작성</Label>
      <PlusBtn onClick={() => navigate("/add-post")} />
    </Button>
  );
};

const Button = styled.section`
  position: absolute;
  bottom: 5%;
  right: 5%;

  display: flex;
  justify-content: center;

  &:hover .label {
    visibility: visible;
    opacity: 1;
    transform: translateY(-20px);
  }
`;

const PlusBtn = styled(PiPlusBold)`
  padding: 1rem;
  margin-top: 1rem;
  font-size: 2rem;
  cursor: pointer;

  border-radius: 999999px;
  box-shadow: 0px 2px 13px 0px rgba(0, 0, 0, 0.306);
  background-color: white;
`;

const Label = styled.label`
  visibility: hidden;

  position: absolute;
  width: 8rem;

  text-align: center;
  font-weight: 700;
  font-size: 1.1rem;

  opacity: 0;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
`;

export default AddPostBtn;
