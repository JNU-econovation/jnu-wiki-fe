import { logoutState } from "@/store/userReducer";
import { popUpLogout } from "@/utils/alert";
import { removeCookie } from "@/services/cookie";
import { useDispatch } from "react-redux";
import { SlLogout } from "react-icons/sl";

const Logout = () => {
  const dispatch = useDispatch();

  const logOutUser = () => {
    localStorage.clear();
    removeCookie("refresh-token");
    dispatch(logoutState());
    location.reload();
  };

  const clickLogout = () => {
    popUpLogout().then((result) => {
      if (result.isConfirmed) {
        logOutUser();
      }
    });
  };
  return (
    <button className="logout-btn" onClick={clickLogout}>
      <SlLogout size={"21px"} />
    </button>
  );
};

export default Logout;
