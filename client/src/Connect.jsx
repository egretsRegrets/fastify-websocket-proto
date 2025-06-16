import { useState, useEffect } from "react";

const Connect = () => {
  const [username, setUsername] = useState(null);
  const [_ws, setWs] = useState(null);

  useEffect(() => {
    if (!!_ws) {
      _ws.close(1000);
    }
    if (!!username) {
      const socket = new WebSocket(
        `ws://localhost:3000/chat?username=${username}`
      );
      socket.onmessage = (message) => {
        const msg = JSON.parse(message.data);
        console.log(msg);
      };
      setWs(socket);
    }
  }, [username]);

  function connect(formData) {
    setUsername(formData.get("username"));
  }

  return (
    <form action={connect}>
      <input type="text" name="username" placeholder="username..." />
      <button>Connect</button>
    </form>
  );
};

export default Connect;
