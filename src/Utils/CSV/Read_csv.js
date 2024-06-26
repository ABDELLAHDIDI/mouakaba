const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');



module.exports =  (dir,file,col=[])=>{ 
                        const filePath = path.join(dir,file);
                        const results = [];  
                        return new Promise((resolve, reject) => { 
                        fs.createReadStream(filePath)
                            .pipe(csv())
                            .on('data', (data) => results.push(data))
                            .on('end', () => {
                                // console.log("result from readCSV  : \n  " , results);
                                const res = []
                                if (col.length > 0 ) {
                                    results.forEach((elmt) => {
                                        const restrictedElmt = {};
                                        col.forEach((field) => {
                                            if (elmt.hasOwnProperty(field)) {
                                                restrictedElmt[field] = elmt[field];
                                            }
                                        });
                                        res.push(restrictedElmt);
                                    });
                                    // console.log("res from readCSV  : \n  " , res);
                               
                                    resolve(res);
                                    return
                                }
                            resolve(results);
                            })
                            .on('error', (error) => {
                            reject(error);
                            });
                        });
                    }