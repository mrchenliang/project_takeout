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
      .query(
        `SELECT menu_items.*, categories.name as category_name, restaurants.name as restaurant_name, restaurants.phone as restaurant_phone, restaurants.website as restaurant_website, restaurants.address as restaurant_address, restaurants.cover_photo_url as restaurant_image_url
        FROM menu_items JOIN categories ON menu_items.category_id = categories.id
        JOIN restaurants ON menu_items.restaurant_id = restaurants.id
        WHERE restaurant_id = $1;`,
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

  // getUsersPendingOrderDetails: function(db, user_id) {
  //   return this.getUsersPendingOrder(db, user_id)
  //     .then(resultId => {
  //       const params = [];
  //       params.push(resultId);
  //       return db
  //         .query(
  //           `SELECT order_details.*, menu_items.name FROM order_details JOIN menu_items on order_details.menu_item_id = menu_items.id WHERE order_id = $1;`,
  //           params
  //         )
  //         .then(result => result.rows[0]);
  //     })
  //     .catch(e =>
  //       setImmediate(() => {
  //         throw e;
  //       })
  //     );
  // },

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

  getCategoryNameById: function(db, category_id) {
    const params = [];
    params.push(category_id);
    return db
      .query(`SELECT name FROM categories WHERE id = $1;`, params)
      .then(result => result.rows[0])
      .catch(e =>
        setImmediate(() => {
          throw e;
        })
      );
  },

  deleteFromOrder: function(db, user_id, menu_item_id) {
    return this.getUsersPendingOrder(db, user_id).then(result => {
      const params = [];
      params.push(result);
      params.push(menu_item_id);
      //delete from order details
      return db
        .query(
          `DELETE FROM order_details where order_id = $1 and menu_item_id = $2
            RETURNING *;
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
    });
  },

  addToOrder: function(db, user_id, menu_item_id, quantity, notes) {
    return this.getUsersPendingOrder(db, user_id)
      .then(result => {
        let order_id = null;
        if (result) {
          order_id = result;
        }

        return this.getMenuItemPrice(db, menu_item_id).then(price => {
          if (order_id) {
            //add to an existing order
            const params = [];
            params.push(order_id);
            params.push(menu_item_id);
            params.push(quantity);
            params.push(notes);
            params.push(price);

            return db
              .query(
                `INSERT INTO order_details (order_id, menu_item_id, quantity, notes, price) VALUES ($1, $2, $3, $4, $5) RETURNING *;
              `,
                params
              )
              .then(result => {
                return JSON.parse(JSON.stringify(result.rows[0]));
              });
          } else {
            //create a new order and add the item
            return this.getRestaurantByMenuItem(db, menu_item_id).then(
              restaurantDetails => {
                const params = [];
                params.push(user_id);
                params.push(restaurantDetails.id);
                params.push(new Date());
                params.push(restaurantDetails.estimated_time);

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
  },

  editOrderItem: function(db, user_id, menu_item_id, quantity, notes) {
    return this.getUsersPendingOrder(db, user_id)
      .then(result => {
        let order_id = result;

        return this.getMenuItemPrice(db, menu_item_id).then(price => {
          //edit existing order
          const params = [];
          params.push(order_id);
          params.push(menu_item_id);
          params.push(quantity);
          params.push(notes);
          params.push(quantity * price);

          return db
            .query(
              `UPDATE order_details SET quantity = $3, notes = $4, price = $5 WHERE order_id = $1 AND menu_item_id = $2 RETURNING *;
              `,
              params
            )
            .then(result => {
              return JSON.parse(JSON.stringify(result.rows[0]));
            });
        });
      })
      .catch(e =>
        setImmediate(() => {
          throw e;
        })
      );
  },

  getAllOrders: function(db, restaurant_id) {
    params = [];
    params.push(restaurant_id);
    console.log(params);
    return db
      .query("SELECT * FROM orders where restaurant_id = $1;", params)
      .then(result => {
        return JSON.parse(JSON.stringify(result.rows));
      })
      .catch(e =>
        setImmediate(() => {
          throw e;
        })
      );
  },

  getOrderByID: function(db, id) {
    params = [];
    params.push(id);
    return db
      .query(
        "SELECT * FROM orders_detail join orders on orders.id = order_id where orders.id = $1;",
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
  },

  getUsersPendingOrderDetails: function(db, user_id) {
    //username, userid, restaurantname, restaurantid, itemname, itemid, quantity, price, notes, placedat, status
    params = [];
    params.push(user_id);
    return db
      .query(
        `SELECT users.name as user_name, users.id as user_id, restaurants.name as restautant_name, restaurants.id as restaurant_id, menu_items.name as menu_item_name, menu_items.id as menu_item_id, order_details.notes as notes, order_details.quantity as quantity, order_details.price as price, orders.placed_at as placed_at, orders.status as status FROM orders
        JOIN users ON orders.user_id = users.id
        JOIN order_details ON order_details.order_id = orders.id
        JOIN restaurants ON orders.restaurant_id = restaurants.id
        JOIN menu_items ON order_details.menu_item_id = menu_items.id
        WHERE user_id = $1 AND orders.status = 'pending';`,
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
  },

  markOrderConfirmed: function(db, id) {
    params = [];
    params.push(id);
    return db
      .query(
        `UPDATE orders SET status = 'confirmed' WHERE orders.id = $1
     RETURNING *;
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
  },

  submitOrder: function(db, user_id) {
    return this.getUsersPendingOrder(db, user_id)
      .then(result => {
        const order_id = result;
        const params = [];
        params.push(new Date());
        params.push(order_id);
        return db
          .query(
            `UPDATE orders SET status = 'submitted', placed_at = $1 where id = $2 RETURNING *`,
            params
          )
          .then(result => {
            return result.rows[0];
          });
      })
      .catch(e =>
        setImmediate(() => {
          throw e;
        })
      );
  },

  registerUser: function(db, name, email, phone, password) {
    const params = [];
    params.push(name);
    params.push(email);
    params.push(phone);
    params.push(password);
    return db
      .query(
        `INSERT INTO users (name, email, phone, password) VALUES($1, $2, $3, $4);`,
        params
      )
      .then(result => {
        return result.rows[0];
      })
      .catch(e =>
        setImmediate(() => {
          throw e;
        })
      );
  }
};

module.exports = dbHelpers;
