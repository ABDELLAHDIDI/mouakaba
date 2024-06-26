  
  
  
  module.exports =   
  
  async function bulk_Insert_In_Chunks(model,data, chunkSize = 1000) {
    let i = 0
  for (; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    try {
      await model.bulkCreate(chunk);
      console.log(`Inserted chunk ${i / chunkSize + 1} successfully.`);
    } catch (err) {
      console.error(`Error inserting chunk ${i / chunkSize + 1}:`, err);
    }
  }

  return `  ${i / chunkSize + 1} chunks Inserted successfully.`
}
