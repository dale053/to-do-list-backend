import express from 'express';
import { authenticate } from '../middleware/auth';
import { addTodo, deleteTodo, getTodos, toggleTodo, updateTodo } from '../controllers/todo.controller';

const router = express.Router();

router.get('/', authenticate, getTodos);
router.post('/', authenticate, addTodo);
router.put('/:id', authenticate, toggleTodo);
router.delete('/:id', authenticate, deleteTodo);
router.put('/update/:id', authenticate, updateTodo);

export default router;
