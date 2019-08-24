/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //login page
  router.get("/login", (req, res) => {
    res.render("login");
  });

  //browse user's orders
  router.get("/:user_id/orders", (req, res) => {

  });

  //browse user's specfic order
  router.get("/:user_id/orders/:order_id", (req, res) => {

  });

  return router;
};
