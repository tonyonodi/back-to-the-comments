/**
* Flags
*/
var blockLinks = 0, // block default link action
	devNotice = 0;  // show dev notice

if (devNotice) console.log("Do things that relate to hacker news.");

function addDataToStore( linkURL, discussionURL ) {
	// create object containing data to be saved
	var hnPageObject = {
		"linkURL": linkURL, 
		 "discussionURL": discussionURL
	};

	// save object to local storage
	chrome.storage.local.set(hnPageObject, function() {
		// Send message to background script
		chrome.runtime.sendMessage(hnPageObject);
	});
}

function getCommentURL( linkToPost ) {
	var postCell = linkToPost.parentNode,
		postRow = postCell.parentNode,
		commentRow = postRow.nextElementSibling,
		commentLink = commentRow.querySelector("a:last-child"),
		commentURL = commentLink.getAttribute("href");

	return commentURL;
}

function getCommentURLs( linkArray ) {
	for (var i = linkArray.length - 1; i >= 0; i--) {
		console.log(linkArray[i]);
	};
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

// grab all links including "more" link and convert to array.
linkList = document.querySelectorAll("td.title a");
linkArray = nodelistToArray(linkList);
// pass array to function; grab urls
getCommentURLs( linkArray );

// remove the last element ("more" link)
linkArray.splice(31, 1);

for ( var i = 0; i < linkArray.length; i++ ) {
	linkArray[i].addEventListener( "click", onLinkClick, false );
}