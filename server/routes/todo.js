import express from 'express'
import { createTodo, deleteTodo, TodoGet, updateTodo } from '../controllers/todo.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';


const Todo = express.Router();

Todo.route("/createTodo").post(isAuthenticated,createTodo)
Todo.route("/getTodo").get(TodoGet);
Todo.route("/:TodoId").put(isAuthenticated,updateTodo).delete(isAuthenticated,deleteTodo)

export default Todo;

