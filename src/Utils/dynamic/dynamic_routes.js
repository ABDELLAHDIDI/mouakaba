
const fs = require('fs');
const path = require('path'); 

  module.exports.set_routes =(dir,router)=>{
    // console.log("router from fn **********************************\n" , router.sequelize);
    fs.readdirSync(dir)
    .filter(file => file !== 'index.js' && file.endsWith('.js'))
    .forEach(file => { 
      const model = require(path.join(dir, file));
      const modelName = file.split('.')[0]; // Remove the file extension to get the model name
      router[modelName] = model;
  
      // console.log("******************  modelName: \n ",   modelName );
      // console.log("******************  router[modelName] : \n ",   router[modelName] );
    });
  }
  
  module.exports.get_directories =(currentDirectory)=>{
  
  const isDirectory = source => fs.lstatSync(source).isDirectory();
  
  // Read all files and directories in the current directory
  const allFilesAndDirs = fs.readdirSync(currentDirectory);
  
  // Filter out directories
  const directories = allFilesAndDirs.filter(name => isDirectory(path.join(currentDirectory, name))); 
//   console.log("directories : " ,directories );
  
  return directories
  }
  
  module.exports.set_dynamic_routes = (dir,router)=>{
    if(! module.exports . get_directories(dir)) return ;
    module.exports .set_routes(dir,router)
    module.exports .get_directories(dir).forEach(elmt=>{
      const sh = dir+"\\"+elmt
      // console.log("path : " ,sh ); 
    module.exports . set_dynamic_routes(sh,router);
      })
  }



 