/**
* Functions and callbacks
*/
var receiveMessage = function(event) {
	var commentPath,
		frameURL;

	commentPath = event.data.commentURL;
	
	if ( commentPath ) {
		frameURL 	= "https://news.ycombinator.com/" + commentPath;
		showComments( frameURL )
	}
}

var showComments = function( URL ) {
	var commentFrame,
		frameset;

	frameset = document.querySelector( "frameset" );
	frameset.setAttribute( "cols", "50%,50%" );
	commentFrame = document.querySelector( "#comment-frame" );
	commentFrame.setAttribute( "src", URL );
	console.log("showComments has run");
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


/**
* Events
*/
drawIframe();
window.addEventListener("message", receiveMessage, false);