require("dotenv").config();
import * as services from "./auth.services";
import bcrypt from "bcrypt";
import { RESPONSE_CODES, ROLES } from "../../config/constants";
import { CommonMessages } from '../../config/message/common'
import { AuthMessages } from "../../config/message/auth";
import { successResponse, errorResponse } from "../../config/responseHelper";
import { refreshToken } from '../helpers/jwt'
const axios = require('axios');
import { saltRounds } from "../../config/constants";


/* user Register */
export const userRegister = async (req, res) => {
  try {
    const { email, username,password } = req.body;
    /** check user email */
    const checkEmail = await services.getByEmail(email);
    if (checkEmail) {
      return res.render('register', { error: AuthMessages.EMAIL_EXIST });
    }
    /** check username */
    const checkUsername = await services.getByUsername(username);
    if (checkUsername) {
      return res.render('register', { error: AuthMessages.USERNAME_EXIST });
    }

    req.body.password = await bcrypt.hash(password, saltRounds);

    await services.createUser(req.body)

    return res.render('login', { error: '', success: 'Registration successful. Please log in' });

  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .send(errorResponse(CommonMessages.ERROR, null, RESPONSE_CODES.POST));
  }
}

/* login */
export const userLogin = async (req, res) => {
  try {
    const { email, password, recaptcha } = req.body;

    console.log(req.body['g-recaptcha-response'])

    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${req.body['g-recaptcha-response']}`
    );

    if (!response.data.success) {
      return res.render('login', { error: 'Invalid reCAPTCHA. Please try again.', success: '' });
    }

    /** check user email */
    const checkEmail = await services.getByEmail(email);

    if (!checkEmail) {
      return res.render('login', { error: 'Email is not registerd.', success: '' });
    }
    /** check password */
    const passwordMatch = await bcrypt.compare(password, checkEmail.password);
    if (!passwordMatch) {
      return res.render('login', { error: AuthMessages.INVALID_PASSWORD, success: '' });
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


