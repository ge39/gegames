import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

export default function OnlineCounter() {
  const [onlineUsers, setOnlineUsers] = useState(0);

  useEffect(() => {
    // Conecta ao WebSocket no lado do cliente
    socket = io({
      path: "/api/socket",
    });

    // Atualiza o total de usuários online
    socket.on("online-users", (count) => {
      setOnlineUsers(count);
    });

    return () => {
      socket.disconnect(); // Desconecta ao desmontar o componente
    };
  }, []);

  return (
    <div style={{fontSize:"12px", textAlign:"center",backgroundColor:"#fafafa",width:"100%",marginTop:"0",padding:"5px",borderRadius:"5px",zIndex:999}}>
      <span style={{color:"red"}}>Online Counter: </span>
      <span>user(s) online: {onlineUsers} </span>
    </div>
  );
}
