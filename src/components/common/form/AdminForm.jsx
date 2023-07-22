
import styled from 'styled-components'
import Title from '../Resister/Title';
import Contain from '../admin/Contain';
import AdminBox from '../admin/AdminBox';

const AdminForm = () => {
    return (
        <>
            <Contain>
                <Title fontSize='33px' margin='0 0 2rem 1rem'>관리자 페이지</Title>
                <AdminBox/>
            </Contain>
        </>
        
    );
};

export default AdminForm;