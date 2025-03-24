import * as  userController from "./users.controller"
import { authorize } from "../helpers/authorization";


export const routes = async (router)=> {
    /** user Profile */
    router.get('/users/profile', await authorize(), (req, res) => {
        userController.userProfile(req, res)
    })
}
