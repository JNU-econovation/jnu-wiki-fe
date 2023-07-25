const addressState = {
  address: undefined,
};

const addressReducer = (state = addressState, action) => {
  switch (action.type) {
    case "getAddress":
      return {
        address: action.payload,
      };
    case "clearAddress":
      return {
        address: "",
      };
    default:
      return state;
  }
};

export default addressReducer;
