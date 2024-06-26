const db = require('../../../Models/index');
const read_csv = require('../../../Utils/CSV/Read_csv')
const bulk_Insert_In_Chunks = require('../../../Utils/CSV/bulk_Insert_In_Chunks')

const filters = require('../../../Utils/query/Finders')


module.exports. insert_from_csv =  async  (req,res)=>{ 

                try {
                           const {Ref_esco_skill,Ref_esco_occupation,Esco_occupations_skills_relations} = db 
                    const results = await read_csv('./src/Utils/CSV/db', 'occupationSkillRelations_fr.csv',['relationType','occupationUri','skillUri']);
                    const resultsFormated =  results.map(item => {
                        return {
                          relation_type: item.relationType,
                          skillUri: item.skillUri , 
                          occupationUri: item.occupationUri
                        }
                    })
  //                   console.log("bulk_object  : \n " , resultsFormated[0] , "\n" , resultsFormated[1]
  //                     , resultsFormated[10] , "\n" , resultsFormated[11] 
  //                     , resultsFormated[20] , "\n" , resultsFormated[21] 
  //                    );
  // return
                    const skill = await Ref_esco_skill.findAll( );
                  
                    const occupation = await Ref_esco_occupation.findAll();

 
                    // console.log("occupation : " , occupation instanceof Array );

                    // return

                     let i  =0 
                    console.time('start');
                    for (const item of resultsFormated) {
                      // Find or create the associated skill and occupation
                   
                      const occupation_id = occupation.find(occupation => occupation.conceptUri ===  item.occupationUri ); 

                      item['refEscoOccupationId']=occupation_id.id

                      const skill_id = skill.find(skill => skill.conceptUri ===  item.skillUri ); 
                      item['refEscoSkillId'] = skill_id.id
                  
                      console.log("i = ",i++);
                    } ;
 
                    const bulk_object =  resultsFormated.map(item => {
                      // console.log("item  resultsFormated : " , item  )
                      return {
                        relation_type: item.relation_type,
                        refEscoOccupationId: item.refEscoOccupationId,
                        refEscoSkillId: item.refEscoSkillId
                      }
                  })

                  console.log("bulk_object  : \n " , bulk_object[0] , "\n" , bulk_object[1]
                    , bulk_object[10] , "\n" , bulk_object[11] 
                    , bulk_object[20] , "\n" , bulk_object[21] 
                   );

                  console.timeEnd('start'); 

                     await bulk_Insert_In_Chunks(Esco_occupations_skills_relations, bulk_object);
                    res.status(201).send(`occupations_skills_relations  created`);
                } catch (error) {
                    console.error('Error reading CSV file:', error);
                }
              
            }



module.exports. getOccupations_Skills_relations =  async  (req,res)=>{ 
              try {
                  const {Fields , where,pagination,OrderBy,include} = filters(req.query,db.Op,db)  ;
                    const   occupations = await db['Esco_occupations_skills_relations'].findAndCountAll( { 
                          where: where   ,  
                          ...pagination , 
                          order : OrderBy ,
                          attributes :  Fields,
                          include
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

                         






  