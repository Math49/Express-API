import express from 'express';
import user from '../../App/controllers/userController.js';
import {requireAuth} from '../../server/authServ.js';

const router = express.Router();

router.post('/users',requireAuth, user.createUser);
router.get('/users',requireAuth, user.getAllUsers);
router.get('/users/role/:role',requireAuth, user.getRolesUser);
router.get('/users/:id',requireAuth, user.getUser);
router.put('/users/:id',requireAuth, user.updateUser);
router.delete('/users/:id',requireAuth, user.deleteUser);

export default router;