// Elements
const typeArea = document.querySelector(".textarea textarea");
const quoteArea = document.querySelector(".quotes-area");

// Buttons
const saveBtn = document.querySelector(".save-btn");

// Variables
const savedQuotes = localStorage.getItem("savedQuotes");
let quoteArr = JSON.parse(savedQuotes || []) || [];

// Ensure shortid is globally available (if loaded via CDN)
const shortid = window.shortid;

// start
function init() {
  quoteArr.forEach(function (quote) {
    generateQuote(quote.quote, quote.quoteId);
  });
}
init();

// Event Listener
saveBtn.addEventListener("click", function () {
  const quote = typeArea.value;
  if (!quote) return;
  const quoteId = shortid();
  generateQuote(quote, quoteId);

  quoteArr.push({
    quote: quote,
    quoteId: quoteId,
  });
  updateLS();
  typeArea.value = "";
});

quoteArea.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const quoteId = e.target.id;
    quoteArr = quoteArr.filter((quote) => quote.quoteId !== quoteId);
    e.target.closest(".quote-card").remove();
    updateLS();
  }
});

function generateQuote(quote, quoteID) {
  const quoteCard = document.createElement("div");
  quoteCard.setAttribute("class", "quote-card");
  quoteCard.innerHTML = `
          <div class="quote-text">
          ${quote}
          </div>
          <button class="delete-btn" id="${quoteID}">🗑️</button>
`;
  quoteArea.appendChild(quoteCard);
}

function updateLS() {
  localStorage.setItem("savedQuotes", JSON.stringify(quoteArr));
}
