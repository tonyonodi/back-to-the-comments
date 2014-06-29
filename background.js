// create array to which all scraped pages are pushed
var hnPostList = [];

// check for HN comments when page is navigated to
function checkPageURL(tabId, changeInfo, tab) {
	if (changeInfo && changeInfo.status == "loading") {
		// get current tab URL
		var currentURL = tab.url

		// get URL(s) of stored tabs
		chrome.storage.local.get(null, function(savedData) {
			// get the list from saved object
			var postList = savedData.list;


			// loop over postList
			for ( var i in postList ) {
				var post = postList[i],
					postURL = post.linkURL;

				// check if post is same as current page
				if (postURL == currentURL) {
					chrome.pageAction.show(tabId);
				}
			}			
		});
	}
}

// tab change listener runs URL checking function
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	checkPageURL(tabId, changeInfo, tab);
} );

// Add listener for pageaction
chrome.pageAction.onClicked.addListener(function(tab) {
	function navigateTab(commentsPage) {
		// create URL of comments page
		var commentsURL = "http://news.ycombinator.com/" + commentsPage;
		// navigate tab to new url
		chrome.tabs.update(tabId, {url: commentsURL});
	}

	// get tabId from tab object
	var tabId = tab.id,
		commentsID,
		commentsURL;

	// access local storage
	chrome.storage.local.get(null, function(savedData) {
		// get discussion page from local storage
		var commentsPage = savedData.discussionURL;
		// pass page URL to function to naviage the tab
		navigateTab(commentsPage);
	});
});

// listens for messages passed when chrome storage is altered
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log(message);
});