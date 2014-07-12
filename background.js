// check for HN comments when page is navigated to
function checkPageURL(tabId, changeInfo, tab) {
	if (changeInfo && changeInfo.status == "loading") {
		// get current tab URL
		var currentURL = tab.url,
			postIndex;

		postIndex = posInList( currentURL, hnPostList );

		// check if in list of stored tabs
		if ( postIndex != null ) {
			// show pageaction
			chrome.pageAction.show( tabId );
		}
	}
}

function posInList( item, list  ) {
	// loop over list
	for ( var i = 0; i < list.length; i++ ) {
		// get linkURL item from currently selected
		var currentURL = list[i].linkURL;

		// return false if equivalent
		if ( currentURL == item ) {
			return i
		}
	}
	return null
}

// Add listener for pageaction
chrome.pageAction.onClicked.addListener(function(tab) {
	// function to nav tab, action begins below
	function navigateTab(commentsPage) {
		// create URL of comments page
		var commentsURL = "http://news.ycombinator.com/" + commentsPage;
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