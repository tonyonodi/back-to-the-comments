
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo && changeInfo.status == "complete") {
		console.log(tab.url);
		// if (tab.url == 'https://news.ycombinator.com/') {
		// 	console.log("On hacker news.");
		// 	chrome.tabs.executeScript(tabId, {file: "inject.js"});
		// }

		// get the object stored in local storage
		chrome.storage.local.get(null, function(savedData) {
			var storedURL = savedData.linkURL,
				currentURL = window.location;

			console.log(storedURL);
			console.log(currentURL);

			if (storedURL == currentURL) {
				console.log("HN page!");
			} else {
				console.log("not a HN page");
			}
		});
		
		chrome.tabs.sendMessage(tabId, {data: tab}, function(response) {
			console.log(response);
		});
	}
});