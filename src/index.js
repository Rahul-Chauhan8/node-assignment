import * as auth from './Auth';
import * as users from './Users';


export const routesRegistration = async (router) => {

    await auth.routes(router);
    await users.routes(router);

}
