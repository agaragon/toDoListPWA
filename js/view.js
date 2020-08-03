/**
 * Creates a table cell with the parsed string
 * @param {String} content
 * @returns {HTMLTableCellElement}
 */
const createCell = (content) => {
  let cell = document.createElement("td");
  cell.textContent = content;
  return cell;
};

// Get table elements
/**
 * Gets a table and looks for an input field in it
 * @param {HTMLTableElement} table
 * @returns {HTMLInputElement}
 */
const getTableInputFieldFromFoot = (table) => {
  return getTableFoot(table).querySelector("input");
};
/**
 * Receives a table and returns its foot
 * @param {HTMLTableElement} table
 * @returns {HTMLTableSectionElement}
 */
const getTableFoot = (table) => {
  return table.querySelector("tfoot");
};

/**
 * Gets the body of a given table
 * @param {HTMLTableElement} table
 * @returns {HTMLTableSectionElement}
 */
const getTableBody = (table) => {
  return table.querySelector("tbody");
};

/**
 * Searches for an input element in a html element and returns it
 * @param {HTMLElement} element
 * @returns {HTMLInputElement}
 */
const getElementInput = (element) => {
  return element.querySelector("input");
};
// Create a new row
/**
 * Receives a table row and appends it to the bottom of a table
 * @param {HTMLTableRowElement} trow
 * @param {HTMLTableElement} cells
 */
const addCellsToRow = (trow, cells) => {
  for (let i = 0; i < cells.length; i++) {
    trow.appendChild(cells[i]);
  }
};
/**
 * Creates a new row for a table given a string with a task name
 * @param {String} task
 * @param {HTMLTableSectionElement} tableBody
 * @returns {HTMLTableRowElement}
 */
const createRow = (task, tableBody) => {
  let trow = document.createElement("tr");
  let tdIndex = createCell(getNumberOfTasks(tableBody) + 1);
  let tdDescription = createCell(task);
  let tdStatus = createCell("Bloqueada");
  let tdRmvTask = createCell("Remover");
  tdRmvTask.addEventListener("click", (event) => {
    removeTaskRow(event);
  });
  addCellsToRow(trow, [tdIndex, tdDescription, tdStatus, tdRmvTask]);
  return trow;
};
let a;
const removeTaskRow = (event) => {
  event.target.parentElement.remove();
  let taskId = parseInt(event.target.parentElement.children[0].textContent);
  // let transaction = db.t
  let dbRequest = db
    .transaction("Tasks", "readwrite")
    .objectStore("Tasks")
    .getAll();
  dbRequest.onsuccess = (event) => {
    let data = event.target.result;

    for (i = 0; i < data.length; i++) {
      if (data[i]["id"] == taskId) {
        dbRequest = db
          .transaction("Tasks", "readwrite")
          .objectStore("Tasks")
          .delete(data[i]["id"]);
      }
    }
  };
};

const addTaskToDB = (db, task) => {
  const tasksStore = db.transaction("Tasks", "readwrite").objectStore("Tasks");
  tasksStore.add({
    id: task.id,
    description: task.description,
    status: task.status,
  });
};

const getTaskDescriptionCellFromRow = (tableRow) => {
  let rowDescriptionCell = tableRow.children[1];
};
const getTaskDescriptionFromTableRow = (tableRow) => {
  let taskDescription = getTaskDescriptionCellFromRow(tableRow).textContent;
  return taskDescription;
};

// Adds a new row to the table

//adds a row to the a table

/**
 * Adds a new row to a table
 * @param {HTMLTableElement} table
 * @param {string} task
 */
const addRowToTable = (table, task) => {
  addRowToTableBodyBottom(getTableBody(table), task);
};
/**
 * Adds a new row to the bottom of the body of table
 * @param {HTMLTableSectionElement} tableBody
 * @param {String} task
 */
const addRowToTableBodyBottom = (tableBody, task) => {
  let trow = createRow(task, tableBody);
  tableBody.appendChild(trow);
};
/**
 * Adds a list of rows to a table
 * @param {HTMLTableElement} table
 * @param {[HTMLTableRowElement]} listOfRows
 */
const addRowsToTable = (table, listOfRows) => {
  let i;
  for (i = 0; i < listOfRows.tasks.length; i++) {
    addRowToTable(table, listOfRows.tasks[i].description);
  }
};

// addRowsToTable(toDoList, listOfTasks);

/**
 * Insert task in table when user clicks the "Adicionar" button
 */
addTaskBtn.addEventListener("click", () => {
  addRowToTable(
    toDoList,
    getInputValueFromHTMLElement(getElementInput(toDoList))
  );
});

/**
 * Cleans the input field
 * @param {HTMLElement:table} table
 */
const cleanTableInputField = (table) => {
  getTableInputFieldFromFoot(table).value = "";
};
/**
 * Makes the input field be cleaned when the user clicks the btn "Adicionar tarefa"
 */
addTaskBtn.addEventListener("click", () => {
  cleanTableInputField(toDoList);
});
