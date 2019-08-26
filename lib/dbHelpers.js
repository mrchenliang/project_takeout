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
        return result.rows[0];
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
      .query(
        `SELECT * FROM orders WHERE user_id = $1 AND status = 'pending';`,
        params
      )
      .then(result => {
        if (result.rowCount) {
          return result.rows[0].id;
        }
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
      .then(result => result.rows[0].price)
      .catch(e =>
        setImmediate(() => {
          throw e;
        })
      );
  },

  getRestaurantByMenuItem: function(db, menu_item_id) {
    const params = [];
    params.push(menu_item_id);
    return db
      .query(
        `SELECT distinct restaurants.* FROM restaurants JOIN menu_items ON menu_items.restaurant_id = restaurants.id
      WHERE menu_items.id = $1;`,
        params
      )
      .then(result => result.rows[0])
      .catch(e =>
        setImmediate(() => {
          throw e;
        })
      );
  },

  addToOrder: function(db, user_id, menu_item_id, quantity, notes) {
    return this.getUsersPendingOrder(db, user_id)
      .then(resultId => {
        let order_id = null;
        if (resultId) {
          order_id = resultId;
        }

        this.getMenuItemPrice(db, menu_item_id).then(price => {
          if (order_id) {
            //add to an existing order
            const params = [];
            params.push(order_id);
            params.push(menu_item_id);
            params.push(quantity);
            params.push(notes);
            params.push(quantity * price);

            return db
              .query(
                `INSERT INTO order_details (order_id, menu_item_id, quantity, notes, price) VALUES ($1, $2, $3, $4, $5) RETURNING *;
              `,
                params
              )
              .then(result => {
                // console.log("servers result: ", result.rows);
                return JSON.parse(JSON.stringify(result.rows[0]));
              });
          } else {
            //create a new order and add the item
            this.getRestaurantByMenuItem(db, menu_item_id).then(
              restaurantDetails => {
                const params = [];
                params.push(user_id);
                params.push(restaurantDetails.id);
                params.push(new Date());
                params.push(restaurantDetails.estimated_time);
                //console.log(params);
                return db
                  .query(
                    `INSERT INTO orders (user_id, restaurant_id, placed_at, wait_time) VALUES ($1, $2, $3, $4) RETURNING *`,
                    params
                  )
                  .then(result => {
                    const params = [];
                    params.push(result.rows[0].id);
                    params.push(menu_item_id);
                    params.push(quantity);
                    params.push(notes);
                    params.push(quantity * price);

                    return db
                      .query(
                        `INSERT INTO order_details (order_id, menu_item_id, quantity, notes, price) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
                        params
                      )
                      .then(result => {
                        // console.log("servers result: ", result.rows);
                        return JSON.parse(JSON.stringify(result.rows[0]));
                      });
                  });
              }
            );
          }
        });
      })
      .catch(e =>
        setImmediate(() => {
          throw e;
        })
      );
  }
};

module.exports = dbHelpers;
