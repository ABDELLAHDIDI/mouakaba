const {Role}  = require('../../Models/index')
const finders = require('../../Utils/query/Finders')
const db = require('../../Models/index')


module.exports. getRoles =  async  (req,res)=>{ 
    try {
        const {Fields , where,pagination,OrderBy,Include} = finders.filters(req.query,db.Op,db)  ;
        // console.log("where from controller : " , where);
          const   occupations = await Role.findAndCountAll( { 
                where: where   ,  
                ...pagination , 
                order : OrderBy ,
                attributes :  Fields,
                Include
            }) ; 
        const result = { 
            totalPages : Math.ceil(occupations?.count / pagination.limit ),
            totalRoles : occupations?.count,
            Roles : occupations?.rows
        }
            res.status(200).send({result});
        return  
        } 
        catch(err){
        console.log("Error getting all  Skills  : " , err)
        }
            }

module.exports. getRole =  async  (req,res)=>{ 
                try {
                    const {name} = req.params
                    console.log("getRole : ") 
                const data = await Role.findOne({where : {name : name }})
                if(!!  data )
                    {   
                    const role =data.dataValues
                        console.log("role : " , role )
                        res.status(200).send(role);
                    return 
                    }
                    res.status(400).send('No role found!');
                                return;
                
                    } catch(err) {
                    console.log("Error getting role  : " , err)
                    }
            }

module.exports. createRole =  async  (req,res)=>{ 
                try {
                    const { name } = req.body; 
                    console.log("name :  " , name);
                    if (!name ) {
                    res.status(400).send('name is  required');
                    return;
                    }
                
                    const result = await Role.create({name : name});
                
                    res.status(201).send(`Role created: ${JSON.stringify(result)}`);
                } catch (error) {
                    console.error('Error creating role:', error);
                    res.status(500).send('Internal Server Error');
                }
            }

module.exports. updateRole =  async  (req,res)=>{ 
                try {
                    const { name } = req.params;
                    const { updated_name } = req.body;
                    if(!name){
                        res.status(400).send("role name  is required")
                        return
                        }
                    const findRole = await Role.findOne({wehere : {name : name }})
                    if(!findRole){
                        res.status(400).send("role not found")
                        return
                    }
                
                const result =  await findRole.update({name: updated_name }  )
                    console.log("result :",result)
                    res.status(200).send("role updated successfully !! ")
                    } catch(err){
                    console.error('Error updating role:', err);
                        res.status(500).send('Internal Server Error');
                    }
            }

module.exports. deleteRole =  async  (req,res)=>{ 
                try{
                const {name} = req.params
                const findRole  = await Role.findOne({where : { name:name}})
                if(!findRole  ){
                res.status(400).send("role  not found")
                return
                }
                const result = await Role.destroy({where: {name : name }})
                console.log("result :",result)
                res.status(200).send("role  deleted successfully !! ")
                }catch (err){
                console.error('Error deleting role:', err);
                            res.status(500).send('Internal Server Error');
                }
          
            }