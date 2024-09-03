const { sign, verify } = require("jsonwebtoken");

module.exports = {
  signToken: (payload) => sign(payload, process.env.secret_key),
  verifyToken: (token) => verify(token, process.env.secret_key),
};
