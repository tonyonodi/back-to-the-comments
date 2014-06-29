function checkPageURL(tabId, changeInfo, tab) {
	if (changeInfo && changeInfo.status == "complete") {

		// get current tab URL
		var currentURL = tab.url

		// get URL(s) of stored tabs
		chrome.storage.local.get(null, function(savedData) {
			var storedURL = savedData.linkURL;

			if (storedURL == currentURL) {
				chrome.pageAction.show(tabId);
			}
		});
	}
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	// pass to function
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