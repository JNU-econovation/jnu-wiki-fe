import { CENTER } from "@/constant/map";

const initLocation = {
  swLatlng: undefined,
  neLatlng: undefined,
  center: { lat: CENTER.LATITUDE, lng: CENTER.LONGITUDE },
  level: 4,
};

const boundReducer = (state = initLocation, action) => {
  switch (action.type) {
    case "getMapInfo":
      return {
        swLatlng: action.payload.swLatlng,
        neLatlng: action.payload.neLatlng,
        center: action.payload.center,
        level: action.payload.level,
      };

    default:
      return state;
  }
};

export default boundReducer;
