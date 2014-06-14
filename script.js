function checkLocation() {
	var hackerNewsHost;

	hackerNewsHost = "news.ycombinator.com";

	if ( location.host == hackerNewsHost ) {
		return true;
	} else {
		return false;
	}
}

function main() {
	console.log("running main");
}

var locationIsHackerNews;

locationIsHackerNews = checkLocation();

if (locationIsHackerNews) main();