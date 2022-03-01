const express = require("express");
const validateAuthor = require("../validationAuthor");
const AuthorServices = require("./services");
const route = express.Router();


route.post('/author', async(req, res) => {                                  //menambahkan data
    try {
        await validateAuthor.validateAsync(req.body)
        
        const authors = await new AuthorServices().addAuthor(req.body);
        res.json({
            status: 'success',
            message: 'Author berhasil ditambahkan',
            data: authors
        })
    } catch (error) {
        res.json({
            status: 'fail',
            message: error.message
        });
    }

});

route.get('/author', async(req, res) => {                                        //get all note
    try {
        const authors = await new AuthorServices().getAuthor();
        res.json({
            status: 'success',
            data: { authors } 
        })
    } catch (error) {

    }
    
});

route.get('/author/:id', async (req, res) => {                                   //get note by Id
    try {
        const authorid = req.params.id;
        const getAuthor = await new AuthorServices().getAuthorById(authorid);     
        const getDetail = await new AuthorServices().getDetailById(authorid);
        
        const detail = {
            id: getAuthor.author_id,
            nama: getAuthor.name_author,
            countBooks: getDetail.rowCount,
            book: getDetail.rows.map((element) => ({
              id: element.book_id,
              title: element.title,
              pages: element.pages,
            })),
          };

        res.json({
            status: 'success',
            data: detail
        });

    } catch (error) {
        res.json({
            status: 'fail',
            message: error.message
        });
    }
    
});

route.put('/author/:id', async (req, res) => {                                       //mengedit atau update data
    
    const authorId = req.params.id;
    
    try {
        await validateAuthor.validateAsync(req.body);
        
        const editAuthor = await new AuthorServices().editAuthorById(authorId, req.body);
        res.json({
            status: 'success',
            message: 'Author berhasil diedit',
            data: editAuthor
        });
       
    } catch (error) {
        res.json({
            status: 'fail',
            message: error.message
        });
    }
    
});

route.delete('/author/:id', async (req, res) => {                                    //menghapus data
    try {
        const authorId = req.params.id;
        const deleteAuthor = await new AuthorServices().deleteAuthorById(authorId);
        res.json({
            status: 'success',
            message: 'Author berhasil dihapus',
            data: deleteAuthor
        });
    } catch (error) {
        res.json({
            status: 'fail',
            message: error.message
        });
    }
    
});

module.exports = route;

