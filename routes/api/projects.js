const Joi = require("joi");
const express = require('express');
const router = express.Router();
const projectModel = require('../../app/models/project');
const taskModel = require('../../app/models/task');

// Gets All Projects
router.get('/', (req, res)=> {
    res.json(projectModel.all());
});


// Get Single Project
router.get('/:id', (req,res)=>{

    project = projectModel.findOne(req.params.id);

    if (project) {
        res.json(project);
    } else
        res.status(404).json(
                {msg:`project not found: ${req.params.id}`}
            );
});

// Create a project
router.post('/', (req, res)=>{
    
    const schema = Joi.object({
        name: Joi.string().min(5).max(10).required()
    });
    
    const { name } = req.body;

    const project = {
        name:name,
    };

    validation = schema.validate(project); 

    console.log(validation.error);


    if (validation.error) {
        res.status(400).json(
            {msg:validation.error.details[0].message}
        );
    } else 
        res.status(201).json(projectModel.save(project));            
});

// Delete Project
router.delete('/:id', (req, res)=>{
    try {
        
        projects = projectModel.remove(req.params.id);
        res.status(201).json({msg:`Project deleted: ${req.params.id}`, data:projects});

    } catch (err) {
        res.status(404).json(
            {msg:`Project not found: ${req.params.id}`}
        );
    }
});

// hasMany Relation
// Get project Tasks
router.get('/:id/tasks', (req, res)=>{
    res.json(taskModel.all().filter((task)=>{
        return task.projectId == req.params.id;
    }));    
});

// Add task to Project
router.post('/:id/tasks', (req, res)=>{

    const { name, description } = req.body;

    const task = {
        name:name,
        description:description
    };
    
    const schema = Joi.object({
        name: Joi.string().min(5).max(10).required(),
        description: Joi.string()
    });
    
    validation = schema.validate(task);     

    if (validation.error) {
        res.status(400).json(
            {msg:validation.error.details[0].message}
        );
    } else {

        prj = projectModel.findOne(req.params.id);

        if (prj) {
            task.projectId = prj.id;
            res.status(201).json(taskModel.save(task));
    
        } else {
            res.status(404).json(
                {msg:`Project not found ${req.params.id}`}
            );
        }
    }
});

/*
GET api/projects/1/tasks
POST api/projects/1/tasks 
GET api/tasks/1/project

*/
module.exports = router;

