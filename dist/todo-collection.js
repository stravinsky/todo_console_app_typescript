"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_item_1 = require("./todo-item");
class TodoCollection {
    constructor(name, todos = []) {
        this.name = name;
        this.nextId = 1;
        this.todosMap = new Map();
        todos.forEach(todo => this.todosMap.set(todo.id, todo));
    }
    addNewTodo(title) {
        while (this.getTodoById(this.nextId)) {
            this.nextId++;
        }
        this.todosMap.set(this.nextId, new todo_item_1.TodoItem(this.nextId, title));
        return this.nextId;
    }
    getTodos(includeDone) {
        return [...this.todosMap.values()].filter(todo => includeDone || !todo.done);
    }
    getTodoById(id) {
        return this.todosMap.get(id);
    }
    removeDoneTodos() {
        this.todosMap.forEach(({ id, done }) => {
            if (done) {
                this.todosMap.delete(id);
            }
        });
    }
    markTodoAsDone(id, done) {
        const todo = this.getTodoById(id);
        if (todo) {
            todo.done = done;
        }
    }
    getTodosCount() {
        return {
            total: this.todosMap.size,
            incomplete: this.getTodos(false).length
        };
    }
}
exports.TodoCollection = TodoCollection;
