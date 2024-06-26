// const jwt = require('jsonwebtoken');
// const db = require('../Models/index')


// module.exports. sign_in =  async  (req,res)=>{ 
//     try {
//         const {username , password } = req.query
//         console.log("getUser : ") 
//     const data = await db['User'].findOne({where:{username: username , password : password}})
//     if(!!  data )
//         {   
//         const user =data.dataValues
//             console.log("user : " , user )
//             // res.status(200).send(user);
//         // return 

//         const token = jwt.sign(user,  process.env.SECRET_KEY , { expiresIn: '1h' });

//         res.json({ token });
//         return
//         }
//         res.status(401).json({ message: 'Invalid credentials' });
//                     return;
    
//         } catch(err) {
//         console.log("Error signning in   : " , err)
//         }
// }