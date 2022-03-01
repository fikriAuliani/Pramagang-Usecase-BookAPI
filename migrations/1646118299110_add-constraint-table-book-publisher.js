/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
pgm.addConstraint('book', 'fk_Book.publisher_id_publisher_id', `FOREIGN KEY (publisher_id) REFERENCES publisher(publisher_id) ON DELETE CASCADE`)
};

exports.down = pgm => {
pgm.dropConstraint('book','fk_Book.publisher_id_publisher_id')
};
