function receiveMessage(event) {
  console.log("got that message!");
}


window.addEventListener("message", receiveMessage, false);
