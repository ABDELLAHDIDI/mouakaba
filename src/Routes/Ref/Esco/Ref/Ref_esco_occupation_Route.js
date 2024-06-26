const express = require('express');

const   Ref_esco_occupation_Controller   =   require('../../../../Controllers/Ref/Esco/Ref/Ref_esco_occupation_Controller');
const Ref_esco_occupation_Router = express.Router()


Ref_esco_occupation_Router.route('/csv')
                                     .post(Ref_esco_occupation_Controller.insert_from_csv)

Ref_esco_occupation_Router.route('/')
                                     .get(Ref_esco_occupation_Controller.getOccupations)
                                     .post(Ref_esco_occupation_Controller.createOccupation)
                                     .put(Ref_esco_occupation_Controller.updateOccupation)

Ref_esco_occupation_Router.route('/:id')
                                     .get(Ref_esco_occupation_Controller.getOccupation)
                                     .delete(Ref_esco_occupation_Controller.deleteOccupation) 


module.exports = Ref_esco_occupation_Router