chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo && changeInfo.status == "complete") {

		// get current tab URL
		var currentURL = tab.url

		// get URL(s) of stored tabs
		chrome.storage.local.get(null, function(savedData) {
			var storedURL = savedData.linkURL;

			console.log("storedURL: " + storedURL);
			console.log("currentURL: " + currentURL);

			if (storedURL == currentURL) {
				console.log("HN page!");
				chrome.pageAction.show(tabId);
			}
		});
		
		chrome.tabs.sendMessage(tabId, {data: tab}, function(response) {
			console.log(response);
		});
	}
});

// Add listener for pageaction
chrome.pageAction.onClicked.addListener(function(tab) {
	// get tabId from tab object
	var tabId = tab.id;

	// navigate tab to new url
	chrome.tabs.update(tabId, {url: "http://news.ycombinator.com"});
});