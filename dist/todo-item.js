"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TodoItem {
    constructor(id, title, done = false, important = false) {
        this.id = id;
        this.title = title;
        this.done = done;
        this.important = important;
    }
    printDetails() {
        console.log(`${this.id}\t ${this.title}\t ${this.done ? "(done)" : ""}\t ${this.important ? "(important)" : ""}`);
    }
}
exports.TodoItem = TodoItem;
