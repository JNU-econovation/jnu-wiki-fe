
import styled from "styled-components";
import { useState ,useEffect} from "react";

const TextTitleP = styled.p`
  font-weight: 600;
  font-size: 15px;
  color:#216D32;
  width: 5rem;

 margin-bottom: 1.5rem;
`;
const TextP = styled.p`
font-weight: 200;
font-size: 15px;
color:#000000;

margin-bottom: 1.5rem;
text-decoration: ${({textDecoration}) => (textDecoration? 'line-through' : null)};
`;
const ModifyP = styled.p`
font-weight: 200;
font-size: 15px;
color:#ff0000;

margin-bottom: 1.7rem;
`;
const EditBox = styled.div`
 display: flex;
 width: 20rem;
`;


const EditInfo = ({children,child,modify,address,textDecoration}) => {
//정보들 다 가져와서 만약에 정보가 다르면 modify 활성
//if child!= modify => modify,textdecorations 라는 usestate true 
    return (
        <EditBox>
            {children?
                 <TextTitleP>{children}</TextTitleP>
                 :null
            }
           
            <div>
                {child?
               <TextP textDecoration={
                modify&&modify!=child&&modify!=address ?
                textDecoration:false
            }>{child}</TextP>
                :null}
                
                {address?
                <TextP textDecoration={modify&&modify!=child&&modify!=address ?
                    textDecoration:false}>{address}</TextP>
                :null}

                {modify&&modify!=child&&modify!=address ?
                    <ModifyP>{modify}</ModifyP>
                    :
                    null}
            </div>
        </EditBox>
    );
};

export default EditInfo;