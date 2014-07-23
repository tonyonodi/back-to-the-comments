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

	html = document.querySelector( "html" );
	body = document.querySelector( "body" );
	frameset = document.createElement( "frameset" )
	pageFrame = document.createElement( "frame" );
	commentFrame = document.createElement( "frame" );

	body.parentNode.removeChild( body );
	frameset.appendChild( pageFrame );
	frameset.appendChild( commentFrame );
	html.appendChild( frameset );
}

drawIframe(  );

window.addEventListener("message", receiveMessage, false);