const db = require('../../Models/index');  
const bcrypt = require('bcrypt');
const JWT = require('../../Utils/jwt/jwt')

module.exports. createUser=  async  (req,res)=>{ 
    try {
        const { user } = req.body; 
        console.log("user :  " , user);

        if (!user.username || !user.email || !user.password ) {
        res.status(400).send('username, email and password  are required');
        return;
        }
    
        const result = await db['User'].create(user);
    
        res.status(201).send(`User created: ${JSON.stringify(result)}`);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports. getUser =  async  (req,res)=>{ 
    try {
        const {id } = req.params
        console.log("getUser : ") 
    const data = await db['User'].findByPk(id)
    if(!!  data )
        {   
        const user =data.dataValues
            console.log("user : " , user )
            res.status(200).send(user);
        return 
        }
        res.status(400).send('No user found!');
                    return;
    
        } catch(err) {
        console.log("Error getting user  : " , err)
        }
}

module.exports. sign_in =  async  (req,res)=>{ 
    try {
        const {username , password } = req.query
        // console.log("sign_in : ") 
    let  data = await db['User'].findOne({where:{username: username  }})
    if(!!  data )
        {   
        const user =data.dataValues
            // console.log("user : " , user ) 
         const result = await    bcrypt.compare(password, user.password ) 
                 if(result )  {  
                    if(!user.JWTtokenId )
                    JWT.generateJWT(data,res)
                else {
                 const resultat = await db['JWTtoken'].destroy({where : {id : user.JWTtokenId }});  
                 JWT.generateJWT(data,res)
                }
                return 
            }
      
        }
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    
        } catch(err) {
            console.log("Error signning in   : " , err)
        }
}