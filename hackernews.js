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

function nodelistToArray( nodelist ) {
	var array = [],
		arrayAsObj;

	for (var i = 0; i < nodelist.length; i++ ) {
		var postObject,  // to be filled with post object later
			currentPost = nodelist[i],  // the node for the current post
			postURL = currentPost.getAttribute("href"),  // URL for current post link
			discussionURL = getCommentURL(currentPost);  // pass to function; get comment URL
		
		// Create post object
		postObject = {
			"linkURL": postURL,
			"discussionURL": discussionURL
		}

		// add if it's not a "more" link
		if( postObject.discussionURL ) array.push( postObject );
	}

	// create object for array
	arrayAsObj = {
		"scrapeArray": array
	}
	
	// send array to background
	chrome.runtime.sendMessage( arrayAsObj );
	console.log(arrayAsObj);

	return array;
}

var linkList,
	linkArray;

// grab all links including "more" link and convert to array of objects
linkList = document.querySelectorAll( "td.title a" );
linkArray = nodelistToArray( linkList );
