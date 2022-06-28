const api = require('express').Router();
const bookController = require('../controller/bookController')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: (req,file,cb) => cb(null,'uploads/'),
    filename: (req, file, cb)=>{
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    } 
});
const handleMultipartData = multer({ storage, limits: { fileSize: 1000000 * 5 }}).single('image');


api.get('/books',bookController.allBooks); //show all the books
api.get('/books/:id',bookController.allBooks); //show the specific book

api.post('/books',handleMultipartData,bookController.create); //create the book record
api.put('/books/:id',handleMultipartData,bookController.update); //update the book details
api.delete('/books/:id',bookController.delete); //delete the book record

module.exports = api