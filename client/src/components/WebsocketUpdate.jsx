import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";
import { setUser } from "../app/userSlice";

const socketUrl = (import.meta.env.VITE_SERVER_URL ?? "").replace("/api/v1", "");
const socket = io(socketUrl);

const WebsocketUpdate = () => {
    const dispatch=useDispatch()
  useEffect(() => {
    socket.on("activeUsers", (count) => {
      dispatch(setUser({totalPlayers:count}));
    });

    return () => {
      socket.off("activeUsers");
    };
  }, []);
  return <></>;
};

export default WebsocketUpdate;
