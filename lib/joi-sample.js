// debug print setting
const path = require('path');
const MODULE_NAME = path.basename(__filename,'.js');
const debug = require('debug')(MODULE_NAME);

// joi schema definition
const Joi = require('joi');
const checkdef = {
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  access_token: [Joi.string(), Joi.number()],
  birthyear: Joi.number().integer().min(1900).max(2017),
  email: Joi.string().email()
  }
const schema = Joi.object().keys(checkdef).with('username','birthyear').without('password','access_token');

// entry point --------------------
const main = (obj_,schema_) =>{
  debug('>>Start main()');
  Joi.validate(obj_,schema_,(err,value) => {
    if(err){
      //debug(err);
      debug(err.name);

    }
    debug(value)
  });
  debug('<<End   main()');
}

module.exports = main;

// debug -------------------------
// -------------------------------
if(require.main === module){
  // debug execution
  const obj = {
    username : 'abc',
    birthyear : '1999-2'
  };
  main(obj,schema);
}
