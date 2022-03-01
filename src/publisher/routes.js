const express = require("express");
const validatePublisher = require("../validationPublisher");
const PublisherServices = require("./services");
const route = express.Router();


route.post('/publisher', async(req, res) => {                                  //menambahkan data
    try {
        await validatePublisher.validateAsync(req.body)
        
        const Publisher = await new PublisherServices().addPublisher(req.body);
        res.json({
            status: 'success',
            message: 'Publisher berhasil ditambahkan',
            data: Publisher
        })
    } catch (error) {
        res.json({
            status: 'fail',
            message: error.message
        });
    }

});

route.get('/publisher', async(req, res) => {                                        //get all note
    try {
        const publisher = await new PublisherServices().getPublisher();
        res.json({
            status: 'success',
            data: { publisher } 
        })
    } catch (error) {

    }
    
});

route.get('/publisher/:publisherid', async (req, res) => {                                   //get note by Id
    try {
        const publisherId = req.params.publisherid;
        const getPublisherById = await new PublisherServices().getPublisherById(publisherId);   
        const getDetailById = await new PublisherServices().getDetailById(publisherId);       
        
        const detail = {
            id: getPublisherById.publisher_id,
            name: getPublisherById.name_publisher,
            city: getPublisherById.city,
            countBook: getDetailById.rowCount,
            Book: getDetailById.rows.map(e => ({
                id: e.book_id,
                name: e.title,
                pages: e.pages,
                author: e.name_author
            }))
        }

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

route.put('/publisher/:publisherid', async (req, res) => {                                       //mengedit atau update data
    
    const publisherId = req.params.publisherid;
    
    try {
        await validatePublisher.validateAsync(req.body);
        
        const editPublisher = await new PublisherServices().editPublisherById(publisherId, req.body);
        res.json({
            status: 'success',
            message: 'Publisher berhasil diedit',
            data: editPublisher
        });
       
    } catch (error) {
        res.json({
            status: 'fail',
            message: error.message
        });
    }
    
});

route.delete('/publisher/:publisherid', async (req, res) => {                                    //menghapus data
    try {
        const publisherId = req.params.publisherid;
        const deletePublisher = await new PublisherServices().deletePublisherById(publisherId);
        res.json({
            status: 'success',
            message: 'Publisher berhasil dihapus',
            data: deletePublisher
        });
    } catch (error) {
        res.json({
            status: 'fail',
            message: error.message
        });
    }
    
});

module.exports = route;

