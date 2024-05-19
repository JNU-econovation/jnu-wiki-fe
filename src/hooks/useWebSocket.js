import { client } from "@/services/stomp";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useWebSocket = (isEdit) => {
  const [stomp, setStomp] = useState(null);
  const { memberId } = useSelector((state) => state.user);

  const disconnect = () => {
    if (stomp?.connected) {
      stomp.deactivate();
    }
  };

  const publish = (docsId) => {
    if (stomp?.connected) {
      stomp.publish({
        destination: "/app/info",
        body: JSON.stringify({ docsId, memberId }),
      });
    }
  };

  useEffect(() => {
    if (isEdit) {
      client.activate();
      setStomp(client);

      client.onConnect = () => {
        client.subscribe("/user/queue/info", () => {});
      };
    }

    return () => disconnect();
  }, [isEdit]);

  return { publish };
};
