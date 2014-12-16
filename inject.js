// wrap all code in an if statement using global var to check if script has been run before.

var BTTC_ACTIVE_GLOBAL; 
if ( ! BTTC_ACTIVE_GLOBAL ) {
// first set active to true
BTTC_ACTIVE_GLOBAL = true;

/**
* Variables
*/
var iframeOpen,
	mouseDown = false;

/**
* Functions and callbacks
*/

var initDrag = function(e) { 
	document.documentElement.addEventListener("mousemove", doDrag, false);
	document.documentElement.addEventListener("mouseup", stopDrag, false);
	document.querySelector("#bttc-iframe-cover").style.display = "block";
}

var stopDrag = function(e) {
	document.documentElement.removeEventListener("mousemove", doDrag, false);
	document.documentElement.removeEventListener("mouseup", stopDrag, false);
	document.querySelector("#bttc-iframe-cover").style.display = "none";
}

var doDrag = function(e) {
	var commentFrame = document.querySelector("#bttc-comment-div");

	// if delta pos is -ve then comment frame gets wider.
	commentFrame.style.width = window.innerWidth - e.clientX + "px";
}

var receiveMessage = function(event) {
	var commentPath,
		frameURL;

	commentPath = event.data.commentURL;
	
	// if statement required as "external" messages are often passed
	if ( commentPath ) { 
		frameURL = "https://news.ycombinator.com/" + commentPath;
		toggleComments( frameURL );
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
        body.style.opacity = 0.4;
	} else {
        commentDiv.style.width = "0";
        commentDiv.style.display = "none";
        body.style.opacity = 1;
	}

	// toggle iframeOpen flag
	iframeOpen = Math.abs( iframeOpen - 1 );

}

var drawIframe = function() {
    var pageURL,
		pageFrame,
        iframe,
		iframeContainer,
		dragBar,
		html,
		body;

	html = document.querySelector( "html" );
	body = document.querySelector( "body" );
    
	// create iframe container, drag bar and iframe
    iframeContainer = document.createElement( "div" );
    dragBar = document.createElement("div");
    iframeCover = document.createElement("div");
	iframe = document.createElement( "iframe" );
    
    // set ids of new attributes
    iframeContainer.setAttribute("id", "bttc-comment-div");
    dragBar.setAttribute("id", "bttc-dragbar");
    iframeCover.setAttribute("id", "bttc-iframe-cover");
    iframe.setAttribute("id", "bttc-comment-frame");

    // insert elements into DOM
    iframeContainer.appendChild( dragBar );
    iframeContainer.appendChild( iframeCover );
    iframeContainer.appendChild( iframe );
	html.insertBefore( iframeContainer, body );

	// add listeners for comment resize
	dragBar.addEventListener('mousedown', initDrag, false);
}

/**
* Events
*/
iframeOpen = 0;
drawIframe();
window.addEventListener("message", receiveMessage, false);
}
