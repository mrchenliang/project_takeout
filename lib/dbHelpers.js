const dbHelpers = {
  getAllRestaurants: function(db) {
    return db
      .query("SELECT * FROM restaurants;")
      .then(result => {
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
      .query(`SELECT * FROM menu_items WHERE restaurant_id = $1;`, params)
      .then(result => {
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
      .query(`SELECT * FROM users WHERE email = $1;`, params)
      .then(result => {
        return JSON.parse(JSON.stringify(result.rows));
      })
      .catch(e =>
        setImmediate(() => {
          throw e;
        })
      );
  },

  getUsersPendingOrder: function(db, user_id) {
    const params = [];
    params.push(user_id);

    return db
      .query(`SELECT * FROM orders WHERE user_id = $1 AND status = 'pending';`, params)
      .then(result => {
        return JSON.parse(JSON.stringify(result.rows));
      })
      .catch(e =>
        setImmediate(() => {
          throw e;
        })
      );
  },

  getMenuItemPrice: function(db, menu_item_id) {
    const params = [];
    params.push(menu_item_id);

    return db
      .query(`SELECT price FROM menu_items WHERE id = $1;`, params)
      .then(result => {
        return JSON.parse(JSON.stringify(result.rows));
      })
      .catch(e =>
        setImmediate(() => {
          throw e;
        })
      );
  },

  addToOrder: function(db, user_id, menu_item_id, quantity, notes) {
    return this.getUsersPendingOrder(db, user_id).then(result => {
      let order_id = null;
      if (result[0]) {
        order_id = result[0].id;
      }

      this.getMenuItemPrice(db, menu_item_id).then(result => {
        const params = [];
        params.push(menu_item_id);
        params.push(quantity);
        params.push(notes);
        params.push(result[0].price);
        console.log(params);

        if (order_id) {
          params.push(order_id);
          //add to an existing order
          return db
            .query(
              `INSERT INTO order_details (order_id, menu_item_id, quantity, notes, price) VALUES ($5, $1, $2, $3, $4) RETURNING *;
              `, params
            )
            .then(result => {
              return JSON.parse(JSON.stringify(result.rows));
            })
            .catch(e =>
              setImmediate(() => {
                throw e;
              })
            );
        } else {
          //create a new order and add the item
          params.push(user_id);
          return db
            .query(
              `INSERT INTO orders (user_id, restaurant_id, placed_at, wait_time) VALUES (1, 'test', '2019-08-24 10:10', 15);
              `,
              params
            )
            .then(result => {
              return JSON.parse(JSON.stringify(result.rows));
            })
            .catch(e =>
              setImmediate(() => {
                throw e;
              })
            );
        }
      });
    });
  }
};

module.exports = dbHelpers;
