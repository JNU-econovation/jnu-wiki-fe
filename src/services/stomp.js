import * as StompJs from "@stomp/stompjs";

export const stomp = new StompJs.Client({
  brokerURL: "ws://3.12.77.172:8080/api/connect",
  debug: (str) => {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});
