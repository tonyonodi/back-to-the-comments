/**
* Listener Callbacks
*/
var pageActionListener = function(tab) {
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
	// chrome.tabs.update(tabId, {url: destination});

	chrome.tabs.executeScript(tabId, { 
	  code: "document.body.appendChild(document.createElement('script')).src='" + 
	    chrome.extension.getURL("inject.js") +"';" 
	}, null);
}


var messageListener = function(message, sender, sendResponse) {
    var tabName;

    if ( message == "commentRequest" ) {

    	console.log("comment request recieved");

    } else{

    	clickFlag = true;
	    mostRecentComment = message;

    }
	
}

var tabUpdateListener = function(tabId, changeInfo, tab) {
	var isLoading,
		tabName;

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
}


/**
* Vars and Events
*/
var tabList = Object(),
	mostRecentComment,
	clickFlag;

// Add listener for pageaction
chrome.pageAction.onClicked.addListener( pageActionListener );
// listens for messages passed when chrome storage is altered
chrome.runtime.onMessage.addListener( messageListener );
// tab change listener runs URL checking function
chrome.tabs.onUpdated.addListener( tabUpdateListener );
