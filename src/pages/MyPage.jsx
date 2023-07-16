import Sidebar from "../components/common/layout/Sidebar.jsx";
import Header from "../components/common/layout/Header.jsx";
import MypageForm from "../components/common/form/MypageForm.jsx";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import routes from "../routes.js";

const token = localStorage.getItem('token');

const MyPage = () => {
    // const navigate = useNavigate();
    return (
        <>
            <Sidebar></Sidebar>
            <Header></Header>
            {/* <MypageForm /> */}
            {token ? <MypageForm></MypageForm>
                : Swal.fire({
                    icon: 'info',
                    title: '로그인 후 이용 가능합니다.',
                    text: '로그인 하시겠습니까?',
                    showCancelButton: true,
                    confirmButtonText: '예', // confirm 버튼 텍스트 지정
                    cancelButtonText: '아니오',
                    confirmButtonColor: '#429f50',
                    cancelButtonColor: '#d33',

                }).then(result => {
                    if (result.isConfirmed) {
                        location.href = routes.login
                    } else if (result.isDismissed) {
                        location.href = routes.home
                    }

                })}
        </>
    );
};



export default MyPage;