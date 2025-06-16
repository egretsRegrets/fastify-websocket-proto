const _ws = new WebSocket(`ws://localhost:3000/chat?username=long-legs`);
_ws.onmessage = (message) => {
  const msg = JSON.parse(message.data);
  console.log(msg);
};
