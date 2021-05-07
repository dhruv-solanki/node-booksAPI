const Pool = require('pg').Pool;
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432
});

const getBooks = (req, res) => {
    const q = 'SELECT * FROM books ORDER BY id ASC';
    pool.query(q, (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).json({
               message: 'Unable to get Books' 
            });
        }
        res.status(200).json(results.rows);
    });
};

const getBookById = (req, res) => {
    const ID = parseInt(req.params.id);

    const q = `SELECT * FROM books WHERE id = ${ID}`;
    pool.query(q, (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).json({
               message: 'Unable to get Book' 
            });
        } else {
            res.status(200).json(results.rows);
        }
    });
};

const createBook = (req, res) => {
    const { title, author, image } = req.body;
    const ID = Math.random().toString(10).slice(12);

    const q = 'INSERT INTO books(id, title, author, image) values($1, $2, $3, $4)';
    pool.query(q, [ID, title, author, image], (err, results) => {
        if(err) {
            console.log(title, author, image);
            console.log(err);
            res.status(500).json({
               message: 'Unable to create book'
            });
        } else {
            res.status(201).json({
                message: `Book added with ID: ${ID}`
            });
        }
    });
};

const updateBook = (req, res) => {
    const ID = parseInt(req.params.id);
    const { title, author, image } = req.body;

    const q = `UPDATE books SET title=${title}, author=${author}, image=${image} WHERE id = ${ID}`;
    pool.query(q, (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).json({
               message: 'Unable to update book'
            });
        } else {
            res.status(200).json({
                message: `Book updated with ID: ${ID}`
            });
        }
    });
};

const deleteBook = (req, res) => {
    const ID = parseInt(req.params.id);

    const q = `DELETE FROM books WHERE id = ${ID}`;
    pool.query(q, (err, results) => {
        if(err) {
            console.log(err);
            res.status(500).json({
               message: 'Unable to delete Book'
            });
        } else {
            res.status(200).json({
                message: `Boook deleted with ID: ${ID}`
            });
        }
    });
};

module.exports = {
    getBooks,
    createBook,
    getBookById,
    updateBook,
    deleteBook,
}
