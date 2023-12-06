const latLngState = {
  latitude: undefined,
  longitude: undefined,
};

const latLngReducer = (state = latLngState, action) => {
  switch (action.type) {
    case "getLatLng":
      return {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    default:
      return state;
  }
};

export default latLngReducer;
