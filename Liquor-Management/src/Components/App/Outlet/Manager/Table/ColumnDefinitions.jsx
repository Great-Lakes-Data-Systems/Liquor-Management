import CostChangeCellRenderer from './CellRenderers/CostChangeCellRenderer.jsx';
import MsrpChangeCellRenderer from './CellRenderers/MsrpChangeCellRenderer.jsx';
import MarginCellRenderer from './CellRenderers/MarginCellRenderer.jsx';
import CustomPriceCellRenderer from './CellRenderers/CustomPriceCellRenderer.jsx';
import CustomColumnHeader from './ColumnHeader/CustomColumnHeader.jsx';

// Money Formatter
const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function formatDate(input) {
  const month = input.slice(0, 2);
  const day = input.slice(2, 4);
  const year = input.slice(4);
  const formattedDate = new Date(`${year}-${month}-${day}`);
  return formattedDate.toLocaleDateString();
}

const numberFilterOptions = {
  filterOptions: ['lessThan', 'lessThanOrEqual', 'greaterThan', 'greaterThanOrEqual', 'inRange']
};

const numberComparator = { comparator: (valueA, valueB) => valueA - valueB };

const customSizeComparator = (sizeStringA, sizeStringB) => {
  const sizeNumberA = sizeStringA.match('[0-9]+')[0];
  const sizeNumberB = sizeStringB.match('[0-9]+')[0];
  return +sizeNumberA - +sizeNumberB;
};

const costChangeValueGetter = (params) => {
  if (params.colDef.dollar === undefined || params.colDef.dollar) 
    return params.data.CostChange.dollar;
  else return params.data.CostChange.percent;
};

const msrpChangeValueGetter = (params) => {
  if (params.colDef.dollar === undefined || params.colDef.dollar) 
    return params.data.MsrpChange.dollar;
  else return params.data.MsrpChange.percent;
};

const marginValueGetter = (params) => {
  if (params.colDef.dollar === undefined || params.colDef.dollar) 
    return params.data.Margin.dollar;
  else return params.data.Margin.percent;
};

const NUMBER_OF_SIZES = 8;

const columnDefinitions = [
  { field: 'UPC', 
    flex: 2 },
  { field: 'brand', 
    flex: 3 },
  { field: 'vendor', 
    flex: 2 },
  { field: 'type', 
    flex: 2, 
    filter: 'agTextColumnFilter', 
    filterParams: { filterOptions: ['contains'] } },
  { field: 'size', 
    flex: 1, 
    filter: 'agTextColumnFilter', 
    filterParams: { filterOptions: ['contains', 'equals'], maxNumConditions: NUMBER_OF_SIZES }, 
    comparator: customSizeComparator },
  { field: 'CostChange', 
    flex: 1.4, 
    cellRenderer: CostChangeCellRenderer, 
    headerComponent: CustomColumnHeader, 
    valueGetter: costChangeValueGetter, 
    ...numberComparator },
  { field: 'MsrpChange', 
    flex: 1.4, 
    cellRenderer: MsrpChangeCellRenderer, 
    headerComponent: CustomColumnHeader, 
    valueGetter: msrpChangeValueGetter, 
    ...numberComparator },
  { field: 'cost', 
    flex: 1, 
    valueFormatter: c => USDollar.format(c.value), 
    filter: 'agNumberColumnFilter', 
    filterParams: numberFilterOptions, 
    ...numberComparator, 
    useValueFormatterForExport: false },
  { field: 'MSRP', 
    flex: 1, 
    valueFormatter: c => USDollar.format(c.value), 
    filter: 'agNumberColumnFilter', 
    filterParams: numberFilterOptions, 
    ...numberComparator, 
    useValueFormatterForExport: false },
  { field: 'Margin', 
    flex: 1, 
    cellRenderer: MarginCellRenderer, 
    headerComponent: CustomColumnHeader, 
    valueGetter: marginValueGetter, 
    ...numberComparator, },
  { field: 'custom', 
    flex: 1.4, 
    headerName: 'Custom Price', 
    cellRenderer: CustomPriceCellRenderer, 
    ...numberComparator },
  { field: 'adaName',
    flex: 1 },
  { field: 'adaNumber',
    flex: 1 },
  { field: 'effectiveDate',
    flex: 1, 
    valueFormatter: c => formatDate(c.value) },
  { field: 'liquorCode',
    flex: 1 },
  { field: 'packSize',
    flex: 1,
    valueFormatter: c => +c.value, },
  { field: 'proof',
    flex: 1 },
];

const defaultColumns = ['UPC','brand','vendor','type','size', 'CostChange','MsrpChange', 'cost','MSRP','Margin', 'custom'];

import { useState, useEffect } from 'react';
const ColumnDefinitions = () => {
  const [displayedColumns, setDisplayedColumns] = useState();
  const [loadingColDefs, setLoadingColDefs] = useState(true);
  
  useEffect(() => {
    const columnsToDisplay = JSON.parse(localStorage.getItem('columns_to_display')) || defaultColumns;
    setDisplayedColumns(columnDefinitions.filter((colDef) => columnsToDisplay.includes(colDef.field)));
    setLoadingColDefs(false);
  }, []);
  return { displayedColumns, loadingColDefs };
};

export default ColumnDefinitions;
