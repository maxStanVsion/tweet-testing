const quoteContainer = document.querySelector(".js-quote-container");
const quoteText = document.querySelector(".js-quote");
const authorText = document.querySelector(".js-author");
const twitterBtn = document.querySelector(".js-twitter");
const newQuoteBtn = document.querySelector(".js-new-quote");
const loader = document.querySelector(".js-loader");

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function renderQuote(arr) {
  //Pick a random quote from apiQuotes array
  const quote = arr[Math.floor(Math.random() * arr.length)];

  //Check if author field is blank and replace it with 'Anonymous'
  if (!quote.author) authorText.textContent = "- Anonymous";
  else authorText.textContent = `- ${quote.author}`;

  //Check Quote length to determine styling
  if (quote.text.length > 50) quoteText.classList.add("long-quote");
  else quoteText.classList.remove("long-quote");

  quoteText.textContent = quote.text;
  complete();
}

// Get quotes from API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    const apiQuotes = await response.json();

    renderQuote(apiQuotes);
  } catch (error) {
    //Catch error here
    alert(error);
  }
}

// Tweet Quote
function tweetQuotes() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}&url=https://www.google.com`;
  window.open(twitterUrl, "_blank");
}

// Events
newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuotes);

// On Load
getQuotes();
