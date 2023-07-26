const latLngState = {
  requestLat: undefined,
  requestLng: undefined,
};

const requestLatLngReducer = (state = latLngState, action) => {
  switch (action.type) {
    case "requestLatLng":
      return {
        requestLat: action.payload.requestLat,
        requestLng: action.payload.requestLng,
      };
    default:
      return state;
  }
};

export default requestLatLngReducer;
