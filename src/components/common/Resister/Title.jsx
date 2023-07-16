
import styled from "styled-components";

const Title = ({ children, fontSize, margin }) => {
    return (
        <>
            <TitleStyle
                fontSize={fontSize} margin={margin}>
                {children}
            </TitleStyle>
        </>
    );
};

const TitleStyle = styled.p`
    color: #216D32; 
    font-size:  ${props => props.fontSize} ;
    margin:${props => props.margin};
    
    `

export default Title;