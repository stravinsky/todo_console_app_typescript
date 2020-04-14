"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_collection_1 = require("./todo-collection");
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const todo_item_1 = require("./todo-item");
class JsonTodoCollection extends todo_collection_1.TodoCollection {
    constructor(name, todos = []) {
        super(name, []);
        this.name = name;
        this.database = lowdb(new FileSync("Todos.json"));
        if (this.database.has("tasks").value()) {
            const dbItems = this.database.get("tasks").value();
            dbItems.forEach(todo => this.todosMap.set(todo.id, new todo_item_1.TodoItem(todo.id, todo.title, todo.done, todo.important)));
        }
        else {
            todos.forEach(todo => this.todosMap.set(todo.id, todo));
            this.database.set("tasks", todos).write();
        }
    }
    addNewTodo(title) {
        const id = super.addNewTodo(title);
        this.storeTasks();
        return id;
    }
    removeDoneTodos() {
        super.removeDoneTodos();
        this.storeTasks();
    }
    markTodoAsDone(id, done) {
        super.markTodoAsDone(id, done);
        this.storeTasks();
    }
    storeTasks() {
        this.database.set("tasks", [...this.todosMap.values()]).write();
    }
}
exports.JsonTodoCollection = JsonTodoCollection;
