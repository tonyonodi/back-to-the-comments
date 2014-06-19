
// Function to check if location is hacker news.
function checkLocation() {
	var hackerNewsHost;

	hackerNewsHost = "news.ycombinator.com";

	// return true or false.
	if ( location.host == hackerNewsHost ) {
		return true;
	} else {
		return false;
	}
}

function nodelistToArray( nodelist ) {
	var array = [];

	for (var i = 0; i < nodelist.length; i++ ) 
		array.push( nodelist[i] );

	return array;
}

function getCommentURL( linkToPost ) {
	var postCell = linkToPost.parentNode,
		postRow = postCell.parentNode,
		commentRow = postRow.nextElementSibling,
		commentLink = commentRow.querySelector("a:last-child"),
		commentURL = commentLink.getAttribute("href");

	return commentURL;
}

function addDataToStore( linkURL, discussionURL ) {
	chrome.storage.local.set( { "linkURL": linkURL,
							"discussionURL": discussionURL } );	
}

function onLinkClick(e) {
	var linkURL,
		discussionURL;

	// get url of post and discussion
	linkURL = this.getAttribute("href");
	discussionURL = getCommentURL(this);

	addDataToStore( linkURL, discussionURL );
}

// function for when on hacker news.
function onHackerNews() {
	var linkList,
		linkArray;

	// grab all links including "more" link and conver to array.
	linkList = document.querySelectorAll("td.title a");
	linkArray = nodelistToArray(linkList);

	// remove the last element ("more" link)
	linkArray.splice(31, 1);

	for ( var i = 0; i < linkArray.length; i++ ) {
		linkArray[i].addEventListener( "click", onLinkClick, false );
	}
}

function onPostedPage( pageObject ) {
	console.log(pageObject);
}

// function when on a site navigated to from HN
function checkForPost() {

	chrome.storage.local.get(null, function( savedData ) {
	    var storedURL,
	    	currentURL,
	    	isSamePage;
		
	    storedURL = savedData.linkURL;
	    currentURL = window.location;

	    // check to see if on same page if true go straight to new function
	    isSamePage = ( storedURL == currentURL ) ? true : false;
	    if( isSamePage ) {
	    	onPostedPage( savedData );
	    }
	});
}

// starts running here
var locationIsHackerNews;

// check if the page is hacker news and run onHackerNews if so.
locationIsHackerNews = checkLocation();

// chrome.storage.local.clear(function(){ console.log("cleared everything up"); }); 
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	console.log("URL changed: " + request.data.url);
});

if ( locationIsHackerNews ) {
	onHackerNews();
} else {
	checkForPost();
}