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
		frameURL = "https://news.ycombinator.com/" + commentPath;
		toggleComments( frameURL )
	}
}

var toggleComments = function( URL ) {
	var commentFrame,
		frameset,
		frameHasSrc;
	commentFrame = document.querySelector( "#bttc-comment-frame" );
    body = document.querySelector( "body" );
	frameHasSrc = commentFrame.getAttribute("src");

	// set frame src if none is present
	if ( ! frameHasSrc ) {
		commentFrame.setAttribute( "src", URL );
	}
	
	// open/close iframe
	if ( ! iframeOpen ) {
        commentFrame.style.width = "50%";
        body.style.width = "50%";
	} else {
        commentFrame.style.width = 0;
        body.style.width = "100%";
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
    iframe.setAttribute("id", "bttc-comment-frame");

	html.insertBefore( iframe, body );
}


/**
* Events
*/
iframeOpen = 0;
drawIframe();
window.addEventListener("message", receiveMessage, false);
