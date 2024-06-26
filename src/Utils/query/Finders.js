module.exports.filters =  (req_query ,Op,db) =>{
    const {page , limit, orderBy , sortBy ,or,fields,include, ...query} = req_query 

    // console.log(" query : " , query);
    // console.log("getAll Occupations  ")

    let Fields = module.exports.Fields(fields)
    // console.log("Fields : " , Fields);


    const pagination = module.exports.Pagination (page ,limit )

    // console.log("pagination : " , pagination);


    let OrderBy = module.exports.OrderBy(orderBy,sortBy)

    // console.log("OrderBy : " , OrderBy);

    const ob = module.exports.Or(or)
    const where = module.exports.where(query,Op)

    if(ob.length != 0 )
    where[Op.or] = ob ;

    const Include =module.exports.Include(include,Op)



        // console.log("where : " , where );

return { where , pagination , OrderBy  , Fields ,Include }
}

module.exports.Fields = (fields)=>{
    if(!fields) return null
      return  fields.split(',') ; 

}

module.exports.Pagination =(page ,limit )=>{
    return { 
        offset : ((page ? page : 1)  - 1 ) * (limit ?  limit : 10 ) ,
        limit :  +(limit ?  limit : 10 ) 
    }
}

module.exports.OrderBy =(orderBy,sortBy)=>{

   let OrderBy =  orderBy ?  orderBy.split(",") : [ 'id' ]; 
  const SortBy =  sortBy ?  sortBy  :  'ASC' ; 

   OrderBy.push(SortBy)

  return [OrderBy]
}

module.exports.Or=(or)=>{
    const ob = []
    if(or)
    JSON.parse(decodeURIComponent(or)).forEach(elmt=>{
 const condition = {};
        condition[elmt[0]] = elmt[1];
        ob.push(condition);
  })
  return ob
}

module.exports.where=(query,Op)=>{
    const where = {};
    Object.keys(query).forEach(key => { 
        // console.log("key  :" , key);
        if (key.endsWith('_like')) {
            where[key.replace('_like', '')] = { [Op.like]: `%${query[key]}%` };
        } else if (key.endsWith('_in')) {
            where[key.replace('_in', '')] = { [Op.in]: query[key].split(',') };
        } else if(key.split('_')[1]){ 
            where[key.split('_')[0]]  = { [Op[key.split('_')[1]]]: query[key] }
        } else {
            where[key] = query[key];
        }
    });
    return where
}

module.exports.Include=(include, Op)=>{
//     [
//         {
//           model: db['Ref_esco_occupation'],
//           as: 'occupations',
//           through: {
//             attributes: ['relation_type']
           
//           }
//           ,
//           attributes: ['conceptUri']
         
//         },
// ];
if(!include) return null
return decodeURIComponent(include)
}