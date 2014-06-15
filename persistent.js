
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

function onLinkClick(e) {
	var linkURL,
		discussionURL;

	// prevent link from opening immediately.
	e.preventDefault();

	// get url of post and discussion
	linkURL = this.getAttribute("href");
	discussionURL = "http://example.com";

	chrome.storage.local.set( { linkURL: discussionURL }, function() {
		window.location.href = linkURL;
	} );	
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

// function when on a site navigated to from HN
function onPost() {
	chrome.storage.local.get("location", function(result) {
		console.log(result);
	});
}

// check if the page is hacker news and run onHackerNews if so.
var locationIsHackerNews;

locationIsHackerNews = checkLocation();



if ( locationIsHackerNews ) {
	onHackerNews();
} else {
	onPost();
}