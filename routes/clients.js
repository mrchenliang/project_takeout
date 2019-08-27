/*
 * All routes for the Clients are defined here
 * Since this file is loaded in server.js into api/restaurants,
 *   these routes are mounted onto /restaurants
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const helpers = require('../lib/dbHelpers.js');

module.exports = (db) => {
  //get all orders from a specific restaurant
  router.get("/:client_id/orders", (req, res) => {
    helpers.getAllOrders(db, req.params.client_id)
      .then(result => res.send(result))
      .catch(e =>
        setImmediate(() => {
          throw e;
        })
      );
  });

  //get order details from specific restaurant and specific order
  router.get("/:client_id/orders/:order_id", (req, res) => {
    helpers.getOrderDetailsById(db, req.params.client_id, req.params.order_id)
      .then(result => res.send(result))
      .catch(e =>
        setImmediate(() => {
          throw e;
        })
      );
  });

  //post order details from specific restaurant and specific order
  router.post("/:client_id/orders/:order_id", (req, res) => {
    helpers.markOrderConfirmed(db, req.params.order_id).then(result => res.send(result));
  });

  return router;
};

