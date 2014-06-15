
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

	// grab all links including "more" link and conver to array.
	linkList = document.querySelectorAll("td.title a");
	linkArray = nodelistToArray(linkList);

	// remove the last element ("more" link)
	linkArray.splice(31, 0);
	
	console.log(linkArray);
}

// check if the page is hacker news and run onHackerNews if so.
var locationIsHackerNews;

locationIsHackerNews = checkLocation();

if ( locationIsHackerNews ) onHackerNews();