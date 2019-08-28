/*
 * All routes for the Clients are defined here
 * Since this file is loaded in server.js into api/restaurants,
 *   these routes are mounted onto /restaurants
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const helpers = require('../lib/dbHelpers.js');
const sendMessage = require('./send_sms');

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

  //update an order to confirmed if it currently has a status of submitted and sets it to completed if the order is currently confirmed
  router.post("/:client_id/orders/:order_id", (req, res) => {
    const order_id = req.params.order_id;
    const est_time = req.body.est_time;

    helpers.markOrder(db, order_id, est_time)
      .then(result => {
        const markOrderResult = result[0];
        const user_id = result[0].user_id;
        helpers.getUserById(db, user_id)
          .then(result => {
            const phone = result.phone;
            //console.log(markOrderResult);
            if (markOrderResult.status === "confirmed") {
              sendMessage(`Your order has been confirmed and is being prepared. Estimated wait time is ${markOrderResult.wait_time} minutes. Hold tight!`, result.phone);
            } else if (markOrderResult.status === "completed") {
              sendMessage("Your order is ready for pick up. Enjoy!", result.phone);
            }
            //send sms message
            res.send(markOrderResult);
          })
      })
      .catch(e =>
        setImmediate(() => {
          throw e;
        })
      );
  });

  return router;
};

