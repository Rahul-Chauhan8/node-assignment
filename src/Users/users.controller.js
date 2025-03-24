import * as services from "./users.services";

/* user Profile */
export const userProfile = async (req, res) => {
  try {
    const { user } = req
    /** check user email */
    const checkEmail = await services.getByEmail(user.email);

    res.render('profile', { user: checkEmail });

  } catch (error) {
    console.log(error)
    res.redirect('/auth/login');
  }
}