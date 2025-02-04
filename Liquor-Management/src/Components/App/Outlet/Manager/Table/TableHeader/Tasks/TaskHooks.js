import { customColumnDef } from '../../managerHooks';

//  Function to add a task to local storage
export function saveFilterState( currentGrid, taskName, setTaskName, setDisplayTasks, increase ) {
  const filterState = currentGrid.getFilterModel();
  const columnState = currentGrid.getColumnState();
  const filterStates = JSON.parse(localStorage.getItem('tasksList')) || [];
  const selectedItems = currentGrid.getSelectedNodes().filter((node) => node.displayed);
  const upcsOfSelectedItems = selectedItems.map((rowNode) => rowNode.data.UPC);
  localStorage.setItem('tasksList', JSON.stringify([...filterStates, { taskName, filterState, columnState, increase, upcsOfSelectedItems }]));
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
    return ( cost * (1 + Number(increase.percentage)) ).toFixed(2);
}

// Function to increase prices of selected items and display all items
export function applyCustomPrices(currentGrid, setRowData, increase) {
  const newCustomTableData = [];
  currentGrid.forEachNode( (rowNode) => {
    const customRowNode = JSON.parse(JSON.stringify(rowNode.data));
    if (rowNode.selected && rowNode.displayed)
      customRowNode.custom = getNewCost(rowNode.data.cost, increase);
    newCustomTableData.push(customRowNode);
  });
  currentGrid.setGridOption('columnDefs', customColumnDef);  // Add 'Custom' column
  setRowData(newCustomTableData);  // Set the new data to the table
};