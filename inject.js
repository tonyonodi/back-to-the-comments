/**
* Variables
*/
var iframeOpen;

/**
* Functions and callbacks
*/
var receiveMessage = function(event) {
	var commentPath,
		frameURL;

	commentPath = event.data.commentURL;
	
	// if statement required as "external" messages are often passed
	if ( commentPath ) { 
		frameURL 	= "https://news.ycombinator.com/" + commentPath;
		toggleComments( frameURL )
	}
}

var toggleComments = function( URL ) {
	var commentFrame,
		frameset,
		frameHasSrc;
	console.log("click occurred")
	frameset = document.querySelector( "frameset" );
	commentFrame = document.querySelector( "#comment-frame" );
	frameHasSrc = commentFrame.getAttribute("src");

	// set frame src if none is present
	if ( ! frameHasSrc ) {
		commentFrame.setAttribute( "src", URL );
	}
	
	// open/close iframe
	if ( iframeOpen ) {
		frameset.setAttribute( "cols", "100%,0%" );
	} else {
		frameset.setAttribute( "cols", "50%,50%" );
	}

	// toggle iframeOpen flag
	iframeOpen = Math.abs( iframeOpen - 1 );

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
iframeOpen = 0;
drawIframe();
window.addEventListener("message", receiveMessage, false);