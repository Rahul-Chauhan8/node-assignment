import authController from "./auth.controller"
import schemaValidator from "../helpers/schemaValidator"
import Authorization from "../helpers/authorization";
import { loginValidator, registerValidator } from './auth.validator'

export default class auth {
    constructor(router, db) {
        this.authorization = new Authorization();
        this.router = router;
        this.db = db;
        this.authInstance = new authController();
    }
    async routes() {
        await this.authInstance.init(this.db);
        await this.authorization.init(this.db);
        /** user register */
        this.router.post('/auth/register', schemaValidator(registerValidator), (req, res) => {
            this.authInstance.userRegister(req, res)
        })

        /** user login */
        this.router.post('/auth/login', schemaValidator(loginValidator), (req, res) => {
            this.authInstance.userLogin(req, res)
        })

        // Logout Route
        this.router.get('/auth/logout', (req, res) => {
            res.clearCookie('token');
            res.redirect('/');
        });

        // Logout Route
        this.router.get('/auth/sign-up', (req, res) => {
            return res.render('register', { error: '' });
        });

    }
}

