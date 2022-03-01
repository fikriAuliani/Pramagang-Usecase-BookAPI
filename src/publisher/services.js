const { nanoid } = require("nanoid");
const { Pool } = require("pg");

class PublisherServices {
    
    constructor() {
        this._poll = new Pool();
    };

    async addPublisher({name_publisher, city}) {
        
        const id = `publisher-${nanoid(16)}`; //16 karakter
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO publisher VALUES($1, $2, $3, $4, $5) RETURNING publisher_id',
            values: [id, name_publisher, city, createdAt, updatedAt]
        };

        const result = await this._poll.query(query);

            if (!result.rows[0].publisher_id) {
                throw new Error('Publisher gagal ditambahkan');                 //error message
            }
    
            return result.rows[0];
    };

    async getPublisher() {
        const result = await this._poll.query('SELECT * FROM publisher');
        return result.rows;

    };


    async getPublisherById(publisherId) {
        const query = {
            text: 'SELECT * FROM publisher WHERE publisher_id = $1',
            values: [publisherId]
        };

        const result = await this._poll.query(query);

        if (!result.rows.length) {

            throw new Error('Publisher tidak ditemukan')                             //error message
        };

        return result.rows[0];

    };

    async getDetailById(publisherId){
        const query = {
          text: 'SELECT B.book_id, B.title, B.pages. A.name_author AS author FROM publisher P JOIN book B ON P.publisher_id = B.publisher_id JOIN author A ON B.author_id = A.author_id WHERE P.publisher_id = $1',
          values: [publisherId]
        };

        const result = await this.pool.query(query);
        if(!result){
            throw new Error ('Detail publisher gagal ditampilkan')        //error message
        }
        return result;
    }

    async editPublisherById(PublisherId, {name_publisher, city}) {

        const updatedAt = new Date().toISOString();
        const query = {
           text: 'UPDATE publisher SET name_publisher=$1, city=$2, updated_at=$3 WHERE publisher_id = $4 RETURNING publisher_id',
           values: [name_publisher, city, updatedAt, PublisherId]
        };

        const result = await this._poll.query(query);

        if (!result.rowCount) {
            throw new Error(`Publisher tidak dapat diubah, Id tidak ditemukan`)          //error message
        };
    };
   
    async deletePublisherById(PublisherId) {
        const query = {
            text: 'DELETE FROM publisher WHERE publisher_id = $1',
            values: [PublisherId]
        };

        const result = await this._poll.query(query);
            
        if(!result.rowCount) {
            throw new Error('Publisher gagal dihapus, Id tidak ditemukan');              //error message
        };        
    };


};

module.exports = PublisherServices;