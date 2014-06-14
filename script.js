function checkLocation() {
	var location,
		hackerNewsHost;

	hackerNewsHost = "news.ycombinator";
	location = location.host;

	if ( location == hackerNewsHost ) {
		return true;
	} else {
		return false;
	}
}

var locationIsHackerNews;

locationIsHackerNews = checkLocation();

console.log(locationIsHackerNews);