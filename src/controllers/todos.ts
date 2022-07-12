import { RequestHandler } from "express";
import { Todo } from "../models/todo";

let TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  //res.status(201).json({ message: req.body });
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res.status(201).json({ message: "Created the todo", createTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json({ todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("Could not find the todo.");
  }

  const updatedText = (req.body as { text: string }).text;

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  res.json({ todos: TODOS });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("Could not find the todo.");
  }

  TODOS.splice(todoIndex, 1);

  res.json({ todos: TODOS });
};
