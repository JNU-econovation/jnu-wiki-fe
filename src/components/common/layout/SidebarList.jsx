import styled from "styled-components";
import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom";
import routes from "../../../routes";

const MenuStyle = styled.div`
    display:flex;
    align-items: center;
    list-style-type: none;
    background-color : white;
    color:rgba(95, 150, 107, 1);

    width : 17rem;
    margin :0.5rem;
    height:3rem;
    border-radius:0.2rem;
    font-size: 1rem;


    &:first-child {
        margin-top:2rem;
    }


    &:hover{  
        background-color : rgba(222, 233, 224, 1);
        color :rgba(33, 109, 50, 1);
        font-size:1rem;
        font-weight: 600;
      }

    `
const MenuIcon = styled.div`
    font-size: 2rem;
    padding:0 1rem;
`


const MenuList = ({ name, icons, route }) => {
    const navigate = useNavigate();
    return (
        <>
            <MenuStyle onClick={() => { navigate(route); }}>
                <MenuIcon>{icons}</MenuIcon>
                {name}
            </MenuStyle>
        </>
    );
};

MenuList.propTypes = {
    name: PropTypes.string,


}

export default MenuList;