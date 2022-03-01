/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.renameColumn('publisher', 'name', 'name_publisher')
};

exports.down = pgm => {
    pgm.dropColumn('publisher', 'name_publisher')
};

