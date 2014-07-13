
// Add listener for pageaction
chrome.pageAction.onClicked.addListener(function(tab) {
	var destination,
		tabId;
	console.log(tab.HNcomment);

	// create URL of comments page
	destination = "http://news.ycombinator.com/" + commentURL;
	// get tab id
	tabId = tab.id;

	// navigate tab to new url
	chrome.tabs.update(tabId, {url: tab.HNcomment});
});

// listens for messages passed when chrome storage is altered
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    clickFlag = true;
    commentURL = message;
});

// tab change listener runs URL checking function
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	var isLoading;

	isLoading = changeInfo.status;

	if ( clickFlag && isLoading ) {

		// add comment url to tab object
		
		
		// show page action
		chrome.pageAction.show( tabId );

		// turn clickFlag off 
		clickFlag = false;		
	}
} );

// create array to which all scraped pages are pushed
var tabList = Object(),
	clickFlag;