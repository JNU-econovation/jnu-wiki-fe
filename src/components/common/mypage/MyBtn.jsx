import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Btn = styled.button`
   
    font-size: 16px;
    background-color: #216D32;
    color:white;

    width: 150px;
    height: 3rem;
    margin: 1rem 0 3rem 0;

    border-radius: 0.3rem;
`

const MyBtn = ({ route, children }) => {
    const navigate = useNavigate();
    return (
        <Btn onClick={() => { navigate(route); }}>
            {children}
        </Btn>
    )
}

export default MyBtn;