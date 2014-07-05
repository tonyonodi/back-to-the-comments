// takes URL string and processes it to maximise compatibility
function cleanURL(URL) {
	var trailingSlashRegex;
	var temp = URL;
	// remove trailing slash if it exists
	trailingSlashRegex = /\/$/;
	URL = URL.replace(trailingSlashRegex, '');

	return URL;
}

// check for HN comments when page is navigated to
function checkPageURL(tabId, changeInfo, tab) {
	if (changeInfo && changeInfo.status == "loading") {
		// get current tab URL
		var currentURL = tab.url,
			postIndex;

		currentURL = cleanURL(currentURL);

		postIndex = posInList( currentURL, hnPostList );
		console.log(currentURL);

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
	// get tab URL and clean it
	tabURL = tab.url;
	tabURL = cleanURL( tabURL );

	// get post url index then comments URl
	pageIndex = posInList( tabURL, hnPostList );
	commentsURL = hnPostList[pageIndex].discussionURL

	// pass URL of function to navigate tab
	navigateTab( commentsURL );
});

// listens for messages passed when chrome storage is altered
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

    // check the correct message is being recieved
    if ( message.scrapeArray ) {
    	
    	var newPostList = message.scrapeArray;

    	for ( var i = 0; i < newPostList.length; i++ ) {

    		var post = newPostList[i],  // current item
    			postURL = post.linkURL,	// get url
    			postIndex;

    		// get position in list (or null)
    		postIndex = posInList( postURL, hnPostList );

    		// add to hnPostList if not already present
    		if( postIndex == null ) {
    			hnPostList.push(post);
    		}
    	}
    }
});

// tab change listener runs URL checking function
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	checkPageURL(tabId, changeInfo, tab);
} );

// create array to which all scraped pages are pushed
var hnPostList = [];