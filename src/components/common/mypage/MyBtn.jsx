import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Btn = styled.button`
   
    font-size: 16px;
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.color};

    width: 150px;
    height: 3rem;
    margin: 1rem 0 3rem 0;

    border-radius: 0.3rem;
    border: ${(props) => props.border};`

const MyBtn = ({ route, children, color, backgroundColor, border,onClick}) => {
    const navigate = useNavigate();
    return (
        <Btn border={border} color={color} backgroundColor={backgroundColor} onClick={onClick}>
            {children}
        </Btn>
    )
}

export default MyBtn;