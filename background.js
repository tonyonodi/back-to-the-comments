
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if ( changeInfo && changeInfo.status == "complete" ) {
		console.log( "Tab updated: " + tab.url );
	}
});