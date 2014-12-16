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
	startX = e.clientX;  
	document.documentElement.addEventListener('mousemove', doDrag, false);
	document.documentElement.addEventListener('mouseup', stopDrag, false);
}

var stopDrag = function(e) {
	console.log('Drag over, phew!');
	document.documentElement.removeEventListener('mousemove', doDrag, false);
	document.documentElement.removeEventListener('mouseup', stopDrag, false);
}

var doDrag = function(e) {
	console.log(startX);
	console.log(e.clientX);
}

var receiveMessage = function(event) {
	var commentPath,
		frameURL;

	commentPath = event.data.commentURL;
	
	// if statement required as "external" messages are often passed
	if ( commentPath ) { 
		frameURL = "https://news.ycombinator.com/" + commentPath;
		toggleComments( frameURL );
console.log(frameURL);
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
    iframeContainer = document.createElement( "div" );
    dragBar = document.createElement("div");
	iframe = document.createElement( "iframe" );
    iframeContainer.setAttribute("id", "bttc-comment-div");
    dragBar.setAttribute("id", "bttc-dragbar");
    iframe.setAttribute("id", "bttc-comment-frame");

    iframeContainer.appendChild( dragBar );
    iframeContainer.appendChild( iframe );
	html.insertBefore( iframeContainer, body );

	// add listeners for comment resize
	// dragBar.onMouseDown(mouseDownCallback);
	// dragBar.onMouseUp(mouseUpCallback);
}

/**
* Events
*/
iframeOpen = 0;
drawIframe();
window.addEventListener("message", receiveMessage, false);
dragBar.addEventListener('mousedown', initDrag, false);
}
