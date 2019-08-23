DROP TABLE IF EXISTS restaurants CASCADE;

CREATE TABLE restaurants (
  id VARCHAR(20) PRIMARY KEY,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  website VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  cover_photo_url VARCHAR(255) NOT NULL,
  thumbnail_url VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  estimated_time INTEGER DEFAULT 15,
  open_time INTEGER DEFAULT 10,
  close_time INTEGER DEFAULT 22,
  active BOOLEAN DEFAULT true
);
