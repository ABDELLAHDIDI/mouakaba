const express = require('express');

const   Ref_esco_skill_Controller   =   require('../../../../Controllers/Ref/Esco/Ref/Ref_esco_skill_Controller');
const Ref_esco_skill_Router = express.Router()


Ref_esco_skill_Router.route('/csv')
                                     .post(Ref_esco_skill_Controller.insert_from_csv)

Ref_esco_skill_Router.route('/')
                                     .get(Ref_esco_skill_Controller.getSkills)
                                     .post(Ref_esco_skill_Controller.createSkill)
                                     .put(Ref_esco_skill_Controller.updateSkill)

Ref_esco_skill_Router.route('/:id')
                                     .get(Ref_esco_skill_Controller.getSkill)
                                     .delete(Ref_esco_skill_Controller.deleteSkill) 


module.exports = Ref_esco_skill_Router