const latLngState = {
  latitude: undefined,
  longitude: undefined,
  center: undefined,
};

const latLngReducer = (state = latLngState, action) => {
  switch (action.type) {
    case "getLatLng":
      return {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    case "getCenter":
      return {
        center: action.payload.center,
      };
    default:
      return state;
  }
};

export default latLngReducer;
