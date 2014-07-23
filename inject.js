function receiveMessage(event) {
	var commentPath,
		iframeURL;

	// get url of comment
	commentPath = event.data.commentURL;
	iframeURL 	= "https://news.ycombinator.com/" + commentPath;
}

var drawIframe = function( URL ) {
	var frameset,
		pageURL,
		pageFrame,
		commentFrame,
		html,
		body;

	html = document.querySelector( "html" );
	body = document.querySelector( "body" );
	frameset = document.createElement( "frameset" );
	pageFrame = document.createElement( "frame" );
	commentFrame = document.createElement( "frame" );
	pageFrame.setAttribute( "id", "page-frame" );
	commentFrame.setAttribute( "id", "comment-frame" );
	pageURL = document.URL;

	if ( body )
		body.parentNode.removeChild( body );

	frameset.appendChild( pageFrame );
	frameset.appendChild( commentFrame );
	html.appendChild( frameset );

	pageFrame.setAttribute( "src", pageURL );
}

drawIframe();
window.addEventListener("message", receiveMessage, false);