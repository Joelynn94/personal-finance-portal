DROP TABLE IF EXISTS account;
CREATE TABLE account
(
  account_id SERIAL NOT NULL PRIMARY KEY,
  account_name VARCHAR(50) NOT NULL CHECK(account_name <> ''),
  account_type VARCHAR(50) NOT NULL CHECK(account_name <> '')
);

DROP TABLE IF EXISTS debt;
CREATE TABLE debt
(
  debt_id SERIAL NOT NULL PRIMARY KEY,
  balance NUMERIC(10, 2) NOT NULL CHECK(balance > 0),
  interest_rate DECIMAL (5, 2) NOT NULL CHECK(interest_rate >= 0),
  min_payment NUMERIC (10, 2) NOT NULL CHECK(min_payment > 0),
  debt_type VARCHAR(50) NOT NULL CHECK(debt_type <> ''),
  account_name VARCHAR(50) CHECK(account_name <> '')
);


INSERT INTO debt
  (balance, interest_rate, min_payment, debt_type, account_name)
VALUES
  (10000, 0.05, 200, 'Student Loan', 'Loan for Harvard University');

INSERT INTO debt
  (balance, interest_rate, min_payment, debt_type, account_name)
VALUES
  (20000, 0.08, 400, 'Auto Loan', 'Wife car');

INSERT INTO debt
  (balance, interest_rate, min_payment, debt_type, account_name)
VALUES
  (25000, 0.07, 500, 'Auto Loan', 'My truck');

INSERT INTO debt
  (balance, interest_rate, min_payment, debt_type, account_name)
VALUES
  (5000, 0.13, 200, 'Personal Loan', ' ');

INSERT INTO debt
  (balance, interest_rate, min_payment, debt_type, account_name)
VALUES
  (1500, 0.20, 50, 'Credit Card', 'Capital One');

INSERT INTO debt
  (balance, interest_rate, min_payment, debt_type, account_name)
VALUES
  (150000, 0.05, 1000, 'Mortgage', 'Our house');

INSERT INTO debt
  (balance, interest_rate, min_payment, debt_type, account_name)
VALUES
  (10000, 0.10, 150, 'Medical', 'Sugery');