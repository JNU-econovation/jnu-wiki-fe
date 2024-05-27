import ToggleBtn from "@/components/common/button/ToggleBtn";
import MainLayout from "@/components/common/layout/MainLayout";
import CreateDocument from "@/components/createDocument/CreateDocument";
import MapWithClickEvent from "@/components/map/MapWithClickEvent";
import { useState } from "react";

const AddPost = () => {
  const [toggle, setToggle] = useState(true);

  const clickToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <>
      <MainLayout onClick={clickToggle} />
      {toggle && <CreateDocument />}
      <ToggleBtn toggle={toggle} onClick={clickToggle} />
      <MapWithClickEvent isEdit={true} />
    </>
  );
};

export default AddPost;
