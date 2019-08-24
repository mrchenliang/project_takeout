const { Pool } = require('pg')
const dbParams = require('./db.js');

const pool = new Pool(
  dbParams
);

const DB = {
  getAllRestaurants: function() {
    return pool
      .query('SELECT * FROM restaurants;').then(result => {
        return JSON.parse(JSON.stringify(result.rows));
      })
      .catch(e =>
        setImmediate(() => {
          throw e;
        })
      );
  },
  getMenuItems: function(restId) {
    const params = [];
    params.push(restId);
    return pool
      .query(`SELECT * FROM menu_items WHERE restaurant_id = $1;`, params).then(result => {
        return JSON.parse(JSON.stringify(result.rows));
      })
      .catch(e =>
        setImmediate(() => {
          throw e;
        })
      );
  }
};

module.exports = DB;

