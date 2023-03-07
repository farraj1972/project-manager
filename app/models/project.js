const uuid = require('uuid');

let projects = [
    {
        name:'Carlos',
        id:1
    },
    {
        name:'Manuel',
        id:2
    },
    {
        name:'Manuel',
        id:3
    }
];

function all() {
    return projects;
}

function findOne(id) {
    return projects.find((prj)=>prj.id == id);
}

function save(project) {

    project.id = uuid.v4();

    projects.push(project);
    return project;
}

function update(project) {

}

function remove(id) {
    projects = projects.filter((project)=> {
        return project.id != id
    });

    return projects;
}

module.exports = {
    all,
    findOne,
    save,
    update,
    remove,
}