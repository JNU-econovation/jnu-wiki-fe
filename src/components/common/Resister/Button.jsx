import styled from "styled-components";

const Btn = styled.button`
   
    font-size: 16px;
    background-color: #216D32;
    color:white;

    width: 423px;
    height: 3rem;
    margin:${props => props.margin};

    border-radius: 0.3rem;
`

const Button = ({ onClick, children, margin }) => {
    return (
        <Btn margin={margin} onClick={(e) => {
            e.preventDefault();
            onClick();
        }}>
            {children}
        </Btn>
    )
}

export default Button;