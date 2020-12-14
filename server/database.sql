DROP TABLE IF EXISTS account;
CREATE TABLE account
(
  account_id SERIAL PRIMARY KEY,
  account_name VARCHAR(50) NOT NULL CHECK(account_name <> '')
);

DROP TABLE IF EXISTS debt;
CREATE TABLE debt
(
  debt_id SERIAL PRIMARY KEY,
  balance NUMERIC(10, 2) NOT NULL CHECK(balance > 0),
  min_payment NUMERIC (10, 2) CHECK(min_payment > 0),
  interest NUMERIC (5, 2) NOT NULL CHECK(interest >= 0),
  est_payoff_date DATE,
  account_type INT NOT NULL REFERENCES account(account_id)
);

INSERT INTO account
  (account_name)
VALUES
  ('Student Loan');

INSERT INTO account
  (account_name)
VALUES
  ('Auto Loan');

INSERT INTO account
  (account_name)
VALUES
  ('Personal Loan');

INSERT INTO account
  (account_name)
VALUES
  ('Credit Card');

INSERT INTO account
  (account_name)
VALUES
  ('Mortgage');

INSERT INTO account
  (account_name)
VALUES
  ('Other');


INSERT INTO debt
  (balance, min_payment, interest, account_type)
VALUES
  (10000, 300, 5, 1);

INSERT INTO debt
  (balance, min_payment, interest, account_type)
VALUES
  (20000, 400, 8, 2);

INSERT INTO debt
  (balance, min_payment, interest, account_type)
VALUES
  (5000, 300, 10, 3);

INSERT INTO debt
  (balance, min_payment, interest, account_type)
VALUES
  (15000, 150, 20, 4);

INSERT INTO debt
  (balance, min_payment, interest, account_type)
VALUES
  (200000, 1200, 4, 5);

INSERT INTO debt
  (balance, min_payment, interest, account_type)
VALUES
  (8000, 200, 5, 6);