// create array to which all scraped pages are pushed
var hnPostList = [];

// check for HN comments when page is navigated to
function checkPageURL(tabId, changeInfo, tab) {
	if (changeInfo && changeInfo.status == "loading") {
		// get current tab URL
		var currentURL = tab.url

		// check if in list of stored tabs
		if ( ! posInList( currentURL, hnPostList ) ) {
			console.log("HN page!");
		}
	}
}

// tab change listener runs URL checking function
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	checkPageURL(tabId, changeInfo, tab);
} );

// Add listener for pageaction
chrome.pageAction.onClicked.addListener(function(tab) {
	function navigateTab(commentsPage) {
		// create URL of comments page
		var commentsURL = "http://news.ycombinator.com/" + commentsPage;
		// navigate tab to new url
		chrome.tabs.update(tabId, {url: commentsURL});
	}

	// get tabId from tab object
	var tabId = tab.id,
		commentsID,
		commentsURL;

	// access local storage
	chrome.storage.local.get(null, function(savedData) {
		// get discussion page from local storage
		var commentsPage = savedData.discussionURL;
		// pass page URL to function to naviage the tab
		navigateTab(commentsPage);
	});
});

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

// listens for messages passed when chrome storage is altered
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

    // check the correct message is being recieved
    if ( message.scrapeArray ) {
    	
    	var newPostList = message.scrapeArray;

    	for ( var i = 0; i < newPostList.length; i++ ) {

    		var post = newPostList[i],  // current item
    			postURL = post.linkURL,	// get url
    			postIndex,
    			notInList;

    		// check if in list and save as var
    		postIndex = posInList( postURL, hnPostList );

    		// add to hnPostList if not already present
    		if( postIndex == null ) {
    			hnPostList.push(post);
    		}

    	}
    }

    console.log(hnPostList);
});