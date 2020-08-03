// A few dummy tasks to start the table

const testTask = new Task(4, "Fazer festa", "Por fazer");
const numberOfChildrenOfTestParentDiv = 8;
const testListOfTasks = new ListOfRows([task1, task2, task3], tableName);
const responseTask = new ListOfRows([task1, task2, task3, testTask], tableName);

/**
 * Creates a test table with an input field - used in testGetTableInputFieldFromFoot
 */
const testTableWithFootAndInput = document.createElement("table");
const testTableFoot = document.createElement("tfoot");
const testInputField = document.createElement("input");
testTableFoot.appendChild(testInputField);
testTableWithFootAndInput.appendChild(testTableFoot);

/**
 * Creates a test table with a body - used in testGetTableBody
 */
const testTableWithBody = document.createElement("table");
const testTableBody = document.createElement("tbody");
testTableWithBody.appendChild(testTableBody);

/**
 * Dummy div element to be used by testGetNumberOfTasks
 */
const testParentDiv = document.createElement("div");
const createChildrenForElement = (parent, htmlTag, numberOfChildren) => {
  for (i = 0; i < numberOfChildren; i++) {
    let childNode = document.createElement(htmlTag);
    parent.appendChild(childNode);
  }
  return parent;
};
createChildrenForElement(testParentDiv, "div", numberOfChildrenOfTestParentDiv);

/**
 *
 * @param {*} db
 * @param {*} task
 */
const testAddTaskToDatabase = (db, task) => {
  let tasksList = startReadonlyTransactionOnDBWithObjStore(db, "Tasks");
  let dbRequest = tasksList.getAll();
  dbRequest.onsuccess = (event) => {
    let objectContainingTasksBeforeNewTaskAddition = event.target.result;
    let numberOfObjectsBeforeAddition =
      objectContainingTasksBeforeNewTaskAddition.length;
    addTaskToDatabase(db, task);
    tasksList = startReadonlyTransactionOnDBWithObjStore(db, "Tasks");
    dbRequest = tasksList.getAll();
    dbRequest.onsuccess = (event) => {
      let objectContainingTasksAfterNewTaskAddition = event.target.result;
      let numberOfObjectsAfterAddition =
        objectContainingTasksAfterNewTaskAddition.length;
      if (numberOfObjectsAfterAddition == numberOfObjectsBeforeAddition) {
        console.log("An object is correctly added to the db");
      }
    };
  };
};
//   tasksList = startReadonlyTransactionOnDBWithObjStore(db, "Tasks");
//   dbRequest = tasksList.getAll();
//   dbRequest.onsuccess = (event) => {
//     let objectContainingTasks = event.target.result;
//   };
// };

/**
 *
 * @param {*} testTask
 * @param {*} testListOfTasks
 * @param {*} responseTask
 */
const testAddValueToInstancesList = (
  testTask,
  testListOfTasks,
  responseTask
) => {
  addValueToInstancesList(testTask, testListOfTasks);
  if (
    testListOfTasks.tasks[testListOfTasks.tasks.length] ==
    responseTask.tasks[responseTask.tasks.length]
  ) {
    console.log(
      "addValueToInstancesList is correctly adding a task to the list of tasks"
    );
  } else {
    console.log(
      "addValueToInstancesList is not adding a task to the list of tasks"
    );
  }
};

/**
 *
 * @param {HTMLElement} testElement
 * @param {HTMLInputElement} expectedInputField
 * @returns {void}
 */
const testGetTableInputFieldFromFoot = (testElement, expectedInputField) => {
  const testElementInputField = getTableInputFieldFromFoot(testElement);
  if (testElementInputField == expectedInputField) {
    console.log("You are successfully getting the input field");
  } else {
    console.log("You are not getting the input field");
  }
};

const testGetNumberOfTasks = (testParentElement, expectedNumberOfTasks) => {
  let returnedNumberOfTasks = getNumberOfTasks(testParentElement);
  if (returnedNumberOfTasks == expectedNumberOfTasks) {
    console.log("The correct number of tasks was read");
  } else {
    console.log("The read number of tasks is wrong");
  }
};

const testGetTableBody = (testTable, expectedTableBody) => {
  if (expectedTableBody == getTableBody(testTable)) {
    console.log("The correct table body is being gotten");
  } else {
    console.log("The correct table body is not being gotten");
  }
};

const runTests = () => {
  testGetTableBody(testTableWithBody, testTableBody);
  testAddValueToInstancesList(testTask, testListOfTasks, responseTask);
  testGetTableInputFieldFromFoot(testTableWithFootAndInput, testInputField);
  testGetNumberOfTasks(testParentDiv, numberOfChildrenOfTestParentDiv);
  testAddTaskToDatabase(db, task1);
};
