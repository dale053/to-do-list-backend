import { Request, Response } from 'express';
import Todo from '../models/todo.model';

// GET all todos for current user
export const getTodos = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    const todos = await Todo.find({ userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos' });
  }
};

// ADD new todo for current user
export const addTodo = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { title, desc, state = false, deadline } = req.body;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    if (!title || !desc) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    const existing = await Todo.findOne({ title, userId });
    if (existing) {
      return res.status(400).json({ message: 'Todo with this title already exists' });
    }
    const todo = new Todo({ title, desc, state, deadline, userId });
    const saved = await todo.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Error adding todo' });
  }
};

// TOGGLE todo state for current user
export const toggleTodo = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const todo = await Todo.findOne({ _id: req.params.id, userId });
    if (!userId || !todo) {
      return res.status(404).json({ message: 'Todo not found or unauthorized' });
    }
    todo.state = !todo.state;
    const updated = await todo.save();
    res.json(updated);
  } catch {
    res.status(500).json({ message: 'Error updating todo' });
  }
};

// DELETE todo for current user
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const deleted = await Todo.findOneAndDelete({ _id: req.params.id, userId });
    if (!userId || !deleted) {
      return res.status(404).json({ message: 'Todo not found or unauthorized' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch {
    res.status(500).json({ message: 'Error deleting todo' });
  }
};
