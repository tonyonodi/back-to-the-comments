chrome.tabs.query(
	{currentWindow: true, active: true},
	function(tabArray) {
		console.log(tabArray);
	}
);