var main = function() {
	console.log("hello");
	linkList = document.querySelectorAll( "div.hit div.title_url div.title a" );
	console.log(linkList);
}

window.onload = main;
