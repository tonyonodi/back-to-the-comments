
// Add listener for pageaction
chrome.pageAction.onClicked.addListener(function(tab) {
	// function to nav tab, action begins below
	function navigateTab(commentsPage) {
		// create URL of comments page
		var commentsURL = "http://news.ycombinator.com/";
		// navigate tab to new url
		chrome.tabs.update(tabId, {url: commentsURL});
	}

	var tabId = tab.id, // get tabId from tab object
		tabURL,
		pageIndex,
		commentsURL;
	// get tab URL
	tabURL = tab.url;

	// get post url index then comments URl
	pageIndex = posInList( tabURL, hnPostList );
	commentsURL = hnPostList[pageIndex].discussionURL

	// pass URL of function to navigate tab
	navigateTab( commentsURL );
});

// listens for messages passed when chrome storage is altered
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    clickFlag = message;
    console.log(message);
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
	clickFLag;