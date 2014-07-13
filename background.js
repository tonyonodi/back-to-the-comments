
// Add listener for pageaction
chrome.pageAction.onClicked.addListener(function(tab) {
	var destination,
		commentURL,
		tabId,
		tabName;

	// retrieve comment from tabList
	tabId 	   = tab.id;
	tabName    = "tab_" + tabId;
	commentURL = tabList[ tabName ];

	// create URL of comments page
	destination = "http://news.ycombinator.com/" + commentURL;

	// navigate tab to new url
	chrome.tabs.update(tabId, {url: tab.HNcomment});
});

// listens for messages passed when chrome storage is altered
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    var tabName;

    clickFlag = true;
    mostRecentComment = message;
	
});

// tab change listener runs URL checking function
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	var isLoading,
		tabName,
		tabList;

	isLoading = changeInfo.status;

	if ( clickFlag && isLoading ) {

		// add comment url to tab object
		tabName = "tab_" + tabId;
		tabList[ tabName ] = mostRecentComment;
		
		// show page action
		chrome.pageAction.show( tabId );

		// turn clickFlag off 
		clickFlag = false;		
	}
} );

// create array to which all scraped pages are pushed
var tabList = Object(),
	mostRecentComment,
	clickFlag;