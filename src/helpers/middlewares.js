import { RESPONSE_CODES } from "../../config/constants";
import { CommonMessages } from "../../config/message/common";

const authMiddleWare = async (req, res, next) => {
  try {
    const ignorePaths = [
      "/",
      "/api-docs",
      "/",
      "/health",
      "/auth/login",
      '/auth/register',
      '/auth/logout',
      '/auth/sign-up'
    ];
    const { method, headers, originalUrl } = req;

    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const logObj = {
      ip,
      headers: req.headers,
      method: req.method,
      url: req.originalUrl,
      timestamp: Date.now(),
    };

    if (
      (method === "POST" && originalUrl === "/user") ||
      (method === "GET" && originalUrl.includes("/api-docs/"))
    ) {
      return next();
    }

    const ignoreIndex = ignorePaths.findIndex((item) => item === originalUrl);
    if (ignoreIndex > -1) {
      return next();
    }

    if (!req.cookies.token) {
      return res.redirect('/');
    }
    return next();
  } catch (error) {
    return res.status(RESPONSE_CODES.UNAUTHORIZED).json({
      status: 0,
      code: RESPONSE_CODES.UNAUTHORIZED,
      message: CommonMessages.UNAUTHORIZED_USER,
      data: null,
    });
  }
};

export default authMiddleWare;
