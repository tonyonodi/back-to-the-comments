function receiveMessage(event) {
	var commentPath,
		frameURL;

	// get url of comment
	commentPath = event.data.commentURL;
	frameURL 	= "https://news.ycombinator.com/" + commentPath;

	showComments( frameURL )
}

var showComments = function( URL ) {
	var commentFrame,
		frameset;

	frameset = document.querySelector( "frameset" );
	frameset.setAttribute( "cols", "50%,50%" );
	commentFrame = document.querySelector( "#comment-frame" );
	commentFrame.setAttribute( "src", URL );

}

var drawIframe = function() {
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
	frameset.setAttribute( "cols", "100%,0%" );
	html.appendChild( frameset );

	pageFrame.setAttribute( "src", pageURL );
}

drawIframe();
window.addEventListener("message", receiveMessage, false);