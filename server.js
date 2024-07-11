 
 console.time('start');

   const app = require('./src/app'); 
   const db = require('./src/Models/index');  
   const util = require('util');


   //   db.sequelize.sync( {alter:true})
   // db.sequelize.drop()

//    const stringify =  
//    //  [
//    //    { 
//    //    model: 'Ref_esco_occupation',
//    //    attributes: 'id,preferredLabel',
//    //    through: 'relation_type',
//    //    where:
//        {
//          Op_and: [ [ 'status', 'released' ], { Op_gt: [ 'id', '400' ] } ],
//           Op_lt: [ 'id', 1000 ],
//          Op_between: [ 'id', [ '23', '1440' ] ],
//          // conceptType: 'Occupation',
//          // Op_like:[ 'preferredLabel','%gérant%'], 
//       }
// //     ,  order : 'Ref_esco_occupation??id??DESC,code??ASC'
// //   }
// //   ] 
//    // {
//    //   Op_and : [
//    //    [ 'status', 'released' ],
//    //       { Op_gt : ['id', '400'] }, 
//    //     ], 
//    //     Op_lt : ['id',500],
//    //     Op_between: ['id' , ['23','440']],
//    //   } 
//       // { 
//       //     Op_or: [
//       //         [ 'status', 'released' ],
//       //         [ 'modifiedDate', '2020-06-24 08:06:50' ],
//       //         {Op_gt : ['id', '12'] }  , {Op_lt : ['id', '24'] },
//       //         'modifiedDate' , ['2016-12-20 20:18:44','2024-01-24T15:46:35.000Z']
//       //       ],
//          //  Op_lt : ['id',500],
//          //  Op_between: ['id' , ['23','244']],
//       //     Op_like: ['preferredLabel','%gérant%'],
//       //    Op_in: ['modifiedDate' , ['2024-01-24T15:46:35.000Z','2024-01-24T15:46:35.000Z','2024-01-24T15:46:35.000Z']]
//       //  }

  

// const queryString = encodeURIComponent(JSON.stringify(stringify))
// console.log("test : \n encoded queryString : \n " , queryString );


// const decoded_queryString  =  decodeURIComponent(queryString)
// console.log("decoded_queryString : \n ", decoded_queryString);


// console.log("JSON.parse(decoded_queryString) : \n ",util.inspect(JSON.parse(decoded_queryString), { depth: null })  );
//  op = JSON.parse(decoded_queryString);


// const funOp = (op) =>{
//    // console.log("hello from  funOp : " , op );
//    const where  = {}
//    Object.keys(op).forEach(key => { 
//       // console.log("hello from  funOp  key : " , key );
// for(let i = 0 ; i<op[key].length ; i++)
// {
//    // console.log("i : " , i );
//    // console.log("op[key] : " , op[key]);
//     if(op[key][i] instanceof Array ){
//       // console.log("Array  where[key.replace('Op_', '')]  : " ,  where[key.replace('Op_', '')] );
//       where[key.replace('Op_', '')] ? 
//       where [key.replace('Op_', '')].push(fillOp(op[key][i]))
//     : where [key.replace('Op_', '')]  =  [fillOp(op[key][i])]
//    } 
//    else  if(op[key][i] instanceof Object ){
//       let ob = []
//       //  op[key][i].forEach(elmt =>{ 
//       //  ob.push(funOp(elmt))
//       // }) 

//       ob.push(funOp(op[key][i]))

//       where[key.replace('Op_', '')]  ? 
//       ob.map(elmt =>{
//          // console.log("elmt : " , elmt);
//          where [key.replace('Op_', '')] .push(elmt)
//       })
//      : 
//      where [key.replace('Op_', '')]  =  ob
//    //   where [key.replace('Op_', '')]  =  ob
//    }   
//    else  {
//       // console.log("else : ");
//  if(op[key][i+1]  ){   
//     where[op[key][i]]  ? 
//     where[op[key][i]][key.replace('Op_', '')] =   op[key][i+1] :
//     where[op[key][i]]= {[key.replace('Op_', '')] :  op[key][i+1] } 
//    //  console.log("else : ",where);
//    if(op[key][i+1]  instanceof Array ) i=i+2 ; 
//    }
//    }
//    }
//    })
//    // console.log("where from funcOp  : " , where);
//    return where
// }

// const fillOp =(array)=>{
//  const ob = {}
// for(let i  = 0 ; i< array.length-1 ; i=+2){
//    ob[array[i]] = array[i+1]
//  }
//  return ob 
// }
 

 


// console.log("where of op : \n " , util.inspect(stringify, { depth: null }) );




   app.listen(process.env.SERVER_PORT || 3000 ,()=>{ 
      console.log(`started on port ${process.env.SERVER_PORT || 3000 }`)
   })





























   

//    function tokenizeAndSlice(text) {
//       // Split the text into tokens using () [] and , as delimiters
//       const tokens = text.split(/[()\[\],\s]+/).filter(token => token.length > 0);
  
//       // Display tokens (for example purposes)
//       console.log(tokens);
  
//       // Slice the tokens (for example purposes)
//       const slicedTokens = tokens  // Get the first 10 tokens
//       console.log(slicedTokens);
  
//       // Do something with the sliced tokens
//       // For instance, join them back into a string and print
//       console.log(slicedTokens.join(' '));

//       composition(text , slicedTokens)
//   }

//   const build_ob =(elmt , txt , array_txt )=>{
//    const ob ={}
// ob[elmt] = build_att ( array_txt.indexOf(elmt) , txt , array_txt ) 
//    return ob
//   }

//   const build_att =( index  , txt , array_txt  )=>{
//    const ob ={}
//    if(txt[txt.indexOf(array_txt[index+1])+array_txt[index+1].length] === ','  ){
//       const elmt =   array_txt[index+1] 
//       ob = {
//        elmt : build_value (index+1, txt , array_txt  ),
//       }
//    }
//    return ob
//   }
//   const build_value = (index, txt , array_txt  ) => {
//    if(txt[txt.indexOf(array_txt[index+1])-1] === '['){
//       while(txt[txt.indexOf(array_txt[index+1])+array_txt[index+1].length+1] === ']'){

//       }
//    }
//   }
   
//    const composition = ( txt , array_txt  )=>{

//       const ob = {}

//  for (let index = 0; index < array_txt.length; index++) {

//    const elmt = array_txt[index];


//    if(txt[txt.indexOf(elmt)+elmt.length] === '('){
//       ob = build_ob(elmt , txt , array_txt )
//    }
//    else if(txt[txt.indexOf(elmt)+elmt.length] === ','  ){
//       ob[elmt] = {
//          elmt : null 
//       }
//    }
//    else if(txt[txt.indexOf(elmt)-1] === '['){
//       while(txt[txt.indexOf(elmt)+elmt.length+1] === ']'){

//       }
//    }

//    console.log("elmt : " , elmt);
//    console.log(txt[txt.indexOf(elmt)+elmt.length]);
//    return
   
// }

//    }

//    tokenizeAndSlice('or(key,[value,value])')
 
 




 