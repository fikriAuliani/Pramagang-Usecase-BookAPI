const { nanoid } = require("nanoid");
const { Pool } = require("pg");

class AuthorServices {
    
    constructor() {
        this._poll = new Pool();
    };

    async addAuthor({name_author}) {
        
        const id = `author-${nanoid(16)}`; //16 karakter
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO author VALUES($1, $2, $3, $4) RETURNING author_id',
            values: [id, name_author, createdAt, updatedAt]
        };

        const result = await this._poll.query(query);

            if (!result.rows[0].author_id) {
                throw new Error('Author gagal ditambahkan');                 //error message
            }
    
            return result.rows[0];
    };

    async getAuthor() {
        const result = await this._poll.query('SELECT * FROM author');
        return result.rows;

    };


    async getAuthorById(authorId) {
        const query = {
            text: 'SELECT * FROM author WHERE author_id = $1',
            values: [authorId]
        };

        const result = await this._poll.query(query);

        if (!result.rows.length) {

            throw new Error('Author tidak ditemukan')                             //error message
        };

        return result.rows[0];

    };

    async getDetailById(authorId){
        const query = {
          text: 'SELECT author.author_id, author.name_author, book.book_id, book.title, book.pages FROM author JOIN book ON author.author_id = book.author_id WHERE author.author_id = $1',
          values: [authorId]
        };

        const result = await this.pool.query(query);
        if(!result){
            throw new Error ('Detail author gagal ditampilkan')
        }
        return result;
    }

    async editAuthorById(authorId, {name_author}) {

        const updatedAt = new Date().toISOString();
        const query = {
           text: 'UPDATE author SET name_author=$1, updated_at=$2 WHERE author_id = $3 RETURNING author_id',
           values: [name_author, updatedAt, authorId]
        };

        const result = await this._poll.query(query);

        if (!result.rowCount) {
            throw new Error(`Author tidak dapat diubah, Id tidak ditemukan`)          //error message
        };
    };
   
    async deleteAuthorById(authorId) {
        const query = {
            text: 'DELETE FROM author WHERE author_id = $1',
            values: [authorId]
        };

        const result = await this._poll.query(query);
            
        if(!result.rowCount) {
            throw new Error('Author gagal dihapus, Id tidak ditemukan');              //error message
        };        
    };


};

module.exports = AuthorServices;