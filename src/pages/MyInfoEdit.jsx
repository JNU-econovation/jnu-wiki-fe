import Sidebar from "../components/common/layout/Sidebar.jsx";
import Header from "../components/common/layout/Header.jsx";
import MyInfoEditForm from "../components/common/form/MyInfoEditForm.jsx";
const MyInfoEdit = () => {
    return (
        <div>
            <Sidebar></Sidebar>
            <Header></Header>
            <MyInfoEditForm></MyInfoEditForm>
        </div>
    );
};

export default MyInfoEdit;