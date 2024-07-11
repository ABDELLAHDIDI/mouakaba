const express = require('express');
const cors = require('cors');
const app = express()

app.use(express.json())
app.use(cors());

const Routes = require('./Routes/index')
const auth = require('./AuthMiddleware/index')


app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
  })


app.use( '/api/v1/Ref_esco_occupation' , auth.authenticateJWT,auth.decodeUrl , auth.authorizeRoles(['admin','occupation']) ,Routes.Ref_esco_occupation_Route )  
app.use( '/api/v1/Ref_esco_skill' ,auth.authenticateJWT, auth.decodeUrl, auth.authorizeRoles(['admin','skill']) , Routes.Ref_esco_skill_Route )  
app.use( '/api/v1/Esco_occupations_skills_relations' , auth.authenticateJWT ,auth.authorizeRoles(['admin']) ,  Routes.Esco_occupations_skills_relations_Route )  
app.use( '/api/v1/User' ,  Routes.User_Route )  
app.use( '/api/v1/Role' , auth.authenticateJWT , auth.authorizeRoles(['admin'])  ,  Routes.Role_Route )  

 

 
 

module.exports = app 