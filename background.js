
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo && changeInfo.status == "complete") {
		chrome.storage.local.get(null, function(savedData) {
			var storedURL = savedData.linkURL,
				currentURL = window.location.toString();

			console.log(storedURL);
			console.log(currentURL);

			if (storedURL == currentURL) {
				console.log("HN page!");
			} else {
				console.log("storedURL: " + storedURL);
				console.log("currentURL: " + currentURL);
				console.log("not a HN page");
			}
		});
		
		chrome.tabs.sendMessage(tabId, {data: tab}, function(response) {
			console.log(response);
		});
	}
});