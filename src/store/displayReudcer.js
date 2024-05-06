const displayState = {
  isDisplay: true,
};

const displayReducer = (state = displayState, action) => {
  switch (action.type) {
    case "enableDisplay":
      return {
        isDisplay: true,
      };
    case "disableDisplay":
      return {
        idDisplay: false,
      };
    default:
      return state;
  }
};

export default displayReducer;
