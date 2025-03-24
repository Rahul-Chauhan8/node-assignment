require("dotenv").config();
import Services from "./users.services";
import bcrypt from "bcrypt";
import { RESPONSE_CODES, ROLES } from "../../config/constants";
import { CommonMessages } from '../../constants/message/common'
import { AuthMessages } from "../../constants/message/auth";
import { successResponse, errorResponse } from "../../config/responseHelper";
import { refreshToken } from '../helpers/jwt'


export default class Users {
  async init(db) {
    this.services = new Services();
    this.Models = db.models;
    await this.services.init(db);
  }

  /* user Profile */
  async userProfile(req, res) {
    try {
      const { user } = req
      /** check user email */
      const checkEmail = await this.services.getByEmail(user.email);

      res.render('profile', { user: checkEmail });

    } catch (error) {
      console.log(error)
      res.redirect('/auth/login');
    }
  }

}
