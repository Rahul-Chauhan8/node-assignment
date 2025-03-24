import { RESPONSE_CODES, ROLES } from "../../config/constants";
import { CommonMessages } from "../../config/message/common.js";
import { verifyToken } from "./jwt";
import { db } from '../helpers/db'

export const authorize = async () => {

  return [
    async (req, res, next) => {
      const token = req.cookies.token;
      if (!token) {
        return res.redirect('/');
      }
      /** Decode JWT Token */
      const decoded = verifyToken(token);
      
      req.decoded = decoded;
      if (decoded === "jwt expired") {
        return res.render('login', { error: 'Your session expired, Please login again', success: '' })
      }
      /** Check user authorization */
      if (decoded == "invalid jwt") {
        return res.render('login', { error: 'Your session expired, Please login again', success: '' })
      }
      if (decoded != "invalid signature") {
        //   /** check user exist or not */

        const user = await db.models.Users.findOne({ where: { email: decoded.email }, raw: true });
        if (!user) {
          return es.render('login', { error: '', success: '' })
        }
        req.user = user;
        /** return user */
        return next();
      }
    },
  ];
}

