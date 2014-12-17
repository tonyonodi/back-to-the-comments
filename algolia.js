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

var main = function() {
	var postList,
		postArray;

	// get nodelist of post elements and convert to array
	postList = document.querySelectorAll( "div.hit div.title_url" );
	postArray = nodelistToArray( postList );
}

window.onload = main;
