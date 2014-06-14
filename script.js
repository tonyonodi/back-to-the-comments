
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

// Main function for when on hacker news.
function onHackerNews() {
	
}

// check if the page is hacker news and run onHackerNews if so.
var locationIsHackerNews;

locationIsHackerNews = checkLocation();

if ( locationIsHackerNews ) onHackerNews();