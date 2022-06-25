const router = require('express').Router();
const bookController = require('./controller/bookController')

router.get('/books',bookController.allBooks); //show all the books
router.get('/books/:id',bookController.show); //show the specific book
router.post('/books',bookController.create); //create the book record
router.put('/books/:id',bookController.update); //update the book details
router.delete('/books/:id',bookController.delete); //delete the book record
module.exports = router