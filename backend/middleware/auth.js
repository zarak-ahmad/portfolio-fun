const auth = (req, res, next) => {
  const secret = process.env.ADMIN_SECRET || 'adminsecret';

  if (req.headers.authorization === secret) {
    return next();
  }

  return res.status(401).json({ message: 'Unauthorized: invalid admin secret' });
};

module.exports = auth;
