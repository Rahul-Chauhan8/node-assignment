import {RESPONSE_CODES} from '../../config/constants';

function schemaValidator(schema) {
    return [
      async (req, res, next) => {
        try{
        const { body } = req;
        /** Validate Joi schema */
       const result = await schema.validateAsync(body,{abortEarly:true})
       req.body = result
       next()

        }catch(error){
          if(error.isJoi === true){
            return res.status(RESPONSE_CODES.BAD_REQUEST).json({
                  status: 0,
                message:error.details[0].message,
                code: RESPONSE_CODES.POST,
                });
          }
        }
      },
    ];
  }
    
  module.exports = schemaValidator;

