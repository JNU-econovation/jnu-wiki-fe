import { stomp } from "@/services/stomp";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useWebSocket = (isEdit) => {
  const [stompClient, setStompClient] = useState(null);
  const { memberId } = useSelector((state) => state.user);

  const disconnect = () => {
    if (stompClient?.connected) {
      stompClient.deactivate();
    }
  };

  const publish = (docsId) => {
    if (stompClient?.connected) {
      stompClient.publish({
        destination: "/app/info",
        body: JSON.stringify({ docsId, memberId }),
      });
    }
  };

  useEffect(() => {
    if (isEdit) {
      stomp.activate();
      setStompClient(stomp);

      stomp.onConnect = () => {
        stomp.subscribe("/user/queue/info", () => {});
      };
    }

    return () => disconnect();
  }, [isEdit]);

  return { publish };
};
