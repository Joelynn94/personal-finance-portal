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
  ('Medical Bill');

INSERT INTO account
  (account_name)
VALUES
  ('Mortgage');

INSERT INTO account
  (account_name)
VALUES
  ('Other');


INSERT INTO debt
  (balance, interest_rate, min_payment, debt_type, account_name, est_payoff_date)
VALUES
  (10000, .05, 200, 'Student Loan', 'Loan for Harvard University', null);

INSERT INTO debt
  (balance, interest_rate, min_payment, debt_type, account_name, est_payoff_date)
VALUES
  (20000, .08, 400, 'Auto Loan', 'GMC Terrain', null);

INSERT INTO debt
  (balance, interest_rate, min_payment, debt_type, account_name, est_payoff_date)
VALUES
  (25000, .07, 500, 'Auto Loan', 'My truck', null);

INSERT INTO debt
  (balance, interest_rate, min_payment, debt_type, account_name, est_payoff_date)
VALUES
  (5000, .13, 200, 'Personal Loan', ' ', null);

INSERT INTO debt
  (balance, interest_rate, min_payment, debt_type, account_name, est_payoff_date)
VALUES
  (1500, .20, 50, 'Credit Card', 'Capital One', null);

INSERT INTO debt
  (balance, interest_rate, min_payment, debt_type, account_name, est_payoff_date)
VALUES
  (150000, .05, 1000, 'Mortgage', 'Our house', null);

INSERT INTO debt
  (balance, interest_rate, min_payment, debt_type, account_name, est_payoff_date)
VALUES
  (10000, .10, 150, 'Medical', 'Sugery', null);