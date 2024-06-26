const express = require('express');

const app = express()

app.use(express.json())

const Routes = require('./Routes/index')
const auth = require('./AuthMiddleware/index')


app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
  })


app.use( '/api/v1/Ref_esco_occupation' , auth.authenticateJWT, auth.authorizeRoles(['admin','occupation']) ,Routes.Ref_esco_occupation_Route )  
app.use( '/api/v1/Ref_esco_skill' ,auth.authenticateJWT, auth.authorizeRoles(['admin','skill']) , Routes.Ref_esco_skill_Route )  
app.use( '/api/v1/Esco_occupations_skills_relations' , auth.authenticateJWT ,auth.authorizeRoles(['admin']) ,  Routes.Esco_occupations_skills_relations_Route )  
app.use( '/api/v1/User' ,  Routes.User_Route )  
app.use( '/api/v1/Role' , auth.authenticateJWT , auth.authorizeRoles(['admin'])  ,  Routes.Role_Route )  




module.exports = app 