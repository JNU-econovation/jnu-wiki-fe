const addressState = {
  address: undefined,
  initialAddress: undefined,
};

const addressReducer = (state = addressState, action) => {
  switch (action.type) {
    case "getAddress":
      return {
        ...state,
        address: action.payload.address,
      };
    case "initialAddress":
      return {
        ...state,
        initialAddress: action.payload.initialAddress,
      };
    case "clearAddress":
      return {
        ...state,
        address: "",
      };
    default:
      return state;
  }
};

export default addressReducer;
