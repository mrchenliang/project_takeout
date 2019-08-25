/*
 * All routes for Restaurants are defined here
 * Since this file is loaded in server.js into api/restaurants,
 *   these routes are mounted onto /restaurants
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const helpers = require('../lib/dbHelpers.js');

module.exports = (db) => {
  //browse restaurants
  router.get("/", (req, res) => {
    helpers.getAllRestaurants(db).then(result => res.send(result));
  });

  //browse restaurant menu route
  router.get("/:restaurant_id", (req, res) => {
    helpers.getMenuItems(db, req.params.restaurant_id).then(result => res.send(result));
  });

  return router;
};
