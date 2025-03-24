import Joi from 'joi';

module.exports = {
    registerValidator: Joi.object().keys({
        email: Joi.string().trim().max(50).email().message("Please enter a valid email").required().messages({
            "any.required": "Email is required.",
            "string.empty": "Email can not be an empty field."
        }),
        username: Joi.string().required()
            .messages({
                "any.required": "Username is required.",
                "string.empty": "Username can not be an empty field."
            }),
        password: Joi.string().min(8).required().messages({
            "string.min": "Password must be at least 8 characters long.",
            "any.required": "Password is required.",
            "string.empty": "Password can not be an empty field.",
        }),
    }),
    loginValidator: Joi.object().keys({
        email: Joi.string().trim().max(50).email().message("Please enter a valid email").required().messages({
            "any.required": "Email is required.",
            "string.empty": "Email can not be an empty field."
        }),
        password: Joi.string().required().messages({
            "any.required": "Password is required.",
            "string.empty": "Password can not be an empty field.",
        }),
        "g-recaptcha-response":Joi.string().optional().allow("",null)
    }),
};
