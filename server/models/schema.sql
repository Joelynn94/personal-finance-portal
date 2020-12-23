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
  account_name VARCHAR(50) CHECK(account_name <> ''),
  est_payoff_date DATE
);
