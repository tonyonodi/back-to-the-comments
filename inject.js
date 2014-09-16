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
	commentDiv = document.querySelector( "#bttc-comment-div" );
	commentFrame = document.querySelector( "#bttc-comment-frame" );
    body = document.querySelector( "body" );
	frameHasSrc = commentFrame.getAttribute("src");

	// set frame src if none is present
	if ( ! frameHasSrc ) {
		commentFrame.setAttribute( "src", URL );
	}
	
	// open/close iframe
	if ( ! iframeOpen ) {
        commentDiv.style.width = "50%";
        commentDiv.style.display = "block";
	} else {
        commentDiv.style.width = "0";
        commentDiv.style.display = "none";
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
    iframeContainer = document.createElement( "div" );
	iframe = document.createElement( "iframe" );
    iframeContainer.setAttribute("id", "bttc-comment-div");
    iframe.setAttribute("id", "bttc-comment-frame");

    iframeContainer.appendChild( iframe );
	html.insertBefore( iframeContainer, body );
}


/**
* Events
*/
iframeOpen = 0;
drawIframe();
window.addEventListener("message", receiveMessage, false);
