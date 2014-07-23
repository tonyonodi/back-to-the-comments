function receiveMessage(event) {
	var commentPath,
		iframeURL;

	// get url of comment
	commentPath = event.data.commentURL;
	iframeURL 	= "https://news.ycombinator.com/" + commentPath;

	// create frame
	drawIframe( iframeURL );
}

var drawIframe = function( URL ) {
	var iframe,
		html,
		body,
		firstElement;

	// get html
	html = document.querySelector( "html" );
	// get body
	body = document.querySelector( "body" );
	// get first child of body
	firstElement = document.querySelector( "body *" );

	// create an iframe
	iframe = document.createElement( "iframe" );
	// set iframe destination and style
	iframe.setAttribute( "src", URL );
	iframe.setAttribute( "sandbox", "allow-same-origin allow-scripts allow-popups allow-forms" );

	// styling
	iframe.style.height = "100%";
	iframe.style.width = "50%";
	iframe.style.position = "fixed";
	iframe.style.right = "0";
	body.style.width = "50%";
	html.style.height = "100%";

	// add to start of body element
	html.insertBefore( iframe, body );

}

window.addEventListener("message", receiveMessage, false);