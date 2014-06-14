
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

// This is where the magic happens,
function main() {
	console.log("running main");
}

// check if the page is hacker news and run main if so.
var locationIsHackerNews;

locationIsHackerNews = checkLocation();

if (locationIsHackerNews) main();