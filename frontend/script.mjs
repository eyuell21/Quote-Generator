const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const button = document.getElementById('new-quote-btn');

const fetchQuote = async () => {
    try {
        const response = await fetch('http://localhost:3000/quote')
        const { quote, author } = await response.json();

        quoteEl.textContent = `"${quote}"`;
        authorEl.textContent = `— ${author}`;
    } catch (err) {
        quoteEl.textContent = 'Failed to load quote.';
        authorEl.textContent = '';
        console.error(err);
    }
        
}

window.addEventListener('DOMContentLoaded', fetchQuote);
button.addEventListener('click', fetchQuote);