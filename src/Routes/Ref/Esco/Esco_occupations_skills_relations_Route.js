const express = require('express');

const   Esco_occupations_skills_relations_Controller   =   require('../../../Controllers/Ref/Esco/Esco_occupations_skills_relations_Controller');
const Esco_occupations_skills_relations_Router = express.Router()


Esco_occupations_skills_relations_Router.route('/csv')
                                     .post(Esco_occupations_skills_relations_Controller.insert_from_csv)

Esco_occupations_skills_relations_Router.route('/')
                                     .get(Esco_occupations_skills_relations_Controller.getOccupations_Skills_relations)
//                                      .post(Esco_occupations_skills_relations_Controller.createSkill)
//                                      .put(Esco_occupations_skills_relations_Controller.updateSkill)

// Esco_occupations_skills_relations_Router.route('/:id')
//                                      .get(Esco_occupations_skills_relations_Controller.getSkill)
//                                      .delete(Esco_occupations_skills_relations_Controller.deleteSkill) 


module.exports = Esco_occupations_skills_relations_Router