DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
  status VARCHAR(30) DEFAULT 'pending',
  placed_at DATE NOT NULL,
  wait_time INTEGER NOT NULL
);
