export class TodoItem {

  public constructor(public id: number, 
              public title: string, 
              public done: boolean = false,
              public important: boolean = false)
  {

  }

  public printDetails(): void {
    console.log(`${this.id}\t ${this.title}\t ${this.done ? "(done)" : ""}\t ${this.important ? "(important)" : ""}`)
  }
}