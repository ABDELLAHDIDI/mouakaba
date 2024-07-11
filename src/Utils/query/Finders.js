 
const { or } = require('sequelize');
const util = require('util');

module.exports.filters =  (req_query ,db) =>{
    // let {page , limit, orderBy ,or,attributes,include, ...query} = req_query 

    let {page , limit, orderBy ,attributes,include,op, ...query} = req_query 

    console.log(" query : " , query);
    // console.log("getAll Occupations  ")

    let Fields = module.exports.Fields(attributes)
    // console.log("Fields : " , Fields);


    const pagination = module.exports.Pagination (page ,limit )

    // console.log("pagination : " , pagination);


    let OrderBy = module.exports.Order(orderBy)

    // console.log("OrderBy : " , OrderBy);

    // const ob = module.exports.Or(or)
    const Op =  module.exports.op(op,db.Op)

    const where = module.exports.where(query,db.Op)

    Object.assign(where, Op);

    // if(ob.length != 0 )
    // where[db.Op.or] = ob ;
    console.log("op from filter +++++++++++++++++++++++++++++++++++++++++++++++++++++++  : " ,op);
    console.log("include from filter +++++++++++++++++++++++++++++++++++++++++++++++++++++++  : " ,include);
    // decodeURIComponent(op)
    // decodeURIComponent(include)
if(include)
      include  =module.exports.Include(include,db)

console.log("include from filters : \n " , include);

        console.log("where  from filters : \n " , where );

return { where , pagination , OrderBy  , Fields ,include }
}

module.exports.Fields = (fields)=>{
    if(!fields) return null
    //   return  fields.split(',') ; 

    return fields.split(',').map(field => {
        const [original, alias] = field.split('_as_');
        return alias ? [original, alias] : original;
    });

}

module.exports.Pagination =(page ,limit )=>{
    return { 
        offset : ((page ? page : 1)  - 1 ) * (limit ?  limit : 10 ) ,
        limit :  +(limit ?  limit : 10 ) 
    }
}

module.exports.OrderBy =(orderBy,sortBy)=>{

   let OrderBy  =  module.exports.Order(orderBy)
    // orderBy ?  orderBy.split(",") : [ 'id' ]; 
//    const SortBy =  sortBy ?  sortBy  :  'ASC' ; 

//    OrderBy[0].push(SortBy)

   return OrderBy
}

module.exports.Or=(or)=>{
    const ob = []

    if(or)
        try {
  
            JSON.parse(decodeURIComponent(or)).forEach(elmt=>{
                const condition = {};
                       condition[elmt[0]] = elmt[1];
                       ob.push(condition);
                 })
                 console.log("or_1");
        } catch (error) {
          
             const elmt = decodeURIComponent(or).toString().split(',')
            for(i = 0  ; i<elmt.length-1 ;i = i+2  ) {
                const condition = {};
                       condition[elmt[i]] = elmt[i+1];
                       ob.push(condition); 
                 }
                 console.log("or_2");
            // console.log("  decodeURIComponent(or).toString().split(',') : \n " ,   decodeURIComponent(or).toString().split(','));
        }
// console.log("ob_or : \n" , ob);
  return ob
}

module.exports.And=(and)=>{
    const ob = []
    if(and) 
            try {
                JSON.parse(decodeURIComponent(and)).forEach(elmt=>{
                    const condition = {};
                           condition[elmt[0]] = elmt[1];
                           ob.push(condition);
                     })
            } catch (error) {
                 const elmt = decodeURIComponent(and).toString().split(',')
                for(i = 0  ; i<elmt.length-1 ;i = i+2  ) {
                    const condition = {};
                           condition[elmt[i]] = elmt[i+1];
                           ob.push(condition); 
                     }
                // console.log("  decodeURIComponent(and).toString().split(',') : \n " ,   decodeURIComponent(and).toString().split(','));
            }
    // console.log("ob_and : \n" , ob);
  return ob
}


module.exports.where=(query,Op)=>{
    console.log(" query from where : " , query);
    const where = {};
    Object.keys(query).forEach(key => { 
         console.log("key  :" , key);
        console.log("key.startsWith('Op_') : " ,key.startsWith('Op_'));
        if (key.startsWith('Op_')) {
            const ob ={}
            ob[key] = query[key]
            console.log("ob : " , ob );
            Object.assign(where, module.exports.funOp(ob,Op)); 
        }  else {
            where[key] = query[key];
        }
    });
    // console.log("query from where : \n " , query);
    console.log("where from where : \n " , where);
    return where
}

module.exports.op=(op,Op)=>{
    
    if(!op) return undefined 
    // console.log("op before decodage : \n " , op   );
    const decoded_op  =  decodeURIComponent(op) 
    // console.log("decoded_op : \n ", decoded_op);

    // console.log("JSON.parse(decoded_op) : \n ",util.inspect(JSON.parse(decoded_op), { depth: null })  );
 const op_obj = JSON.parse(decoded_op);

 const result = module.exports.funOp(op_obj,Op)
// console.log("  module.exports.funOp(op_obj) : \n  " , util.inspect(result, { depth: null }) ); 
return result
}


module.exports.funOp = (op,Op) =>{ 
    console.log("{key : query[key] } : " , op );
    const where  = {}
    Object.keys(op).forEach(key => { 
    //    console.log("hello from  funOp  key : " , key );
 for(let i = 0 ; i<op[key].length ; i++)
 {
    // console.log("i : " , i );
    // console.log("op[key] : " , op[key]);
     if(op[key][i] instanceof Array ){
       // console.log("Array  where[key.replace('Op_', '')]  : " ,  where[key.replace('Op_', '')] );
       where[Op[key.replace('Op_', '')]] ? 
       where [Op[key.replace('Op_', '')]].push( module.exports.fillOp(op[key][i],Op))
     : where [Op[key.replace('Op_', '')]]  =  [ module.exports.fillOp(op[key][i],Op)]
    } 
    else  if(op[key][i] instanceof Object ){
       let ob = []
       //  op[key][i].forEach(elmt =>{ 
       //  ob.push(funOp(elmt))
       // }) 
    //    console.log("op[key][i] instanceof Object : " , op[key][i]);
 
    //    console.log("ob.push( module.exports.fillOp(op[key][i],db)) : \n " , 
    //     ob.push( module.exports.funOp(op[key][i],db)));
 
    ob.push( module.exports.funOp(op[key][i],Op))

       where[Op[key.replace('Op_', '')]]  ? 
       ob.map(elmt =>{
        //    console.log("elmt : " , elmt);
          where [Op[key.replace('Op_', '')]] .push(elmt)
       })
      : 
      where [Op[key.replace('Op_', '')]]  =  ob
    //   where [key.replace('Op_', '')]  =  ob
    }   
    else  {
       // console.log("else : ");
  if(op[key][i+1]  ){   
     where[op[key][i]]  ? 
     where[op[key][i]][Op[key.replace('Op_', '')]] =   op[key][i+1] :
     where[op[key][i]]= {[Op[key.replace('Op_', '')]] :  op[key][i+1] } 
    //  console.log("else : ",where);
    if(op[key][i+1]  instanceof Array ) i=i+2 ; 
    }
    }
    }
    })
    // console.log("where from funcOp  : " , where);
    return where
 }
 
 module.exports.fillOp =(array)=>{
  const ob = {}
 for(let i  = 0 ; i< array.length-1 ; i=+2){
    ob[array[i]] = array[i+1]
  }
  return ob 
 }

module.exports.Order=(order)=>{
    const ob = []
    if(order)
           {
            console.log("order in Order catch: " , order);
            const elmt = decodeURIComponent(order).toString().split(',')
            for(let i =0;i<elmt.length ; i++)
          {  console.log("elmt : " , elmt );
                 const res = elmt[i].split('??');
            if(res.length > 1 )
                {
                     let ob_order = []
               res.forEach( key => { 
                 ob_order.push(key)
                })
                ob.push(ob_order)
            }
                else ob.push([elmt[i]])
                }}
                //  console.log(" decodeURIComponent(order).toString().split(',') : \n " , decodeURIComponent(order).toString().split(','));
           

console.log("ob_order : \n" , ob);
  return ob
}

module.exports.Include=(include, db)=>{
// const include =     [
//         {
         
//           attributes: ['conceptUri'],   
//           through: {
//             attributes: ['relation_type']
//             },
//             model: db['Ref_esco_occupation'], 
            
//         },
// ];
console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq : \n " , include);
// const stringify = JSON.stringify(include) ; 

// const stringify =  [
//     { 
//     model: 'Ref_esco_occupation',
//     attributes: 'id,preferredLabel,status,modifiedDate',
//     through: 'relation_type',
//     where: {
//         or: [
//             [ 'status', 'released' ],
//             [ 'modifiedDate', '2024-01-24T15:46:35.000Z' ]
//           ],
//       conceptType: 'Occupation',
//       preferredLabel_like: 'gérant',
//       id_lt: '500'
//     },
//     order : [  ['Ref_esco_occupation','id', 'DESC'] ]
// }
// ] 

//  console.log("include_1 : \n" , include_1);

// console.log("stringify : \n ",JSON.stringify(stringify));
 
// const queryString = encodeURIComponent(JSON.stringify(include));

// const queryString = encodeURIComponent(JSON.stringify(stringify))
// console.log("test : encoded queryString : \n " , queryString );

// const decoded_queryString  =  decodeURIComponent(include)

// const decoded_queryString  =  decodeURIComponent(queryString) 
// console.log("decoded_queryString : \n ", decoded_queryString);
const decoded_include =   decodeURIComponent(include); //include

// console.log("decoded_include : \n ",  decodeURIComponent(include));
// console.log("!decoded_include  : " ,! decoded_include );

if(!!decoded_include){
    console.log("JSON.parse(decoded_include) : \n ",util.inspect(JSON.parse(decoded_include), { depth: null })  );
// console.log("JSON.parse(decoded_queryString) : \n ",JSON.parse(decoded_queryString) );


//  const includes = module.exports. extract_includes(JSON.parse(decoded_queryString),db);
const includes = module.exports. extract_includes(JSON.parse(decoded_include),db);
console.log("includes from Include  : \n" , includes);

return includes

}


// if(!include) return null
// return decodeURIComponent(include)

// return null
}


module.exports. extract_includes=(include_array,db)=>{
    const includes = [];
include_array.forEach(include_elmt => {
    const { include , model,order,attributes ,through,...query } = include_elmt;
  
// console.log("where_query : \n " , where_query);
let nested_includes = []
 
    nested_includes = include ? module.exports. extract_includes(include,db) : []
 
 
 console.log("order : " ,order);

    const   ob_order = order ?   module.exports.Order(order) : undefined
 
   const Fields = attributes ? module.exports.Fields(attributes) : undefined
   console.log("Fields from include : " , Fields);
   const include_through  = through ?{attributes:  module.exports.Fields(through) }: undefined

//    const {or,and, ...where_query } = query ;
//    const ob_or = or ?  module.exports.Or(or) : undefined
//    const ob_and = and ? module.exports.And(and) : undefined

const { ...where_query } = query ;

console.log("where_query : " , where_query);


const where =where_query ?  module.exports.where(where_query.where,db.Op) : undefined
console.log("pppppppppppwhere from Include : " ,where)
// if(where && ob_or)
//     where[db.Op.or] = (ob_or.length != 0) ? ob_or : undefined ;
// if(where && ob_and)
//     where[db.Op.and] =(ob_and.length != 0 ) ?  ob_and : undefined ; 

 
// console.log("pppppppppppwhere from Include : " ,where)

    const includeObj = {
      model: db[model],
      attributes: Fields ? Fields : undefined,
      through: include_through, 
      where : where,
      include : nested_includes ,
      order : ob_order
    };

    includes.push(includeObj);
  });

// console.log("includes from rec func  : \n" , includes);
return includes
}