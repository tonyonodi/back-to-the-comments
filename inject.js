function receiveMessage(event) {
	var commentPath,
		iframeURL;

	// get url of comment
	commentPath = event.data.commentURL;
	iframeURL 	= "https://news.ycombinator.com/" + commentPath;

	// create frame
	drawIframe(  );
}

var drawIframe = function( URL ) {
	var frameset,
		pageFrame,
		commentFrame,
		html,
		body;

	// get html
	html = document.querySelector( "html" );
	// get body
	body = document.querySelector( "body" );

	body.parentNode.removeChild(body);

}

drawIframe(  );

window.addEventListener("message", receiveMessage, false);