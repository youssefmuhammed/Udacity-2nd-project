CREATE TABLE users (
  id              SERIAL PRIMARY KEY,
  firstName       VARCHAR(300) NOT NULL,
  lastName        VARCHAR(300) NOT NULL,
  userName        VARCHAR(300) NOT NULL,
  password VARCHAR(300) NOT NULL
);