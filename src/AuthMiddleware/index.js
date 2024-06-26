const jwt = require('jsonwebtoken');

const db = require('../Models/index')


module.exports. authenticateJWT =  async (req, res, next) => {
    try{
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Access token is missing or invalid' });
        }
    const decodedToken =  jwt.verify(token, process.env.SECRET_KEY) 
    const user = decodedToken.user;
    console.log("user :  \n  " , user );
    const token_fromUser = await (await db['User'].findByPk(user.id)).getJWTtoken();
                // console.log("token === token_fromUser.dataValues.token : " , token === token_fromUser.dataValues.token);
                // console.log("token   : \n " , token);
                // console.log("  token_fromUser.dataValues.token : \n " ,   token_fromUser.dataValues.token);
    if(token === token_fromUser.dataValues.token ) 
       {
        user['role'] =(await  ( await db['User'].findByPk(user.id)).getRole()) .dataValues;
        req.user = user;
       }
    else 
     {
        return res.status(403).json({ message: '  token  expired' });
    }
       next();
    }
    catch(err){
        console.log("err authenticatting : " , err);
        return res.status(403).json({ message: 'Invalid token' });
    }
   
};
 

module.exports. generateJWT  =  async    (user,res)=>{ 

   try {    console.log("user : \n  " , {user}  ) 
//    const object_user = user.dataValues ; 
//    object_user['role'] = (await user.getRole()).dataValues;
//    console.log("object_user : \n " , object_user);
console.log("user : \n " , user);
        const token = jwt.sign( {user} ,  process.env.SECRET_KEY , { expiresIn: '1h' }); 
                   const result =   await user.createJWTtoken({token: token});   
                   console.log("result generateJWT : \n " , result);
        res.json({ token });
        return 
    }
    catch(err){
        console.log("Error generatting jwt    : " , err)
    }
       
}


module.exports.authorizeRoles = (roles) => {
    return (req, res, next) => {
  if(req.user.role){    if (!roles.includes(req.user.role.name)) {
        return res.status(403).json({ message: 'Access forbidden: Insufficient rights' });
      }
    } else  return res.status(403).json({ message: 'Access forbidden: Insufficient rights' });
      next();
    };
  };
