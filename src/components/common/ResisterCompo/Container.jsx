import styled from "styled-components";





const Container = ({ children }) => {
    return (

        <ContainerCss>{children}</ContainerCss>
    )
}


const ContainerCss = styled.div`
    background-color: #ffffff;
    border: 0.5px solid #878787;
    border-radius: 0.5rem;
    //밖그림자
    box-shadow: 0px 4px 64px rgba(0, 0, 0, 0.05);

    width: 26rem;
    padding:0 3rem 0 3rem;

    display: flex;
    justify-content: end;
    flex-direction: column;

    position: relative;
    left: 30rem;
    top:3rem;


`


export default Container;

