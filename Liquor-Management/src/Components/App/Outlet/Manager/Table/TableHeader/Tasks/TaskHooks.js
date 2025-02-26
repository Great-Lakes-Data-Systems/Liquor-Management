//  Function to add a task to local storage
export function saveTask( currentGrid, taskName, setTaskName, setDisplayTasks, increase ) {
  const filterState = currentGrid.getFilterModel();
  const columnState = currentGrid.getColumnState();
  const upcsOfSelectedItemsObject = {};
  currentGrid.forEachNodeAfterFilter((rowNode) => {
    if (rowNode.selected) 
      upcsOfSelectedItemsObject[rowNode.data.UPC] = rowNode.data.UPC;
  });
  const filterStates = JSON.parse(localStorage.getItem('tasksList')) || [];
  localStorage.setItem('tasksList', JSON.stringify([...filterStates, { taskName, filterState, columnState, increase, upcsOfSelectedItemsObject }]));
  setTaskName('');  // Clear the input text
  setDisplayTasks(false);   // Hide the Tasks popup
};

// Function to remove task from local storage
export function removeTask(task, setListOfTasks) {
  const oldTaskList = JSON.parse(localStorage.getItem('tasksList'));
  const newTaskList = oldTaskList.filter((item) => JSON.stringify(item) !== JSON.stringify(task));
  localStorage.setItem('tasksList', JSON.stringify(newTaskList));
  setListOfTasks(newTaskList);  // Set the list of tasks in the UI
}

// Function to get the custom price of an item after increase
function getNewCost(cost, increase) {
  if (increase.dollar)
    return (Number(cost) + Number(increase.dollar)).toFixed(2);
  else if (increase.percentage) 
    return ( cost * (1 + (Number(increase.percentage) / 100) ) ).toFixed(2);
}

// Function to increase prices of selected items and display all items
export function applyCustomPrices(currentGrid, setRowData, increase) {
  const newCustomTableData = [];
  currentGrid.forEachNode( (rowNode) => {
    const customRowNode = JSON.parse(JSON.stringify(rowNode.data));
    if (rowNode.selected && rowNode.displayed){
      customRowNode.custom = getNewCost(rowNode.data.cost, increase);
      customRowNode.priceChanged = true;
    }
    newCustomTableData.push(customRowNode);
  });
  setRowData(newCustomTableData);  // Set the new data to the table
};

// Function to increase prices of selected items from saved task
export function applySavedCustomPrices(currentGrid, setRowData, task, setDisplayTasks) {
  const upcsObject = task.upcsOfSelectedItemsObject;  // Get the UPCs of the items to update from the saved task
  const newCustomTableData = [];
  currentGrid.forEachNode( (rowNode) => {
    const customRowNode = JSON.parse(JSON.stringify(rowNode.data));  // Create a new copy of the node
    if (rowNode.data.UPC === upcsObject[rowNode.data.UPC] ){  // If the UPC of the current node is in the saved UPCs object
      customRowNode.custom = getNewCost(rowNode.data.cost, task.increase);  // On the custom field of the new row node add the new cost
      customRowNode.priceChanged = true;  // Set the flag of price changed to true to display the field as blue in the table
    }
    newCustomTableData.push(customRowNode);  // Add the new row node to the new table data
  });
  setRowData(newCustomTableData);  // Set the new data to the table
  currentGrid.setFilterModel(task.filterState); // Set the grids filter to the state saved in the task
  currentGrid.applyColumnState({state: task.columnState, applyOrder: true}); // Set the grids column state to the state saved in the task
  setDisplayTasks(false);  // Hide the tasks modal
};