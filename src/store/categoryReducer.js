const categoryState = {
  address: undefined,
};

const categoryReducer = (state = categoryState, action) => {
  switch (action.type) {
    case "getCategory":
      return {
        category: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
