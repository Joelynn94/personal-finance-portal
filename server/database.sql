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

INSERT INTO users
  (user_name, user_email, user_password, isAdmin)
VALUES
  ('Joe Lynn', 'josephlynn@gmail.com', 'kite12345', true);


INSERT INTO debts
  (balance, user_id, user_id, interest_rate, min_payment, debt_type, account_name)
VALUES
  (10000, 1, 0.05, 200, 'Student Loan', 'Loan for Harvard University');

INSERT INTO debts
  (balance, user_id, interest_rate, min_payment, debt_type, account_name)
VALUES
  (20000, 1, 0.08, 400, 'Auto Loan', 'Wife car');

INSERT INTO debts
  (balance, user_id, interest_rate, min_payment, debt_type, account_name)
VALUES
  (25000, 1, 0.07, 500, 'Auto Loan', 'My truck');

INSERT INTO debts
  (balance, user_id, interest_rate, min_payment, debt_type, account_name)
VALUES
  (5000, 1, 0.13, 200, 'Personal Loan', ' ');

INSERT INTO debts
  (balance, user_id, interest_rate, min_payment, debt_type, account_name)
VALUES
  (1500, 1, 0.20, 50, 'Credit Card', 'Capital One');

INSERT INTO debts
  (balance, user_id, interest_rate, min_payment, debt_type, account_name)
VALUES
  (150000, 1, 0.05, 1000, 'Mortgage', 'Our house');

INSERT INTO debts
  (balance, user_id, interest_rate, min_payment, debt_type, account_name)
VALUES
  (10000, 1, 0.10, 150, 'Medical', 'Sugery');