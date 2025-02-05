// Money Formatter
const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const numberFilterOptions = {
  filterOptions: ['lessThan', 'lessThanOrEqual', 'greaterThan', 'greaterThanOrEqual', 'inRange']
};

const customDollarFormatter = c => {
  if (c.value) 
    return USDollar.format(c.value);
  else
    return '';
};

const NUMBER_OF_SIZES = 8;

export const columnDefinitions = [
  { field: 'UPC', flex: 2 },
  { field: 'brand', flex: 3 },
  { field: 'vendor', flex: 3 },
  { field: 'type', flex: 2, filter: 'agTextColumnFilter', filterParams: { filterOptions: ['contains'] } },
  { field: 'size', flex: 1, filter: 'agTextColumnFilter', filterParams: { filterOptions: ['contains', 'equals'], maxNumConditions: NUMBER_OF_SIZES } },
  { field: 'cost', flex: 1, valueFormatter: c => USDollar.format(c.value), filter: 'agNumberColumnFilter', filterParams: numberFilterOptions },
  { field: 'MSRP', flex: 1, valueFormatter: c => USDollar.format(c.value), filter: 'agNumberColumnFilter', filterParams: numberFilterOptions }
];

export const customColumnDef = [
  { field: 'UPC', flex: 2 },
  { field: 'brand', flex: 3 },
  { field: 'vendor', flex: 3 },
  { field: 'type', flex: 2, filter: 'agTextColumnFilter', filterParams: { filterOptions: ['contains'] } },
  { field: 'size', flex: 1, filter: 'agTextColumnFilter', filterParams: { filterOptions: ['contains', 'equals'], maxNumConditions: NUMBER_OF_SIZES } },
  { field: 'cost', flex: 1, valueFormatter: c => USDollar.format(c.value), filter: 'agNumberColumnFilter', filterParams: numberFilterOptions },
  { field: 'MSRP', flex: 1, valueFormatter: c => USDollar.format(c.value), filter: 'agNumberColumnFilter', filterParams: numberFilterOptions },
  { field: 'custom', flex: 1, headerName: 'Custom Price', valueFormatter: customDollarFormatter }
];

export const filterOpenedHandler = (e, ) => {
  if (e.column.colId === 'size') {
    // e.eGui.innerHTML = null;
    e.eGui.innerHTML = `
      <div onClick="() => window.setSizeColumnFilter(currentGrid, '50 ML')">50 ML</div>
      <div>100 ML</div>
      <div>200 ML</div>
      <div>375 ML</div>
      <div>700 ML</div>
      <div>750 ML</div>
      <div>1000 ML</div>
      <div>1750 ML</div>
    `;
    console.log(e);
    //setSizeColumnFilter(currentGrid, '100 ML');
  }
};

window.setSizeColumnFilter = async (currentGrid, filter) => {
  await currentGrid.setColumnFilterModel('size', {
    filterType: 'text', type: 'equals', filter: filter
  });

  // Tell grid to run filter operation again
  currentGrid.onFilterChanged();
};