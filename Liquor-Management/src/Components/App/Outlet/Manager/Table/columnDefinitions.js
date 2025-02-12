import { MarginCellRenderer, ChangeCellRenderer, CustomPriceCellRenderer } from './CellRenderers';

// Money Formatter
const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const numberFilterOptions = {
  filterOptions: ['lessThan', 'lessThanOrEqual', 'greaterThan', 'greaterThanOrEqual', 'inRange']
};

const customDollarFormatter = c =>  c.value ? USDollar.format(c.value) : '';

const customPriceComparator = (valueA, valueB) => {
  // TODO: Find out why this isn't working
  if (valueA && valueB) return valueA - valueB;
  else if (valueA) return valueA;
  else if (valueB) return valueB;
  else return 0;
};

const customSizeComparator = (sizeStringA, sizeStringB) => {
  const sizeNumberA = sizeStringA.match('[0-9]+')[0];
  const sizeNumberB = sizeStringB.match('[0-9]+')[0];
  return +sizeNumberA - +sizeNumberB;
};

const NUMBER_OF_SIZES = 8;

const columnDefinitions = [
  { field: 'UPC', flex: 2 },
  { field: 'brand', flex: 3 },
  { field: 'vendor', flex: 2 },
  { field: 'type', flex: 2, filter: 'agTextColumnFilter', filterParams: { filterOptions: ['contains'] } },
  { field: 'size', flex: 1, filter: 'agTextColumnFilter', filterParams: { filterOptions: ['contains', 'equals'], maxNumConditions: NUMBER_OF_SIZES }, comparator: customSizeComparator },
  { field: 'CostChange', flex: 1.4, cellRenderer: ChangeCellRenderer, comparator: (valueA, valueB) => valueA.dollar - valueB.dollar },
  { field: 'MsrpChange', flex: 1.4, cellRenderer: ChangeCellRenderer, comparator: (valueA, valueB) => valueA.dollar - valueB.dollar },
  { field: 'cost', flex: 1, valueFormatter: c => USDollar.format(c.value), filter: 'agNumberColumnFilter', filterParams: numberFilterOptions, comparator: (valueA, valueB) => valueA - valueB },
  { field: 'MSRP', flex: 1, valueFormatter: c => USDollar.format(c.value), filter: 'agNumberColumnFilter', filterParams: numberFilterOptions, comparator: (valueA, valueB) => valueA - valueB },
  { field: 'Margin', flex: 1, cellRenderer: MarginCellRenderer },
  { field: 'custom', flex: 1.4, headerName: 'Custom Price', cellRenderer: CustomPriceCellRenderer, valueFormatter: customDollarFormatter, comparator: customPriceComparator }
];

export default columnDefinitions;