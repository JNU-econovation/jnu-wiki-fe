import styled from 'styled-components'
const TitleBox = ({title,data}) => {
    return (
        <TitleBoxCss>
            {title}
            {data?.length>0 ?<Circle backgroundColor='#216D32'></Circle>:<Circle backgroundColor='#B6B6B6'></Circle>}
        </TitleBoxCss>
    );
};
const TitleBoxCss=styled.div`
    display: flex;
    border-bottom: 2px solid #F5F6FA;
    font-size: 16px;
    padding: 0 0 1rem 2rem;
    align-items: center;
    
`
const Circle=styled.span`
    border-radius: 1000000000000px;
    width: 0.5rem;
    height: 0.5rem;
    margin-left: 0.7rem;
    background-color:${(props) => props.backgroundColor};

`
export default TitleBox;