import * as authController from "./auth.controller"
import schemaValidator from "../helpers/schemaValidator"
import { loginValidator, registerValidator } from './auth.validator'
import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    message: "Too many attempts. Please try again later.",
})

export const authRoutes = async (router) => {


    /** user register */
    router.post('/auth/register', schemaValidator(registerValidator), (req, res) => {
        authController.userRegister(req, res)
    })

    /** user login */
    router.post('/auth/login',limiter, schemaValidator(loginValidator), (req, res) => {
        authController.userLogin(req, res)
    })

    // Logout Route
    router.get('/auth/logout', (req, res) => {
        res.clearCookie('token');
        res.redirect('/');
    });

    // Logout Route
    router.get('/auth/sign-up', (req, res) => {
        return res.render('register', { error: '' });
    });

}
// }

