
import styled from "styled-components";

const Title = ({ children, fontSize }) => {
    return (
        <>
            <TitleStyle
                fontSize={fontSize}>
                {children}
            </TitleStyle>
        </>
    );
};

const TitleStyle = styled.p`
    color: #216D32; 
    font-size:  ${props => props.fontSize} ;
    &:nth-child(2){
        margin-bottom: 3rem;
    };

    &:first-child{
        margin:4.5rem 0 1rem 0;
    }
    
    `

export default Title;