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
		// toggleComments( frameURL )
	}
}

var toggleComments = function( URL ) {
	var commentFrame,
		frameset,
		frameHasSrc;
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
	iframe = document.createElement( "iframe" );

	html.appendChild( iframe );
}


/**
* Events
*/
iframeOpen = 0;
drawIframe();
window.addEventListener("message", receiveMessage, false);
