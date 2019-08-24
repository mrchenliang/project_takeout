const dbHelpers = {
  getAllRestaurants: function(db) {
    return db
      .query('SELECT * FROM restaurants;').then(result => {
        return JSON.parse(JSON.stringify(result.rows));
      })
      .catch(e =>
        setImmediate(() => {
          throw e;
        })
      );
  },
  getMenuItems: function(db, restId) {
    const params = [];
    params.push(restId);
    return db
      .query(`SELECT * FROM menu_items WHERE restaurant_id = $1;`, params).then(result => {
        return JSON.parse(JSON.stringify(result.rows));
      })
      .catch(e =>
        setImmediate(() => {
          throw e;
        })
      );
  },
  getUserByEmail: function(db, email) {
    const params = [];
    params.push(email);
    return db
      .query(`SELECT * FROM users WHERE email = $1;`, params).then(result => {
        return JSON.parse(JSON.stringify(result.rows));
      })
      .catch(e =>
        setImmediate(() => {
          throw e;
        })
      );
  }
};

module.exports = dbHelpers;

