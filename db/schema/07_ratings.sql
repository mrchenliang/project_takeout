DROP TABLE IF EXISTS ratings CASCADE;

CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  restaurant_id VARCHAR(20) REFERENCES restaurants(id) ON DELETE CASCADE,
  rating INTEGER,
  comment TEXT
);
