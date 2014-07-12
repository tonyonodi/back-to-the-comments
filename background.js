
// Add listener for pageaction
chrome.pageAction.onClicked.addListener(function(tab) {
	var destination,
		tabId;

	// create URL of comments page
	destination = "http://news.ycombinator.com/" + commentURL;
	// get tab id
	tabId = tab.id;

	// navigate tab to new url
	chrome.tabs.update(tabId, {url: destination});
});

// listens for messages passed when chrome storage is altered
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    clickFlag = true;
    commentURL = message;
});

// tab change listener runs URL checking function
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	var updateTime = new Date().getTime(),
		latency;

	if ( clickFlag ) {
		
		// show page action
		chrome.pageAction.show( tabId );

		// turn clickFlag off 
		clickFlag = false;		
	}
} );

// create array to which all scraped pages are pushed
var hnPostList = [],
	commentURL,
	clickFlag;