import { useEffect, useRef } from "react";
import { Socket, io } from "socket.io-client";

const API_URL = "http://localhost:8080";

const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(API_URL);

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return { socketRef };
};

export default useSocket;
