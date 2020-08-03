let toDoList = document.getElementById("to-do-list");
let addTaskBtn = toDoList.getElementsByClassName("btn-add-task")[0];

let db;

const dbRequest = indexedDB.open("TaskList", 1);

/**
 * When the database is successfully opened,
 * the tasks on the database are added to the table
 * @param {Event} event
 * @returns {undefined}
 */

dbRequest.onsuccess = function (event) {
  db = event.target.result;
  console.log("The database was initialized");

  let dbRequest = db
    .transaction("Tasks", "readonly")
    .objectStore("Tasks")
    .getAll();
  dbRequest.onsuccess = function (event) {
    let listOfTasks = event.target.result;
    for (i = 0; i < listOfTasks.length; i++) {
      addRowToTable(toDoList, listOfTasks[i].description);
    }
  };
};
/**
 * If there is an error, this will be anounced in the console.
 * @param {Event} event
 * @returns {void}
 */
dbRequest.onerror = (event) => {
  console.log("The database was not initialized");
};
/**
 * Returns a readwrite transaction with the given object store name
 * @param {IDBDatabase} db
 * @param {String} objStoreName
 * @returns {IDBObjectStore}
 *
 */
const startReadwriteTransactionOnDBWithObjStore = (db, objStoreName) => {
  const objStoreConnection = db
    .transaction(objStoreName, "readwrite")
    .objectStore(objStoreName);
  return objStoreConnection;
};
const startReadonlyTransactionOnDBWithObjStore = (db, objStoreName) => {
  const objStoreConnection = db
    .transaction(objStoreName, "readonly")
    .objectStore(objStoreName);
  return objStoreConnection;
};
/**
 * On the initialization of the database,
 * adds rows taken from the indexeDB to the toDoTable
 * @param {Event} event
 * @returns {void}
 */
dbRequest.onupgradeneeded = function (event) {
  db = event.target.result;
  const objStore = db.createObjectStore("Tasks", { autoIncrement: true });
  objStore.transaction.oncomplete = function (event) {
    const tasksStore = db
      .transaction("Tasks", "readwrite")
      .objectStore("Tasks");
    console.log(tasksStore);
    for (i = 0; i < listOfTasks.tasks.length; i++) {
      tasksStore.add(listOfTasks.tasks[i]);
    }
  };
};

/**
 * Adds a Task object to the indexedDB
 * @param {IDBDatabase} db
 * @param {Task} task
 * @returns {void}
 */
const addTaskToDatabase = (db, task) => {
  let objectStoreName = "Tasks";
  let tasksList = startReadwriteTransactionOnDBWithObjStore(
    db,
    objectStoreName
  );
  tasksList.add({
    id: task.id,
    description: task.description,
    status: task.status,
  });
};

/**
 * Makes the added task be added to the database when the user clicks on the "Adicionar" button
 */
addTaskBtn.addEventListener("click", () => {
  let index = getNumberOfTasks(getTableBody(toDoList)) + 1;
  let description = getInputValueFromHTMLElement(
    getTableInputFieldFromFoot(toDoList)
  );
  let tdStatus = "Bloqueada";
  let newTask = new Task(index, description, tdStatus);
  console.log(db);
  addTaskToDatabase(db, newTask);
});

// Get info from table

/**
 * Gets the typed taks from the input field and returns its string
 * @param {HTMLInputElement} element
 * @returns {String}
 */
const getInputValueFromHTMLElement = (element) => {
  return element.value;
};
/**
 * Adds a task to the list of tasks
 * @param {Task} value
 * @param {[Task]} instancesList
 * @returns {undefined}
 */
const addValueToInstancesList = (value, instancesList) => {
  instancesList.tasks.push(value);
};
/**
 * Counts the number os tasks, assuming it's equal to the
 * number of children element of the html element
 * @param {HTMLElement} parentElement
 * @returns {number}
 */
const getNumberOfTasks = (parentElement) => {
  const numberOfTasks = parentElement.childElementCount;
  return numberOfTasks;
};
