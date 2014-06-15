
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

function nodelistToArray(nodelist) {
	var array = [];

	for (var i = 0; i < nodelist.length; i++ ) 
		array.push( nodelist[i] );

	return array;
}

// Main function for when on hacker news.
function onHackerNews() {
	var linkList,
		linkArray;

	// grab all links including "more" link
	linkList = document.querySelectorAll("td.title a");
	
	// remove the last element ("more" link)
	linkList.splice(1, 1);
	console.log(linkList);
}

// check if the page is hacker news and run onHackerNews if so.
var locationIsHackerNews;

locationIsHackerNews = checkLocation();

if ( locationIsHackerNews ) onHackerNews();