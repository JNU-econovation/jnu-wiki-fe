export const handlePasswordVisible = (e) => {
  setpwVisible(() => {
    if (pwVisible.visible) {
      return {
        type: "password",
        visible: false,
        icons: <AiFillEyeInvisible />,
      };
    } else {
      return { type: "text", visible: true, icons: <AiFillEye /> };
    }
  });
};
