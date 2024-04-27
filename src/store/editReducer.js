const editState = {
  isEdit: false,
};

const editReducer = (state = editState, action) => {
  switch (action.type) {
    case "enableEdit":
      return {
        isEdit: true,
      };
    case "disableEdit":
      return {
        isEdit: false,
      };
    default:
      return state;
  }
};

export default editReducer;
