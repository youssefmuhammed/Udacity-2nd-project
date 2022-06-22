CREATE TABLE users (
  id              SERIAL PRIMARY KEY,
  firstName       VARCHAR(300) NOT NULL,
  lastName        VARCHAR(300) NOT NULL,
  userName        VARCHAR(300) NOT NULL,
  password VARCHAR(300) NOT NULL
);
CREATE TABLE products (
  id    SERIAL PRIMARY KEY,
  name  VARCHAR(300) NOT NULL,
  price INTEGER      NOT NULL
);
CREATE TABLE orders (
  id      SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id),
  quantity INTEGER NOT NULL
);
CREATE TABLE OrderProduct (
  order_id   INTEGER NOT NULL REFERENCES orders (id),
  product_id INTEGER NOT NULL REFERENCES products (id),
  quantity   INTEGER NOT NULL
);
