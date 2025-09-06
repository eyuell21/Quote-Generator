import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors())

// The Office (U.S.) quotes
const quotes = [
  {
    quote: "I'm not superstitious, but I am a little stitious.",
    author: "Michael Scott"
  },
  {
    quote: "Bears. Beets. Battlestar Galactica.",
    author: "Jim Halpert"
  },
  {
    quote: "I DECLARE BANKRUPTCY!",
    author: "Michael Scott"
  },
  {
    quote: "Sometimes I'll start a sentence and I don't even know where it's going. I just hope I find it along the way.",
    author: "Michael Scott"
  },
  {
    quote: "I'm running away from my responsibilities. And it feels good.",
    author: "Michael Scott"
  },
  {
    quote: "Identity theft is not a joke, Jim! Millions of families suffer every year.",
    author: "Dwight Schrute"
  },
  {
    quote: "I talk a lot, so I've learned to just tune myself out.",
    author: "Kelly Kapoor"
  },
  {
    quote: "Through concentration, I can raise and lower my cholesterol at will.",
    author: "Dwight Schrute"
  },
  {
    quote: "I feel God in this Chili’s tonight.",
    author: "Pam Beesly"
  },
  {
    quote: "I am Beyoncé, always.",
    author: "Michael Scott"
  }
];

app.get('/quote', (req, res) => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.json(randomQuote);
}) 

app.use(express.json()); // Needed to parse JSON bodies

app.post('/quote', (req, res) => {
    const { quote, author } = req.body;

    if (
      !quote || !author || typeof quote !== 'string' || quote.trim() === '' ||
      typeof author !== 'string' || author.trim() === ''
      ) {
        return res.status(400).json({ error: 'Quote and author are required.' });
        }

    quotes.push({ quote, author });
    res.status(201).json({ message: 'Quote added successfully.' });
});

// Start server
app.listen(PORT,() => {
  console.log(`The Office Quote API running at http://localhost:${PORT}`);
}); 