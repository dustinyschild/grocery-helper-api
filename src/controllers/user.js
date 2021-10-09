const register = async (req, res) => {
  const { username, email, password } = req.body;

  const password_hash = await AuthService.hashPassword(password);

  const user = await UserService.addUser({
    username,
    email,
    password_hash
  }).catch(err => new Error(err));

  const token = AuthService.sign({ sub: user.username });

  res.status(201).json({ token });
};

module.exports = { register };
