/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const helpers = require('../lib/dbHelpers.js');

module.exports = (db) => {
  router.get("/", (req, res) => {});

  //login page
  router.get("/login", (req, res) => {});

  //browse user's orders
  router.get("/:user_id/orders", (req, res) => {});

  //browse user's specfic order
  router.get("/:user_id/orders/:order_id", (req, res) => {});

  //login the user
  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    helpers.getUserByEmail(db, email)
      .then(result => {
        const userDetails = result[0];
        if (userDetails.password === password) {
          res.send("Logged In");
        } else {
          res.send("Incorrect credentials");
        }
      });
  });
  return router;
};
