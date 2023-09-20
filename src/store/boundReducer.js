const initLocation = {
  swLatlng: undefined,
  neLatlng: undefined,
};

const boundReducer = (state = initLocation, action) => {
  switch (action.type) {
    case "getSwNe":
      return {
        swLatlng: action.payload.swLatlng,
        neLatlng: action.payload.neLatlng,
      };
    default:
      return state;
  }
};

export default boundReducer;
