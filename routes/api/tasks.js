const Joi = require("joi");
const express = require('express');
const router = express.Router();
const taskModel = require('../../app/models/task');
const projectModel = require('../../app/models/project');
// Gets All Tasks
router.get('/', (req, res)=> {
    res.json(taskModel.all());
});


// Get Single Task
router.get('/:id', (req,res)=>{

    task = taskModel.findOne(req.params.id);

    if (task) {
        res.json(task);
    } else
        res.status(404).json(
                {msg:`task not found: ${req.params.id}`}
            );
});

// Create a task
router.post('/', (req, res)=>{
    
    const schema = Joi.object({
        name: Joi.string().min(5).max(10).required()
    });

//    console.log(req.body);

    const { name } = req.body;

    const task = {
        name:name,
    };

    validation = schema.validate(project); 
    
//    console.log(validation.error);

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

// BelongsTo relation side
router.get('/:id/project', (req, res)=>{

    task = taskModel.findOne(req.params.id);
//    task = tasks.find((task)=>task.id == req.params.id);

    if (task) {
        res.json(projectModel.findOne(task.projectId));
    } else {
        res.status(404).json(
            {msg:`Task not found ${req.params.id}`}
        );
    }
});

module.exports = router;

