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

// send comment url
var messenger = function( message ) {
	chrome.runtime.sendMessage( message );
}

var addPostListener = function( currentPost ) {
	var link,
		comment;

	link = currentPost.link;
	comment = currentPost.commentURL;

	console.log("link: " + link);
	console.log("comment: " + comment);

	link.addEventListener( "click", messenger.bind( null, comment ), false);
}

var main = function() {
	var postList,
		postArray,
		postObjectArray;

	// get nodelist of post elements and convert to array
	postList = document.querySelectorAll( "div.hit div.title_url" );
	postArray = nodelistToArray( postList );

	// map to array of objects with useful inforation
	postObjectArray = postArray.map( makePostObject );

	// add listeners to each post
	postObjectArray.forEach( addPostListener );
}

window.onload = main;
