
const jwt = require('jsonwebtoken');

module.exports. generateJWT  =  async    (user,res)=>{ 

    try {   
    //   console.log("user : \n  " , {user}  ) 
    const object_user = user.dataValues ; 
    object_user['role'] = (await user.getRole()).dataValues.name;
    // console.log("incoded object_user : \n " , object_user);

                 // user.dataValues['nomemclature'] = {nom : 'ana' , pernom : 'didi'}
                 // console.log("incoded user : \n " , user.dataValues );
                 // const token = jwt.sign( user.dataValues ,  process.env.SECRET_KEY , { expiresIn: process.env.EXPIRES_IN }); 
         const token = jwt.sign( object_user ,  process.env.SECRET_KEY , { expiresIn: process.env.EXPIRES_IN }); 
                    const result =   await user.createJWTtoken({token: token});   
                    // console.log("result generateJWT : \n " , result.dataValues);
 
                 //    const decodedToken =  jwt.verify(token, process.env.SECRET_KEY) 
                 //    console.log("decoded object_user : \n " ,decodedToken );
                 //    console.log("decoded user : \n " ,decodedToken );
 
                 //    const token_fromUser = await user.getJWTtoken();
 
                 //    console.log("token === token_fromUser.dataValues.token : " , token === token_fromUser.dataValues.token);
                 //    console.log("token   : \n " , token);
                 //    console.log("  token_fromUser.dataValues.token : \n " ,   token_fromUser.dataValues.token);
                    
         res.json({ token });
         return 
     }
     catch(err){
         console.log("Error generatting jwt    : " , err)
     }
        
 }