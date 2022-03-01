const express = require("express");
const validateBook = require("../validationBook");
const BookServices = require("./services");
const route = express.Router();


route.post('/book', async(req, res) => {                                  //menambahkan data
    try {
        await validateBook.validateAsync(req.body)
        
        const books = await new BookServices().addBook(req.body);
        res.json({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: books
        })
    } catch (error) {
        res.json({
            status: 'fail',
            message: error.message
        });
    }

});

route.get('/book', async(req, res) => {                                        //get all 
    try {
        const books = await new BookServices().getBook();
        res.json({
            status: 'success',
            data: { books } 
        })
    } catch (error) {

    }
    
});

route.get('/book/:bookid', async (req, res) => {                                   //get by Id
    try {
        const bookId = req.params.bookid;
        const getBookById = await new BookServices().getBookById(bookId);     
        res.json({
            status: 'success',
            data: getBookById
        });
    } catch (error) {
        res.json({
            status: 'fail',
            message: error.message
        });
    }
    
});

route.put('/book/:bookid', async (req, res) => {                                       //mengedit atau update data
    
    const bookId = req.params.bookid;
    
    try {
        await validateBook.validateAsync(req.body);
        
        const editBook = await new BookServices().editBookById(bookId, req.body);
        res.json({
            status: 'success',
            message: 'Buku berhasil diedit',
            data: editBook
        });
       
    } catch (error) {
        res.json({
            status: 'fail',
            message: error.message
        });
    }
    
});

route.delete('/book/:bookid', async (req, res) => {                                    //menghapus data
    try {
        const bookId = req.params.bookid;
        const deleteBook = await new BookServices().deleteBookById(bookId);
        res.json({
            status: 'success',
            message: 'Buku berhasil dihapus',
            data: deleteBook
        });
    } catch (error) {
        res.json({
            status: 'fail',
            message: error.message
        });
    }
    
});

module.exports = route;

