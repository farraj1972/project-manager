const { User, Project } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const getCredentials = async(req)=>{

    let result = null;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer') &&
        req.headers.authorization.split(' ')[1]
    ) {
        const token = req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, 'personal-secret');

        const user = await User.findOne({where:{id:decoded.id}});

        if (user) {
            result = {
                id:user.id
            }
        }
    }
    return result;
} 


const getAllUsers =  async (req, res)=> {

    try {
        
        const credentials = await getCredentials(req);
        
        console.log(credentials);

        if (credentials) {
            const users = await User.findAll();
            return res.status(200).json({users});
        }

        return res.status(401).json('Please provide a valid token');

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const createUser =  async (req, res)=> {

    try {

        const user = await User.create(req.body);
        return res.status(201).json({user});

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getUserById =  async (req, res)=> {

    try {
        // select * from users where id = :id
        const { id } = req.params;

        const user = await User.findOne({where:{id:id}});

        if (user)
            return res.status(200).json({user});

        return res.status(404).send('User not found');

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const updateUser =  async (req, res)=> {

    try {
        
        const { id } = req.params;

        const [updated] = await User.update(req.body, {where:{id:id}});
        
//        console.log(updated);

        if (updated) {
            const updatedUser = await User.findOne({where:{id:id}});
            return res.status(200).json({updatedUser});
        }   

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteUser =  async (req, res)=> {

    try {
        // select * from users where id = :id
        const { id } = req.params;

        const deleted = await User.destroy({where:{id:id}});
        
        console.log(deleted);

        if (deleted)
            return res.status(200).send('User deleted');

        return res.status(404).send('User not found');

    } catch (error) {
        return res.status(500).send(error.message);
    }
    
}

const addProject = async (req,res) => {

    try {
        // select * from users where id = :id
        const { id } = req.params;

        const user = await User.findOne({where:{id:id}});

        if (user) {

            const project = await user.createProject(req.body);

            if (project) {
                return res.status(201).json({project});
            }
            throw new Error('Something went wrong')
        }
//            return res.status(200).json({user});

        return res.status(404).send('User not found');

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getUserProjects = async (req, res)=>{

    try {
        // select * from users where id = :id
        const { id } = req.params;

        const user = await User.findOne({where:{id:id}});

        if (user) {
            const projects = await user.getProjects();
            return res.status(200).json({projects});
        }
        return res.status(404).send('User not found');

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getAllProjects = async (req, res)=>{

    try {

        const projects = await Project.findAll();

        return res.status(200).json({projects});

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

// Authorization Methods
const registerUser =  async (req, res)=>{

    try {    
        const user = await User.findOne({where:{email:req.body.email}}); 

        if (user) {
            return res.status(409).send('Email already in use!');
        }

        const hash = bcrypt.hashSync(req.body.password, 10);

        if (hash) {
            const newUser = await User.create({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                password:hash
            });
            return res.status(201).json({newUser});
        }

        throw new Error('Server error');

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const userLogin = async (req, res)=>{

    try {

        const user = await User.findOne({where:{email:req.body.email}}); 

        if (user) {

            if (bcrypt.compareSync(req.body.password, user.password)) {

                const token = jwt.sign({
                    id:user.id
                    }, 'personal-secret',
                    {expiresIn:'1h'} 
                );
                return res.status(200).json({
                    userid:user.id,
                    token:token
                });

            } 
            // else {
            //     return res.status(401).send('Unknown email or invalid password');
            // }
        }
        return res.status(401).send('Unknown email or invalid password');
    
    } catch (error) {
        return res.status(500).send(`msg: ${error.message}`);
    }
}

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    addProject,
    getUserProjects,
    getAllProjects,
    registerUser,
    userLogin
}