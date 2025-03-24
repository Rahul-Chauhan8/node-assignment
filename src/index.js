import Auth from './Auth';
import Users from './Users';


export default class Routes {
    constructor(router, db) {
        this.router = router;
        this.DatabaseConnect = db;
    }

    async routesRegistration() {
        this.db = await this.DatabaseConnect.getDB();

        this.auth = new Auth(this.router, this.db);
        await this.auth.routes();

        this.users = new Users(this.router, this.db);
        await this.users.routes();
        
    }
}