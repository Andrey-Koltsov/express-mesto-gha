function auth(req, res, next) {
  const { jwt } = req.cookies;
  console.log(jwt);
  next();
}

module.exports = auth;
