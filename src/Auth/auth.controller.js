require("dotenv").config();
import Services from "./auth.services";
import bcrypt from "bcrypt";
import { RESPONSE_CODES, ROLES } from "../../config/constants";
import { CommonMessages } from '../../constants/message/common'
import { AuthMessages } from "../../constants/message/auth";
import { successResponse, errorResponse } from "../../config/responseHelper";
import { refreshToken } from '../helpers/jwt'
const axios = require('axios');


export default class Auth {
  async init(db) {
    this.services = new Services();
    this.Models = db.models;
    await this.services.init(db);
  }

  /* user Register */
  async userRegister(req, res) {
    try {
      const { email, username } = req.body;
      /** check user email */
      const checkEmail = await this.services.getByEmail(email);
      if (checkEmail) {
        return res.render('register', { error: AuthMessages.EMAIL_EXIST });
      }
      /** check username */
      const checkUsername = await this.services.getByUsername(username);
      if (checkUsername) {
        return res.render('register', { error: AuthMessages.USERNAME_EXIST });
      }

      await this.services.createUser(req.body)

      return res.render('login', { error: '',success:'Registration successful. Please log in' });

    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .send(errorResponse(CommonMessages.ERROR, null, RESPONSE_CODES.POST));
    }
  }

  /* login */
  async userLogin(req, res) {
    try {
      const { email, password, recaptcha } = req.body;

      console.log(req.body['g-recaptcha-response'])

      const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${req.body['g-recaptcha-response']}`
      );

      if (!response.data.success) {
        return res.render('login', { error: 'Invalid reCAPTCHA. Please try again.',success:'' });
      }

      /** check user email */
      const checkEmail = await this.services.getByEmail(email);
      if (!checkEmail) {
        return res.render('login', { error: 'Email is not registerd.',success:'' });
      }
      /** check password */
      const passwordMatch = await bcrypt.compare(password, checkEmail.password);
      if (!passwordMatch) {
        return res.render('login', { error: AuthMessages.INVALID_PASSWORD,success:'' });
      }
      delete checkEmail.password
      const token = refreshToken(checkEmail);


      res.cookie('token', token, { httpOnly: true });

      return res.redirect('/users/profile');

    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .send(errorResponse(CommonMessages.ERROR, null, RESPONSE_CODES.POST));
    }
  }

}
