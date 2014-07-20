function receiveMessage(event) {
  console.log(event.origin);
  console.log(event.data);
}


var drawIframe = function( URL ) {
	var iframe,
		body,
		firstElement;

	// get body
	body = document.querySelector( "body" );
	// get first child of body
	firstElement = document.querySelector( "body *" );

	// create an iframe
	iframe = document.createElement( "iframe" );
	// set iframe destination and style
	iframe.setAttribute( "src", URL );
	iframe.setAttribute( "width", "100%" );
	iframe.setAttribute( "height", "500px" );
	iframe.setAttribute( "sandbox", "allow-same-origin allow-scripts allow-popups allow-forms" );
	// add to start of body element
	body.insertBefore( iframe, firstElement )

}


window.addEventListener("message", receiveMessage, false);

drawIframe( "http://greyroomthings.com" );
