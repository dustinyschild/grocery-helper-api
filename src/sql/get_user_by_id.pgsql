SELECT
  user_id,
  username,
  email,
  email_confirmed,
  password_hash,
  last_login_date,
  created_date
FROM
  users
WHERE
  user_id = $1