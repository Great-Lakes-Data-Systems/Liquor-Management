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
  else return `%${params.data.CostChange.percent}`;
};

const msrpChangeValueGetter = (params) => {
  if (params.colDef.dollar === undefined || params.colDef.dollar) 
    return params.data.MsrpChange.dollar;
  else return `%${params.data.MsrpChange.percent}`;
};

const marginValueGetter = (params) => {
  console.log(params);
  if (params.colDef.dollar === undefined || params.colDef.dollar) 
    return params.data.Margin.dollar;
  else return `%${params.data.Margin.percent}`;
};

const NUMBER_OF_SIZES = 8;

const columnDefinitions = [
  { field: 'UPC', flex: 2 },
  { field: 'brand', flex: 3 },
  { field: 'vendor', flex: 2 },
  { field: 'type', flex: 2, filter: 'agTextColumnFilter', filterParams: { filterOptions: ['contains'] } },
  { field: 'size', flex: 1, filter: 'agTextColumnFilter', filterParams: { filterOptions: ['contains', 'equals'], maxNumConditions: NUMBER_OF_SIZES }, comparator: customSizeComparator },
  { field: 'CostChange', flex: 1.4, cellRenderer: CostChangeCellRenderer, headerComponent: CustomColumnHeader, valueGetter: costChangeValueGetter, numberComparator },
  { field: 'MsrpChange', flex: 1.4, cellRenderer: MsrpChangeCellRenderer, headerComponent: CustomColumnHeader, valueGetter: msrpChangeValueGetter, numberComparator },
  { field: 'cost', flex: 1, valueFormatter: c => USDollar.format(c.value), filter: 'agNumberColumnFilter', filterParams: numberFilterOptions, ...numberComparator },
  { field: 'MSRP', flex: 1, valueFormatter: c => USDollar.format(c.value), filter: 'agNumberColumnFilter', filterParams: numberFilterOptions, ...numberComparator },
  { field: 'Margin', flex: 1, cellRenderer: MarginCellRenderer, headerComponent: CustomColumnHeader, valueGetter: marginValueGetter, comparator: (valueA, valueB) => valueA - valueB },
  { field: 'custom', flex: 1.4, headerName: 'Custom Price', cellRenderer: CustomPriceCellRenderer, ...numberComparator }
];

export default columnDefinitions;