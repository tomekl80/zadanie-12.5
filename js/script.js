'use scrict';

// Links ceriables
var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

// Getting free quote
function getQuote() {
	fetch(quoteUrl, {cache: 'no-store'})
		.then(function(resp) {
			return resp.json();
		})
		.then(createTweet);
}

// Generating Tweet
function createTweet(input) {
	var data = input[0];

	var dataElement = document.createElement('div');
	dataElement.innerHTML = data.content;
	var quoteText = dataElement.innerText.trim();		/* Zapytać się Michała */
	var quoteAuthor = data.title;

	if (!quoteAuthor.length) {
		quoteAuthor = 'Unknown author';
	}

	var tweetText = 'Quote of the day - ' + quoteText + ' Author: ' + quoteAuthor;

	if (tweetText > 140) {
		getQuote();
	} else {
		var tweet = tweetLink + encodeURIComponent(tweetText);
		document.querySelector('.quote').innerText = quoteText;
		document.querySelector('.author').innerText = 'Author: ' + quoteAuthor;
		document.querySelector('.tweet').setAttribute('href', tweet);
	}
}