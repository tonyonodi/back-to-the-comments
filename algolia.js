/**
* Functions
*/
function nodelistToArray( nodelist ) {
	var array = [];

	for (var i = 0; i < nodelist.length; i++ ) {
		var currentPost = nodelist[i];  // the node for the current post
		
		// Add node to array
		array.push( currentPost );
	}

	return array;
}

var makePostObject = function( currentPost ) {
	var postLinkNode,
		commentURL,
		postObject;

	postLinkNode = currentPost.children[0].children[0];
	commentURL = currentPost.children[4].children[0].getAttribute("href");

	// construct post object
	postObject = {
		"link": postLinkNode,
		"commentURL": commentURL
	}

	return postObject;
}

var main = function() {
	var postList,
		postArray,
		postObjectArray;

	// get nodelist of post elements and convert to array
	postList = document.querySelectorAll( "div.hit div.title_url" );
	postArray = nodelistToArray( postList );

	postObjectArray = postArray.map( makePostObject );
}

window.onload = main;
