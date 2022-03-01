const { nanoid } = require("nanoid");
const { Pool } = require("pg");

class BookServices {
    
    constructor() {
        this._poll = new Pool();
    };

    async addBook({title, isbn, pages, year,author_id, publisher_id}) {
        
        const id = `book-${nanoid(16)}`; //16 karakter
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO book VALUES($1, $2, $3, $4, $5,$6, $7, $8, $9) RETURNING book_id',
            values: [id, title, isbn, pages, year, createdAt, updatedAt, author_id, publisher_id]
        };

        const result = await this._poll.query(query);

            if (!result.rows[0].book_id) {
                throw new Error('Buku gagal ditambahkan');                 //error message
            }
    
            return result.rows[0];
    };

    async getBook() {
        const result = await this._poll.query('SELECT book_id AS id,title, author.name_author AS author FROM book JOIN author ON book.author_id = author.author_id');
        return result.rows;

    };


    async getBookById(bookId) {
        const query = {
            text: 'SELECT book.*, author.name_author AS author FROM book JOIN author ON book.author_id = author.author_id WHERE book_id = $1',
            values: [bookId]
        };

        const result = await this._poll.query(query);

        if (!result.rows.length) {

            throw new Error('Buku tidak ditemukan')                             //error message
        };

        return result.rows[0];

    };

    async editBookById(BookId, {title, isbn, pages, year, author_id, publisher_id}) {

        const updatedAt = new Date().toISOString();
        const query = {
           text: 'UPDATE book SET title=$1, isbn=$2, pages=$3, year=$4, author_id=$5, publisher_id=$6, updated_at=$7 WHERE book_id = $8 RETURNING book_id',
           values: [title, isbn, pages, year, author_id, publisher_id, updatedAt, BookId]
        };

        const result = await this._poll.query(query);

        if (!result.rowCount) {
            throw new Error(`Buku tidak dapat diubah, Id tidak ditemukan`)          //error message
        };
    };
   
    async deleteBookById(BookId) {
        const query = {
            text: 'DELETE FROM book WHERE book_id = $1',
            values: [BookId]
        };

        const result = await this._poll.query(query);
            
        if(!result.rowCount) {
            throw new Error('Buku gagal dihapus, Id tidak ditemukan');              //error message
        };        
    };


};

module.exports = BookServices;