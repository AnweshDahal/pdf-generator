const jose = require('jose');

const JWKS = jose.createRemoteJWKSet(new URL(process.env.JWK_URL || ''));

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer '))
      return res
        .status(401)
        .json({ message: 'User not logged in', data: null });

    const token = authHeader.substring(7);

    // ? Verify the request using JWK
    const { payload } = jose.jwtVerify(token, JWKS, {
      issuer: process.env.BASE_APP_API_URL,
      audience: process.env.BASE_APP_URL,
    });

    next();
  } catch (error) {
    console.error('[PDF GENERATOR]: JWT verification failed');
    res.status(401).json({
      message: 'Authentication failed',
      data: null,
    });
  }
};
