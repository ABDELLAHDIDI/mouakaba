const express = require('express');

const   Role_Controller   =   require('../../Controllers/Auth/Role_Controller'); 
const Role_Route = express.Router()

 

Role_Route.route('/')
                                     .get(Role_Controller.getRoles)
                                     .post(Role_Controller.createRole)
Role_Route.route('/:name')
                                     .put(Role_Controller.updateRole)
                                     .get(Role_Controller.getRole)
                                     .delete(Role_Controller.deleteRole)

                                     


module.exports = Role_Route