"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todo_item_1 = require("./todo-item");
const inquirer = require("inquirer");
const json_todo_collection_1 = require("./json-todo-collection");
let showComplete = true;
var Commands;
(function (Commands) {
    Commands["Add"] = "Add a new task";
    Commands["Toggle"] = "Show/Hide the completed tasks";
    Commands["Mark"] = "Mark the task as done";
    Commands["Purge"] = "Delete all completed tasks";
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
const todos = [
    new todo_item_1.TodoItem(5, "yo-yo-yo", false, false),
    new todo_item_1.TodoItem(2, "cool cool cool", false, false),
    new todo_item_1.TodoItem(10, "privet privet", true, false),
    new todo_item_1.TodoItem(4, "ooo ooo ooo", false, false),
];
const collection = new json_todo_collection_1.JsonTodoCollection("Marina", todos);
promptUser();
function promptUser() {
    console.clear();
    displayCollection();
    inquirer.prompt({
        type: "list",
        name: "command",
        message: "choise option",
        choices: Object.values(Commands)
    }).then(answers => {
        switch (answers.command) {
            case Commands.Add:
                promptAdd();
                break;
            case Commands.Mark:
                promptMark();
                break;
            case Commands.Toggle:
                showComplete = !showComplete;
                promptUser();
                break;
            case Commands.Purge:
                promptPurge();
                break;
            case Commands.Quit:
                break;
            default:
                break;
        }
    });
}
function promptAdd() {
    console.clear();
    inquirer.prompt({
        type: "input",
        name: "task",
        message: "add a new task",
    }).then(answers => {
        collection.addNewTodo(answers.task);
        promptUser();
    });
}
function promptMark() {
    console.clear();
    inquirer.prompt({
        type: "checkbox",
        name: "completed",
        message: "choise option",
        choices: collection.getTodos(showComplete).map(({ id, title, done }) => ({ name: title, value: id, checked: done }))
    }).then(answers => {
        const completedTodos = answers.completed;
        collection.getTodos(true).forEach(todo => collection.markTodoAsDone(todo.id, completedTodos.find(id => id === todo.id) !== undefined));
        promptUser();
    });
}
function promptPurge() {
    collection.removeDoneTodos();
    promptUser();
}
function displayCollection() {
    console.log(`${collection.name}'s Todo List\n ${collection.getTodosCount().incomplete} to do`);
    collection.getTodos(showComplete).forEach(todo => todo.printDetails());
}
