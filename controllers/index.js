const { User } = require('../models');


const getAllUsers =  async (req, res)=> {

    try {

        const users = await User.findAll();

        return res.status(200).json({users});

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

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser  
}