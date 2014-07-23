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

	// save comment URL to window object
	chrome.tabs.executeScript(tabId, {
		code: "window.postMessage( {commentURL: '" + commentURL + "'}, '*' );"
	}, null);
}


var messageListener = function(message, sender, sendResponse) {
    var tabName;

    clickFlag = true;
    mostRecentComment = message;
	
}

var tabUpdateListener = function(tabId, changeInfo, tab) {
	var isLoading,
		tabName;

	isLoading = changeInfo.status;

	if ( clickFlag && isLoading ) {

		// add comment url to tab object.
		tabName = "tab_" + tabId;
        tabList[ tabName ] = mostRecentComment;

        chrome.tabs.insertCSS( tabId, {
        	code: "body { display: none; }"
        }, null )

        // stop document from loading
		chrome.tabs.executeScript(tabId, { 
		  code: "window.stop()",
		  runAt: "document_start"
		}, null);

		// inject.js
		chrome.tabs.executeScript(tabId, { 
		  code: "document.body.appendChild(document.createElement('script')).src='" + 
		    chrome.extension.getURL("inject.js") +"';"
		}, null);
		
		// show page action
		chrome.pageAction.show( tabId );

		// turn clickFlag off 
		clickFlag = false;		
	}
}

var stripHeaders = function( info ) {
    var headers = info.responseHeaders;
    for (var i=headers.length-1; i>=0; --i) {
        var header = headers[i].name.toLowerCase();
        if (header == 'x-frame-options' || header == 'frame-options') {
            headers.splice(i, 1); // Remove header
        }
    }
    return {responseHeaders: headers};
}


/**
* Vars and Events
*/
var tabList = Object(),
	mostRecentComment,
	clickFlag,
	requestFilter,
	requestOptions;

// Add listener for pageaction
chrome.pageAction.onClicked.addListener( pageActionListener );
// listens for messages passed when chrome storage is altered
chrome.runtime.onMessage.addListener( messageListener );
// tab change listener runs URL checking function
chrome.tabs.onUpdated.addListener( tabUpdateListener );

// filter request URLs
requestFilter = {
    urls: [ '*://news.ycombinator.com/item?id=*' ], // Pattern to match all http(s) pages
    types: [ 'sub_frame' ]
};
// make request blocking
requestOptions = ['blocking', 'responseHeaders'];
// webRequest listener strips out yt headers preventing iframe loading
chrome.webRequest.onHeadersReceived.addListener( stripHeaders, requestFilter, requestOptions );
