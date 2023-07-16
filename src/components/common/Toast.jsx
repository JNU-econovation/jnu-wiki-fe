
import styled from 'styled-components'

const ToastCss = styled.div`
    width: 20rem;
    height: 15rem;
    box-shadow: 0px 4px 64px rgba(0, 0, 0, 0.05);
    background-color: aquamarine;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
    align-items: center;
    position: relative;
    margin:0 auto;
  
`
const Btn = styled.div`
    width:20rem;
    display: flex;
    justify-content:space-around;
    position: relative;
  
`;
const Button = styled.button`
    width: 5rem;
    background-color: #7b918a;
    height: 2rem;
  
`;
const P = styled.p`
    font-size: 20px;
  
`;

const Toast = ({ children }) => {
    return (
        <ToastCss>
            <P>{children}</P>
            <Btn>
                <Button>예</Button>
                <Button>아니요</Button>
            </Btn>
        </ToastCss>
    );
};

export default Toast;