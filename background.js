
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo && changeInfo.status == "complete") {
		console.log(tab.url);
		if (tab.url == 'https://news.ycombinator.com/') {
			console.log("On hacker news.");
			chrome.tabs.executeScript(tabId, {file: "inject.js"});
		}
		
		chrome.tabs.sendMessage(tabId, {data: tab}, function(response) {
			console.log(response);
		});
	}
});