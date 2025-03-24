import jwt from "jsonwebtoken";

const extractToken = (authToken) => {
  if (authToken) {
    const split = authToken.split(" ");
    if (split.length > 1) {
      return split[1];
    }
    return authToken;
  }
  return authToken;
};

export const verifyToken = (authorization) => {
  try {
    const token = extractToken(authorization);
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded;
  } catch (error) {
    return "invalid jwt"
  }
};

// export const refreshToken = (payload) => jwt.sign(payload, jwtToken, { expiresIn: "24hr" });
export const refreshToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });

