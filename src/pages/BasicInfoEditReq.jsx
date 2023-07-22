import { useParams } from "react-router-dom";
const BasicInfoEditReq = () => {
    const { id } = useParams()
    return (
        <div>
            이 페이지의 아이디는 {id} 입니다.
        </div>
    );
};

export default BasicInfoEditReq;