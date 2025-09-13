const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const button = document.getElementById('new-quote-btn');


const form = document.getElementById('quote-form');
const newQuoteInput = document.getElementById('new-quote');
const newAuthorInput = document.getElementById('new-author');
const formStatus = document.getElementById('form-status');

const url = 'https://eyuell21-quote-server440.hosting.codeyourfuture.io'
const fetchQuote = async () => {
    try {
        const response = await fetch(url + '/quote')


        const { quote, author } = await response.json();

        quoteEl.textContent = `"${quote}"`;
        authorEl.textContent = `— ${author}`;
    } catch (err) {
        quoteEl.textContent = 'Failed to load quote.';
        authorEl.textContent = '';
        console.error(err);
    }
        
}

const postQuote = async (e) => {
    e.preventDefault();

    const quote = newQuoteInput.value.trim();
    const author = newAuthorInput.value.trim();

    if (!quote || !author) {
        formStatus.textContent = 'Both fields are required.';
        return;
    }
    try {
        const response = await fetch(url + 'quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quote, author })
        });

        if (!response.ok) {
            const errData = await response.json();
            formStatus.textContent = errData.error || 'Failed to add quote.';
        } else {
            formStatus.textContent = 'Quote added successfully!';
            newQuoteInput.value = '';
            newAuthorInput.value = '';
            fetchQuote(); // Optional: Show the new quote
        }

    } catch (err) {
        console.error(err);
        formStatus.textContent = 'An error occurred while adding the quote.';
    }
        
}



window.addEventListener('DOMContentLoaded', fetchQuote);
button.addEventListener('click', fetchQuote);
form.addEventListener('submit', postQuote);