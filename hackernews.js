/**
* Flags
*/
var blockLinks = 0, // block default link action
	devNotice = 0;  // show dev notice

if (devNotice) console.log("Do things that relate to hacker news.");

function addDataToStore( postObjectArray ) {
	// create object containing data to be saved
	var hnPageObject = {
		postObjectArray
	};

	// save object to local storage
	chrome.storage.local.set(hnPageObject, function() {
		// Send message to background script
		chrome.runtime.sendMessage(hnPageObject);
	});
}

// takes a post link and returns its comment url
function getCommentURL( linkToPost ) {
	var postCell = linkToPost.parentNode,  // get table cell of link
		postRow = postCell.parentNode,	// get table row of link
		commentRow = postRow.nextElementSibling,  // go to next row (containing comment)
		commentLink = commentRow.querySelector("a:last-child"),  // get the last link in that row
		commentURL = commentLink.getAttribute("href");	// get the href attribute of comment link

	return commentURL;
}

function onLinkClick(e) {
	var linkURL,
		discussionURL;

	// prevent default action if flag active.
	if(blockLinks) e.preventDefault();

	// get url of post and discussion
	linkURL = this.getAttribute("href");
	discussionURL = getCommentURL(this);

	addDataToStore( linkURL, discussionURL );
}

function nodelistToArray( nodelist ) {
	var array = [];

	for (var i = 0; i < nodelist.length; i++ ) {
		var postObject,  // to be filled with post object later
			currentPost = nodelist[i],  // the node for the current post
			postURL = currentPost.getAttribute("href"),  // URL for current post link
			discussionURL = getCommentURL(currentPost);  // pass to function; get comment URL
		
		// Create post object
		postObject = {
			"linkURL": currentPost,
			"duscussionURL": discussionURL
		}

		array.push( postObject );
	}

	return array;
}


var linkList,
	linkArray;

// grab all links including "more" link and convert to array.
linkList = document.querySelectorAll("td.title a");
linkArray = nodelistToArray(linkList);
// pass array to function; grab urls
getCommentURLs( linkList );

// remove the last element ("more" link)
linkArray.splice(31, 1);

for ( var i = 0; i < linkArray.length; i++ ) {
	linkArray[i].addEventListener( "click", onLinkClick, false );
}