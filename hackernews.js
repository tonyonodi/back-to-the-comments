// takes a post link and returns its comment url
function getCommentURL( linkToPost ) {
	var postCell,
		postRow,
		commentRow,
		commentLink,
		commentURL;

	postCell = linkToPost.parentNode;  // get table cell of link
	postRow = postCell.parentNode;	// get table row of link
	commentRow = postRow.nextElementSibling;  // go to next row (containing comment)
	
	// check if next row was found
	if( commentRow ) {
		commentLink = commentRow.querySelector("a:last-child");  // get the last link in that row
		// comments don't exist for "x is hiring" listings
		if ( commentLink ) 
			commentURL = commentLink.getAttribute("href");	// get the href attribute of comment link

		// return comment url
		return commentURL;
	}
}

// convert nodeList to array and get rid
function nodelistToArray( nodelist ) {
	var array = [];

	for (var i = 0; i < nodelist.length; i++ ) {
		var currentPost = nodelist[i];  // the node for the current post
		
		// Add node to array
		array.push( currentPost );
	}

	return array;
}

var linkList,
	linkArray;

// grab all links including "more" link and convert to array of objects
linkList = document.querySelectorAll( "td.title a" );
linkArray = nodelistToArray( linkList );

// use < to omit "more"
for (var i = 0; i < linkArray.length; i++) {
	var link 	= linkArray[i],
		comment = getCommentURL( link );

	if ( comment ) {

		link.addEventListener( "click", function(e) {
			// send comment url
			chrome.runtime.sendMessage( comment );
		});
	}
};