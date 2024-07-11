const jwt = require('jsonwebtoken');

const db = require('../Models/index')
// const bcrypt = require('bcrypt');
const crypto = require('crypto-js');

module.exports. authenticateJWT =  async (req, res, next) => {
  console.log("authenticateJWT");
    try{
      console.log("req.header('Authorization') : \n" , req.header('Authorization'));
        const token = req.header('Authorization')?.split(' ')[1];
        console.log("token : \n" , token);
        if (!token) {
            return res.status(401).json({ message: 'Access token is missing or invalid' });
        }

        //id 

    const decodedToken =  jwt.verify(token, process.env.SECRET_KEY) 
    const user = decodedToken;
    console.log("user :  \n  " , user );
    const token_fromUser = await (await db['User'].findByPk(user.id)).getJWTtoken();
                // console.log("token === token_fromUser.dataValues.token : " , token === token_fromUser.dataValues.token);
                // console.log("token   : \n " , token);
                // console.log("  token_fromUser.dataValues.token : \n " ,   token_fromUser.dataValues.token);
    if(token === token_fromUser.dataValues.token ) 
       {
        req.user = user;
       }
    else 
     {
        return res.status(403).json({ message: '  token  expired' });
    }
    console.log("next");
       next();
    }
    catch(err){
        console.log("err authenticatting : " , err);
        return res.status(403).json({ message: 'Invalid token' });
    }
   
};
 

module.exports.authorizeRoles = (roles) => {
    return (req, res, next) => {
  if(req.user.role){  
    console.log("req.user.role : \n" ,req.user.role);
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access forbidden: Insufficient rights' });
      }
    } else  return res.status(403).json({ message: 'Access forbidden: no rights' });
      next();
    };
  };

  module.exports. decodeUrl =  async (req, res, next) => {
    console.log("req.query from midlleware  :  \n " , req.query  );
    
        const {signature,...query } = req.query 
        // const hashedValue  =    bcrypt.hashSync(req.query .toString(), parseInt(process.env.SALT_ROUNDS) ); 
        // console.log("hashedValue : \n " , hashedValue);
        const sortedParams = {};
        Object.keys(query).sort().forEach(key => {
          console.log("params[key] : " , query[key]);
          console.log(" typeof   params[key] inst : " ,  typeof   query[key]  );
          sortedParams[key] = query[key];
        });
      
console.log("JSON.stringify(sortedParams)  from midlleware : \n " , JSON.stringify(sortedParams) );

 const hashedValue = crypto.SHA256(JSON.stringify(sortedParams)).toString(crypto.enc.Hex);
console.log("hashedValue  : " , hashedValue);

        // const isMatch = bcrypt.compareSync(JSON.stringify(query) , signature);
        const isMatch = (hashedValue === signature);


        console.log("isMatch : " , isMatch);
        if(isMatch){
         req.query = query
      console.log("next");
         next(); 
        }
         else {
          return res.status(403).json({ message: 'url been altered' });
         }
   
  };