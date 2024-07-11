const db = require('../../../../Models/index');
const read_csv = require('../../../../Utils/CSV/Read_csv')
const bulk_Insert_In_Chunks = require('../../../../Utils/CSV/bulk_Insert_In_Chunks')
const finders = require('../../../../Utils/query/Finders')

const util = require('util');

module.exports. insert_from_csv =  async  (req,res)=>{ 
    // console.time('start');
                try {
                    const results = await read_csv('./src/Utils/CSV/db', 'skills_fr.csv');
                    await bulk_Insert_In_Chunks(db['Ref_esco_skill'], results);
                    res.status(201).send(`skill created`);
                } catch (error) {
                    console.error('Error reading CSV file:', error);
                }
                // console.timeEnd('start');
            }

 module.exports. getSkills =  async  (req,res)=>{ 


    console.log("req.query : \n " , req.query);
    try {
        const {Fields , where,pagination,OrderBy,include} = finders.filters(req.query,db)  ;
        console.log("query  from controller : " , util.inspect({ 
            where: where   ,  
            ...pagination , 
            order :   OrderBy,
            attributes :  Fields,
            include
        }, { depth: null }) );
          const   skills = await db['Ref_esco_skill'].findAndCountAll( { 
                where: where   ,  
                ...pagination , 
                order :   OrderBy,
                attributes :  Fields,
                include
            }) ; 
        // const   skills = await db['Ref_esco_skill'].findAndCountAll( { 
        //     where:   {
        //        [ db.Op.and] : [
        //           { 'status': 'released' },
        //         //   { 'modifiedDate': '2024-01-24T15:46:35.000Z' },
        //           { 'id': { [db.Op.gt]: '400' } },
        //         //   { 'id': { [db.Op.lt]: '24' } }
        //         ],
        //         // 'modifiedDate': { [db.Op.or]: [ '2024-01-24T15:46:35.000Z', '2024-01-24T15:46:35.000Z' ] }
        //         id: { [db.Op.lt]: 500, [db.Op.between]: [ '23', '440' ] },
        //       }   ,  
        //     ...pagination , 
        //     order :   OrderBy,
        //     attributes :  Fields, 
        // }) ; 
        const result = { 
            totalPages : Math.ceil(skills?.count / pagination.limit ),
            totalSkills : skills?.count,
            Skill : skills?.rows
        }
            res.status(200).send({result});
        return  
        } 
        catch(err){
        console.log("Error getting all  Skills  : " , err)
        }
            }

module.exports. getSkill =  async  (req,res)=>{ 
                try {
                    const {id} = req.params
                    console.log("getSkill : ") 
                const data = await db['Ref_esco_skill'].findByPk(id)
                if(!!  data )
                    {   
                    const skill =data.dataValues
                        console.log("skill : " , skill )
                        res.status(200).send(skill);
                    return 
                    }
                    res.status(400).send('No skill found!');
                                return;
                
                    } catch(err) {
                    console.log("Error getting skill  : " , err)
                    }
            }

module.exports. createSkill=  async  (req,res)=>{ 
                try {
                    const { Skill } = req.body;
                    const { id, ...skill } = Skill;
                    console.log("skill :  " , skill);
                    if (!skill.conceptType || !skill.conceptUri) {
                    res.status(400).send('conceptType and conceptUri are required');
                    return;
                    }
                
                    const result = await db['Ref_esco_skill'].create(skill);
                
                    res.status(201).send(`Skill created: ${JSON.stringify(result)}`);
                } catch (error) {
                    console.error('Error creating skill:', error);
                    res.status(500).send('Internal Server Error');
                }
            }

module.exports. updateSkill =  async  (req,res)=>{ 
                try {
                    const { Skill } = req.body;
                    if(!Skill.id){
                        res.status(400).send("skill id is required")
                        return
                        }
                    const findSkill = await db['Ref_esco_skill'].findByPk(Skill.id)
                    if(!findSkill){
                        res.status(400).send("skill not found")
                        return
                    }
                
                const result =  await db['Ref_esco_skill'].update(Skill , {where:{id : Skill.id}})
                    console.log("result :",result)
                    res.status(200).send("skill updated successfully !! ")
                    } catch(err){
                    console.error('Error updating skill:', err);
                        res.status(500).send('Internal Server Error');
                    }
            }

module.exports. deleteSkill =  async  (req,res)=>{ 
                try{
                const {id} = req.params
                const findSkill  = await db['Ref_esco_skill'].findByPk(id)
                if(!findSkill  ){
                res.status(400).send("skill not found")
                return
                }
                const result = await db['Ref_esco_skill'].destroy({where: {id : id}})
                console.log("result :",result)
                res.status(200).send("skill deleted successfully !! ")
                }catch (err){
                console.error('Error deleting skill:', err);
                            res.status(500).send('Internal Server Error');
                }
          
            }


                         






  