const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

// router.get('/', (req, res)=>{
//     res.send('root controller');
// });

router.get('/users', controllers.getAllUsers);
router.post('/users', controllers.createUser);
router.get('/users/:id', controllers.getUserById);
router.put('/users/:id', controllers.updateUser);
router.delete('/users/:id', controllers.deleteUser);
router.post('/users/:id/projects', controllers.addProject);
router.get('/users/:id/projects', controllers.getUserProjects);


router.get('/projects', controllers.getAllProjects);

// Auth
router.post('/auth/register', controllers.registerUser );
router.post('/auth/login', controllers.userLogin );


// GET /:id/projects
// POST /:id/projects


module.exports = router;