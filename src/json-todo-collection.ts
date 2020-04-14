import { TodoCollection } from "./todo-collection";
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import { TodoItem } from "./todo-item";

type SchemaType = {
  tasks: { id: number, title: string, done: boolean, important: boolean}[]
}

export class JsonTodoCollection extends TodoCollection {
  private database: lowdb.LowdbSync<SchemaType>;
 
  constructor(public name: string, todos: TodoItem[] = []) {
    super(name, []);
    this.database = lowdb(new FileSync("Todos.json"));
    if (this.database.has("tasks").value()) {
    const dbItems = this.database.get("tasks").value();
    dbItems.forEach(todo => this.todosMap.set(todo.id, new TodoItem(todo.id, todo.title, todo.done, todo.important)))
    } else {
      todos.forEach(todo => this.todosMap.set(todo.id, todo));
      this.database.set("tasks", todos).write();
    }
  }

  addNewTodo(title: string): number {
    const id = super.addNewTodo(title);
    this.storeTasks();
    return id;
  }

  removeDoneTodos(): void {
    super.removeDoneTodos();
    this.storeTasks();
  }

  markTodoAsDone(id: number, done: boolean) {
    super.markTodoAsDone(id, done);
    this.storeTasks();
  }





  private storeTasks(): void {
    this.database.set("tasks", [...this.todosMap.values()]).write();
  }
}