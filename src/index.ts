import { TodoCollection } from "./todo-collection";
import { TodoItem } from "./todo-item";
import * as inquirer from "inquirer";
import { JsonTodoCollection } from "./json-todo-collection";
let showComplete: boolean = true;

enum Commands {
  Add = "Add a new task",
  Toggle = "Show/Hide the completed tasks",
  Mark = "Mark the task as done",
  Purge = "Delete all completed tasks",
  Quit  = "Quit"
}

const todos: TodoItem[] = [
  new TodoItem(5, "yo-yo-yo", false, false),
  new TodoItem(2, "cool cool cool", false, false),
  new TodoItem(10, "privet privet", true, false),
  new TodoItem(4, "ooo ooo ooo", false, false),
];

const collection: TodoCollection = new JsonTodoCollection("Marina", todos);

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
    switch(answers.command) {
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
  })
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
  })
}

function promptMark() {
  console.clear();
  inquirer.prompt({
    type: "checkbox",
    name: "completed",
    message: "choise option",
    choices: collection.getTodos(showComplete).map(({id, title, done }) => ({name: title, value: id, checked: done}))
  }).then(answers => {
    const completedTodos = answers.completed as number[];
    collection.getTodos(true).forEach(todo => collection.markTodoAsDone(todo.id, completedTodos.find(id => id === todo.id) !== undefined));
    promptUser();
  })
}

function promptPurge() {
  collection.removeDoneTodos();
  promptUser();
}

function displayCollection(): void {
  console.log(`${collection.name}'s Todo List\n ${collection.getTodosCount().incomplete} to do`);
  collection.getTodos(showComplete).forEach(todo => todo.printDetails());
}