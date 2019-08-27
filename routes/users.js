/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const helpers = require("../lib/dbHelpers.js");

module.exports = db => {
  router.get("/", (req, res) => {});

  //login page
  router.get("/login", (req, res) => {});

  //login the user
  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    helpers
      .getUserByEmail(db, email)
      .then(result => {
        const userDetails = result;
        if (result) {
          if (userDetails.password === password) {
            res.send(result);
          }
        } else {
          res.send({error: 'Error'});
        }
      })
      .catch(e =>
        setImmediate(() => {
          throw e;
        })
      );
  });

  //registers the user
  router.post('/', (req, res) => {
    const { name, email, phone, password } = req.body;
    console.log(name, email, phone, password);
    helpers.registerUser(db, name, email, phone, password).then(result => {
      res.send(result)
    });
  })

  //returns the users pending order details
  router.get("/:user_id/orders", (req, res) => {
    const user_id = req.params.user_id;
    helpers
      .getUsersPendingOrderDetails(db, user_id)
      .then(result => {
        res.send(result);
      })
      .catch(e =>
        setImmediate(() => {
          throw e;
        })
      );
  });

  // //returns the users order details by order id
  // router.get("/:user_id/orders", (req, res) => {
  //   const user_id = req.params.user_id;

  //   helpers
  //     .getUsersOrderByOrderId(db, user_id)
  //     .then(result => {
  //       res.send(result);
  //     })
  //     .catch(e =>
  //       setImmediate(() => {
  //         throw e;
  //       })
  //     );
  // });

  //add an item to the users order
  router.post("/:user_id/orders", (req, res) => {
    const user_id = req.params.user_id;
    const menu_item_id = req.body.menu_item_id;
    const quantity = req.body.quantity;
    const notes = req.body.notes;

    helpers
      .addToOrder(db, user_id, menu_item_id, quantity, notes)
      .then(result => {
        // console.log(result);
        res.send(result);
      })
      .catch(e =>
        setImmediate(() => {
          throw e;
        })
      );
  });

  //edit an item in the users order
  router.put("/:user_id/orders", (req, res) => {
    const user_id = req.params.user_id;
    const menu_item_id = req.body.menu_item_id;
    const quantity = req.body.quantity;
    const notes = req.body.notes;

    helpers
      .editOrderItem(db, user_id, menu_item_id, quantity, notes)
      .then(result => {
        // console.log(result);
        res.send(result);
      })
      .catch(e =>
        setImmediate(() => {
          throw e;
        })
      );
  });

  //delete an item from the users order
  router.delete("/:user_id/orders", (req, res) => {
    const user_id = req.params.user_id;
    const menu_item_id = req.body.menu_item_id;
    const notes = req.body.notes;

    helpers
      .deleteFromOrder(db, user_id, menu_item_id, notes)
      .then(result => {
        res.send(result);
      })
      .catch(e =>
        setImmediate(() => {
          throw e;
        })
      );
  });

  //submit the users order (mark as submitted)
  router.put("/:user_id/orders/submit", (req, res) => {
    const user_id = req.params.user_id;

    helpers.submitOrder(db, user_id)
      .then(result => {
        res.send(result);
      })
      .catch(e =>
        setImmediate(() => {
          throw e;
        })
      );
  });

  return router;
};
