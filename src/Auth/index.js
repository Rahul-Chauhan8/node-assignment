import * as authController from "./auth.controller"
import schemaValidator from "../helpers/schemaValidator"
import { loginValidator, registerValidator } from './auth.validator'


export const routes = async (router) => {
  
    /** user register */
    router.post('/auth/register', schemaValidator(registerValidator), (req, res) => {
        authController.userRegister(req, res)
    })

    /** user login */
    router.post('/auth/login', schemaValidator(loginValidator), (req, res) => {
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

