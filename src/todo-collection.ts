import { TodoItem } from "./todo-item";

//shape type
type TodosCount = {
  total: number,
  incomplete: number
}

export class TodoCollection {
  private nextId: number = 1;
  protected todosMap = new Map<number, TodoItem>();

  public constructor(public name: string, todos: TodoItem[] = []) {
    todos.forEach(todo => this.todosMap.set(todo.id, todo));
  }

  addNewTodo(title: string): number {
    while(this.getTodoById(this.nextId)) {
      this.nextId++;
    }
    this.todosMap.set(this.nextId, new TodoItem(this.nextId, title));
    return this.nextId;
  }

  getTodos(includeDone: boolean): TodoItem[] {
    return [...this.todosMap.values()].filter(todo => includeDone || !todo.done);
  }

  getTodoById(id: number): TodoItem {
    return this.todosMap.get(id);
  }

  removeDoneTodos(): void {
    this.todosMap.forEach(({id, done}) => {
      if (done) {
        this.todosMap.delete(id);
      }
    })
  }

  markTodoAsDone(id: number, done: boolean): void {
    const todo = this.getTodoById(id);
    if (todo) {
      todo.done = done;
    }
  }

  getTodosCount(): TodosCount {
    return {
      total: this.todosMap.size,
      incomplete: this.getTodos(false).length
    }
  }
}