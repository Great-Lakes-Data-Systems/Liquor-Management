import { customColumnDef } from '../../managerHooks';

const SaveFilterState = () => {

  //  Function to add the state of the grid to an array
  function saveFilterState( currentGrid, taskName, setTaskName, setDisplayTasks, increase ) {
    const filterState = currentGrid.getFilterModel();
    const columnState = currentGrid.getColumnState();
    const filterStates = JSON.parse(localStorage.getItem('tasksList')) || [];
    localStorage.setItem('tasksList', JSON.stringify([...filterStates, { taskName, filterState, columnState, increase }]));
    setTaskName('');  // Clear the input text
    setDisplayTasks(false);   // Hide the Tasks popup
    console.log('tasksList', JSON.parse(localStorage.getItem('tasksList')));
  };

  // Function to get the custom price of an item after increase
  function getNewCost(cost, increase) {
    if (increase.dollar)
      return (Number(cost) + Number(increase.dollar)).toFixed(2);
    else if (increase.percentage) 
      return ( cost * (1 + Number(increase.percentage)) ).toFixed(2);
  }

  // Function to increase prices of filtered items and display all items
  function applyCustomPrices(currentGrid, setRowData, increase) {
    const newCustomTableData = [];
    currentGrid.forEachNode( (rowNode) => {
      const customRowNode = JSON.parse(JSON.stringify(rowNode.data));
      if (rowNode.displayed)
        customRowNode.custom = getNewCost(rowNode.data.cost, increase);
      newCustomTableData.push(customRowNode);
    });
    currentGrid.setGridOption('columnDefs', customColumnDef);  // Add 'Custom' column
    setRowData(newCustomTableData);  // Set the new data to the table
  };

  return {
    saveFilterState,
    applyCustomPrices
  };
};

export default SaveFilterState;