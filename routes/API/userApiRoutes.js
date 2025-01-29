import express from 'express';
import user from '../../App/controllers/userController.js';

const router = express.Router();

router.post('/users', user.createUser);
router.get('/users', user.getAllUsers);
router.get('/users/role/:role', user.getRolesUser);
router.get('/users/:id', user.getUser);
router.put('/users/:id', user.updateUser);
router.delete('/users/:id', user.deleteUser);

export default router;