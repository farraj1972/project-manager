const uuid = require('uuid');
//const projectModel = require('../../app/models/project');

let tasks = [
    {
        id:1,
        name:'Task 1',
        projectId:1,
        description:"Task description"
    }
];

function all() {
    return tasks;
}

function findOne(id) {
    return tasks.find((task)=>task.id == id);
}

function save(task) {

    task.id = uuid.v4();

    tasks.push(task);

    return task;
}

function update(project) {

}

function remove(id) {

    tasks = tasks.filter((task)=> {
        return task.id != id
    });    
    return tasks;
}

// BelongsTo relation side
// function project(id) {
    
//     task = tasks.find((task)=>task.id == id);

//     console.log(task);

//     if (task) {
//         return projectModel.findOne(task.projectId);
//     } else
//         throw new Error("Task not found"); 
// }

module.exports = {
    all,
    findOne,
    save,
    update,
    remove,
//    project
}