/**
 * A class that wraps the name of the table for the tasks and the list of tasks
 */
class ListOfRows {
  /**
   *
   * @param {Array[Task]} tasks
   * @param {String} tableName
   */
  constructor(tasks, tableName) {
    this.tasks = tasks;
    this.tableName = tableName;
  }
}
/**
 * An objetc that contains id, description and status of each task
 */
class Task {
  /**
   *
   * @param {number} id
   * @param {String} description
   * @param {String} status
   */
  constructor(id, description, status) {
    this.id = id;
    this.description = description;
    this.status = status;
  }
}

// A few dummy tasks to start the table

const task1 = new Task(1, "Comprar pão", "Por fazer");
const task2 = new Task(2, "Limpar casa", "Em processo");
const task3 = new Task(3, "Dormir", "Feito");
const tableName = "to-do-list";

// A dummy list of tasks
const listOfTasks = new ListOfRows([], tableName);
// const mockListOfTasks = new ListOfRows([task1, task2, task3], tableName);
