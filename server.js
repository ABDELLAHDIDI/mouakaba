 
 console.time('start');

   const app = require('./src/app'); 
   const db = require('./src/Models/index');  



   //   db.sequelize.sync( {alter:true})
   // db.sequelize.drop()
   
   
  



   app.listen(process.env.SERVER_PORT || 3000 ,()=>{ 
      console.log(`started on port ${process.env.SERVER_PORT || 3000 }`)
   })
 
 




 