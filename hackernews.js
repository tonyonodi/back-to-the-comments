console.log("Do things that relate to hacker news.");

function addDataToStore( linkURL, discussionURL ) {
	chrome.storage.local.set( { "linkURL": linkURL,
								"discussionURL": discussionURL } );	
	console.log("Retrieving data");
}

function getCommentURL( linkToPost ) {
	var postCell = linkToPost.parentNode,
		postRow = postCell.parentNode,
		commentRow = postRow.nextElementSibling,
		commentLink = commentRow.querySelector("a:last-child"),
		commentURL = commentLink.getAttribute("href");

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

	for (var i = 0; i < nodelist.length; i++ ) 
		array.push( nodelist[i] );

	return array;
}


var linkList,
	linkArray;

// Flag to block default link action
var blockLinks = 0;

// grab all links including "more" link and convert to array.
linkList = document.querySelectorAll("td.title a");
linkArray = nodelistToArray(linkList);

// remove the last element ("more" link)
linkArray.splice(31, 1);

for ( var i = 0; i < linkArray.length; i++ ) {
	linkArray[i].addEventListener( "click", onLinkClick, false );
}