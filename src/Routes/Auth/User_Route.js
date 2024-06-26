const express = require('express');

const   User_Controller   =   require('../../Controllers/Auth/User_Controller'); 
const User_Router = express.Router()

 

User_Router.route('/sign_in')
                                     .get(User_Controller.sign_in)
User_Router.route('/sign_up')
                                     .post(User_Controller.createUser)

                                     


module.exports = User_Router