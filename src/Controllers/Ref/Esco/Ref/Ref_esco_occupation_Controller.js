const db = require('../../../../Models/index');
const read_csv = require('../../../../Utils/CSV/Read_csv')
const bulk_Insert_In_Chunks = require('../../../../Utils/CSV/bulk_Insert_In_Chunks')

const filters = require('../../../../Utils/query/Finders')


module.exports. insert_from_csv =  async  (req,res)=>{ 
    // console.time('start');
                try {
                    const results = await read_csv('./src/Utils/CSV/db', 'occupations_fr.csv');
                    await bulk_Insert_In_Chunks(db['Ref_esco_occupation'], results);
                    res.status(201).send(`occupations created`);
                } catch (error) {
                    console.error('Error reading CSV file:', error);
                }
                // console.timeEnd('start');
            }

module.exports. getOccupations =  async  (req,res)=>{ 
                try {
                    const {Fields , where,pagination,OrderBy,Include} = filters(req.query,db.Op,db)  ;
                      const   occupations = await db['Ref_esco_occupation'].findAndCountAll( { 
                            where: where   ,  
                            ...pagination , 
                            order : OrderBy ,
                            attributes :  Fields,
                            Include
                        }) ; 
                    const result = { 
                        totalPages : Math.ceil(occupations?.count / pagination.limit ),
                        totalOccupations : occupations?.count,
                        Occupations : occupations?.rows
                    }
                        res.status(200).send({result});
                    return  
                    } 
                    catch(err){
                    console.log("Error getting all  Occupations  : " , err)
                    }
            }

module.exports. getOccupation =  async  (req,res)=>{ 
                try {
                    const {id} = req.params
                    console.log("getOccupation : ") 
                const data = await db['Ref_esco_occupation'].findByPk(id)
                if(!!  data )
                    {   
                    const occupation =data.dataValues
                        console.log("occupation : " , occupation )
                        res.status(200).send(occupation);
                    return 
                    }
                    res.status(400).send('No occupation found!');
                                return;
                
                    } catch(err) {
                    console.log("Error getting occupation  : " , err)
                    }
            }

module.exports. createOccupation =  async  (req,res)=>{ 
                try {
                    const { Occupation } = req.body;
                    const { id, ...occupation } = Occupation;
                    console.log("occupation :  " , occupation);
                    if (!occupation.code || !occupation.preferredLabel) {
                    res.status(400).send('Code and preferredLabel are required');
                    return;
                    }
                
                    const result = await db['Ref_esco_occupation'].create(occupation);
                
                    res.status(201).send(`Occupation created: ${JSON.stringify(result)}`);
                } catch (error) {
                    console.error('Error creating occupation:', error);
                    res.status(500).send('Internal Server Error');
                }
            }

module.exports. updateOccupation =  async  (req,res)=>{ 
                try {
                    const { Occupation } = req.body;
                    if(!Occupation.id){
                        res.status(400).send("occupation id is required")
                        return
                        }
                    const findOccupation = await db['Ref_esco_occupation'].findByPk(Occupation.id)
                    if(!findOccupation){
                        res.status(400).send("occupation not found")
                        return
                    }
                
                const result =  await db['Ref_esco_occupation'].update(Occupation , {where:{id : Occupation.id}})
                    console.log("result :",result)
                    res.status(200).send("occupation updated successfully !! ")
                    } catch(err){
                    console.error('Error updating occupation:', err);
                        res.status(500).send('Internal Server Error');
                    }
            }

module.exports. deleteOccupation =  async  (req,res)=>{ 
                const {id} = req.params
                
                try{
                const findOccupation  = await db['Ref_esco_occupation'].findByPk(id)
                if(!findOccupation  ){
                res.status(400).send("occupation not found")
                return
                }
                const result = await db['Ref_esco_occupation'].destroy({where: {id : id}})
                console.log("result :",result)
                res.status(200).send("occupation deleted successfully !! ")
                }catch (err){
                console.error('Error deleting occupation:', err);
                            res.status(500).send('Internal Server Error');
                }
          
            }


                         






  