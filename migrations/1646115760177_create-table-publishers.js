/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('publisher', {
        publisher_id: {
            type: 'VARCHAR(50)',
            notNull: true,
            primaryKey: true,
         }, 
         name:{
             type: 'TEXT',
             notNull: true
         },
         city:{
            type: 'VARCHAR(50)'
        },
         created_at: {
             type: 'TEXT',
             notNull: true
         },
         updated_at:{
             type: 'TEXT', 
             notNull: true
         },
    })
};

exports.down = pgm => {
    pgm.dropTable('publisher')
};

