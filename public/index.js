const _ws = new WebSocket(
  `ws://${window.location.host}/chat?username=long-legs`
);
_ws.onmessage = (message) => {
  const msg = JSON.parse(message.data);
  console.log(msg);
};
