import { useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";

import { Children } from "./Children";

import useSocketStore from "./../store/useSocketStore";

const API_URL = "http://localhost:8080";

function App() {
  const setSocket = useSocketStore((state) => state.setSocket);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socketConnect = io(API_URL);
    setSocket(socketConnect);
    socketRef.current = socketConnect;

    socketRef.current.on("connect", () => {
      socketRef.current?.emit("send_socket_id", "App");
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [setSocket]);

  return (
    <>
      <div>parent</div>
      <Children />
    </>
  );
}

export default App;
