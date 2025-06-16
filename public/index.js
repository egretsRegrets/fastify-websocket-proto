const _ws = new WebSocket(
  `ws://${window.location.host}/chat?username=long-legs`
);
_ws.onmessage = (message) => {
  message = JSON.parse(message.data);
  appendMessage(message);
};
