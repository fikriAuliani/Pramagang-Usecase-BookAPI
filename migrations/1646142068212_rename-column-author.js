/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.renameColumn('author', 'name', 'name_author')
};

exports.down = pgm => {
    pgm.dropColumn('author', 'name_author')
};
