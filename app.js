const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'RESTful API'
    });
});

app.get('/books', db.getBooks);
app.get('/books/:id', db.getBookById);
app.post('/books', db.createBook);
app.put('/books/:id', db.updateBook);
app.delete('/books/:id', db.deleteBook);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
