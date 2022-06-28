const BookDB = require('../models/bookModel');

const fs = require('fs')



class bookController{
    async allBooks(req,res,next){
        let documents;
        if(req.params.id){
            const id = req.params.id;
            try{
                documents = await BookDB.findById(id).select('-updatedAt -__v -createdAt').sort({ createdAt: -1});
            }catch(err){
                return next(err);
            }
            return res.json(documents);
        }
        else{
            try{
                documents = await BookDB.find().select('-updatedAt -__v -createdAt').sort({ createdAt: -1});
            }catch(err){
                return next(err);
            }
            return res.json(documents);
        }
    };
    async create(req,res, next){
        if(!req.body){
            res.status(400).status({message: 'Content cannot be empty'})
        }
        const filepath =req.file.path.replace(/\\/g, '/');
        const { title, author, dateOfPublication, chapters, price } = req.body;
        let document ;
        try{
            document = await BookDB.create({
                title,
                image: filepath,
                author,
                dateOfPublication,
                chapters,
                price
            });
        }catch(err){
            return next(err);
        }
        res.status(201).json(document);
    };
    async update(req,res){
        if(!req.body){
            res.status(400).status({message: 'Content cannot be empty'})
        }
        let filepath;
        if(req.file){
            filepath = req.file.path.replace(/\\/g, '/');
        }
        const { title, author, dateOfPublication, chapters, price } = req.body;
        let document ;
        try{
            document = await BookDB.findOneAndUpdate(({id:req.params.id}),{
                title,
                ...(req.file && {image: filepath}),
                author,
                dateOfPublication,
                chapters,
                price
            }, {new:true});
        }catch(err){
            return next(err);
        }
        console.log(document);
        res.json(document);
    };
    async delete(req,res,next){
        const document = await BookDB.findOneAndRemove({ _id:req.params.id  });
        if(!document){
            return next(new Error('Nothing to delete'));
        }
        //delete an image
        const imagePath = document._doc.image;
        console.log(imagePath);
        fs.unlink(`${appRoot}/${imagePath}`,(err)=>{
            if(err){
                res.status(500).send({message: 'Server error'})
            }
        })
        res.json(document);
    }
}

module.exports = new bookController()