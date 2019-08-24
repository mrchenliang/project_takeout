const { Pool } = require('pg')

const pool = new Pool({
  user: 'ircwuheg',
  password: 'zGTy9IiFJ-wOLrShjmtOMp-1f5vf2I_D',
  host: 'raja.db.elephantsql.com',
  database: 'ircwuheg',
  port: 5432
});

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

