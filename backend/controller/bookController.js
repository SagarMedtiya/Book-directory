const BookDB = require('../models/bookModel');
class bookController{
    async allBooks(req,res){
        let documents;
        //mongoose-pagination
        try{
            documents = await BookDB.find().select('-updatedAt -__v').sort({ createdAt: -1});
        }catch(err){
            return next(err);
        }
        return res.json(documents);
    };
    async show(req, res, next){
        let documents;
        //mongoose-pagination
        try{
            documents = await BookDB.findById({_id: req.params.id}).select('-updatedAt -__v').sort({ createdAt: -1});
        }catch(err){
            return next(err.message);
        }
        return res.json(documents);
    }
    async create(req,res){
        if(!req.body){
            return res.status(400).send({message: "Content cannot be empty!"})
        }
        const {
            title,
            image,
            authors ,
            dateOfPublication,
            chapters,
            price
        }= req.body;
        console.log(req.body)
        const bookExist = BookDB.find(data =>data.title === title);
        if(bookExist) {
            return res.send('book already existed')
        }
        const book ={
            title,
            image,
            authors,
            dateOfPublication,
            chapters,
            price
        }
        await BookDB.create(book)
            .then(data=>{
                res.status(200).send({message :"Book added"})
            })
            .catch(err=>{
                res.status(500).send({message:err.message})
            })
    };
    async update(req,res){
        if(!req.body){
            res.status(400).send({message: 'Content cannot be empty'})
        }
        const id = req.params.id;
        BookDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data=>{
            if(!data){
                res.status(404).send({message: `Cannot Update book with ${id}. `})
            }else{
                res.status(200).send({message :"Book updated!"})
            }
        })
        .catch(err=>{
            res.status(500).send({message : "Error update book information"})
        })
    };
    async delete(req,res){
        const id = req.params.id;
        BookDB.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot delete. Check the ${id}`})
            }
            else{
                res.status(200).send({message:'Book deleted Successfully'})
            }
        })
        .catch(err=>{
            res.status(500).send({message:`Cannot delete this book.`})
        })
    }
}

module.exports = new bookController()