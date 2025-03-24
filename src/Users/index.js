import userController from "./users.controller"
import Authorization from "../helpers/authorization";

export default class Users {
    constructor(router, db) {
        this.authorization = new Authorization();
        this.router = router;
        this.db = db;
        this.userInstance = new userController();
    }
    async routes() {
        await this.userInstance.init(this.db);
        await this.authorization.init(this.db);
        /** user Profile */
        this.router.get('/users/profile', await this.authorization.authorize(), (req, res) => {
            this.userInstance.userProfile(req, res)
        })
    }
}

