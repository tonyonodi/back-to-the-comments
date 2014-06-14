function checkLocation() {
	var hackerNewsHost;

	hackerNewsHost = "news.ycombinator.com";

	if ( location.host == hackerNewsHost ) {
		return true;
	} else {
		return false;
	}
}

var locationIsHackerNews;

locationIsHackerNews = checkLocation();

console.log(locationIsHackerNews);