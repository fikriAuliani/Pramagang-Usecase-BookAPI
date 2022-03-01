/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addConstraint('book', 'fk_Book.author_id_author_id', `FOREIGN KEY (author_id) REFERENCES author(author_id) ON DELETE CASCADE`)
    
};

exports.down = pgm => {
    pgm.dropConstraint('book', 'fk_Book.author_id_author_id')
};
