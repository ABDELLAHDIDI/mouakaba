
const fs = require('fs');
const path = require('path'); 

  module.exports.set_models =(dir,db)=>{
    // console.log("db from fn **********************************\n" , db.sequelize);
    fs.readdirSync(dir)
    .filter(file => file !== 'index.js' && file.endsWith('.js'))
    .forEach(file => { 
      const model = require(path.join(dir, file))(db.sequelize);
      const modelName = file.split('.')[0]; // Remove the file extension to get the model name
      db[modelName] = model;
  
    //   console.log("******************  db[modelName] : \n ",   db[modelName] );
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
  
  module.exports.set_dynamic_models = (dir,db)=>{
    if(! module.exports . get_directories(dir)) return ;
    module.exports .set_models(dir,db)
    module.exports .get_directories(dir).forEach(elmt=>{
      const sh = dir+"\\"+elmt
    //   console.log("path : " ,sh ); 
    module.exports . set_dynamic_models(sh,db);
      })
  }



 