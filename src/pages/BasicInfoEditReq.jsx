import { useParams } from "react-router-dom";
import MainLayout from "../components/common/layout/MainLayout";
const BasicInfoEditReq = () => {
    const { id } = useParams()
    return (
        <>
        <MainLayout>
            이 페이지의 아이디는 {id} 입니다.
        </MainLayout></>
        
    );
};

export default BasicInfoEditReq;