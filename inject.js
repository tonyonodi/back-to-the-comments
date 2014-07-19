function receiveMessage(event) {
  console.log(event.origin);
  console.log(event.data);
}


window.addEventListener("message", receiveMessage, false);
