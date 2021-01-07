DROP TABLE IF EXISTS users;
CREATE TABLE users
(
  user_id SERIAL NOT NULL PRIMARY KEY,
  user_name VARCHAR(100) NOT NULL CHECK(user_name <> ''),
  user_email VARCHAR(100) NOT NULL CHECK(user_email <> ''),
  user_password VARCHAR(100) NOT NULL CHECK(user_password  <> ''),
  isAdmin BOOLEAN NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS debts;
CREATE TABLE debts
(
  debt_id SERIAL NOT NULL PRIMARY KEY,
  user_id INT,
  balance NUMERIC(10, 2) NOT NULL CHECK(balance > 0),
  interest_rate DECIMAL (5, 2) NOT NULL CHECK(interest_rate >= 0),
  min_payment NUMERIC (10, 2) NOT NULL CHECK(min_payment > 0),
  debt_type VARCHAR(50) NOT NULL CHECK(debt_type <> ''),
  account_name VARCHAR(50) CHECK(account_name <> ''),
  CONSTRAINT fk_user
    FOREIGN KEY(user_id) 
      REFERENCES users(user_id)
      ON DELETE SET NULL
);
