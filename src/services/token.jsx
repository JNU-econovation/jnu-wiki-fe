import axios from "axios";

export const accessToken = () => {
  axios.post(
    "https://port-0-jnu-wiki-be-jvpb2alnsrolbp.sel5.cloudtype.app/members/access-token"
  );
};
