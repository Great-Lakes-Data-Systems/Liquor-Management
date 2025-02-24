import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the Data Grid
import ColumnDefinitions from './ColumnDefinitions';
import styles from './manager.module.css';
import TableHeader from './TableHeader/TableHeader';
import Fetch from './Data/Fetch';
import TableFooter from './TableFooter';
import WEModal from '../../../../../WEModal/WEModal';
import useModal from '../../../../../WEModal/hooks/useModal';
import LiquorDetail from './LiquorDetails/LiquorDetail';

const ManagerBody = () => {

  const gridRef = useRef();
  const [selectedRowCount, setSelectedRowCount] = useState();
  const [itemSource, setItemSource] = useState('PriceBook');
  const [totalRows, setTotalRows] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const { modalState, toggleModal } = useModal();
  const [modalData, setModalData] = useState();
  
  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState();
  
  // Loading the data
  const { data, loading } = Fetch();
  useEffect(() => {
    !loading && setRowData(data);
  }, [loading, data]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState();
  
  // Loading the data
  const { displayedColumns, loadingColDefs } = ColumnDefinitions();
  useEffect(() => {
    !loadingColDefs && setColDefs(displayedColumns);
  }, [loadingColDefs, displayedColumns]);

  // Enable row selection
  const rowSelection = useMemo(() => {
    return {
      mode: 'multiRow',
      checkboxes: true,
      headerCheckbox: true,
      enableClickSelection: true,
    };
  }, []);

  // Footer functionality
  const onStateUpdated = useCallback((params) => {
    const selectedAndDisplayedRows = params?.api?.getSelectedNodes().filter((node) => node.displayed);
    setSelectedRowCount(selectedAndDisplayedRows?.length); // Setting the number of selected and displayed rows to be shown in the footer
    setTotalRows(params?.api?.getDisplayedRowCount());
  }, []);

  // Search Functionality
  useEffect(() => {
    gridRef.current?.api?.setGridOption('quickFilterText', searchValue);
    onStateUpdated(gridRef.current);
  }, [searchValue, onStateUpdated]);

  // Row Data Modal Functionality
  const onRowDoubleClicked = (e) => {
    setModalData(e.data);
    toggleModal();
  };

  return (
    <div className={styles.managerBody}>

      <TableHeader
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setRowData={setRowData}
        setItemSource={setItemSource}
        itemSource={itemSource}
        currentGrid={gridRef?.current?.api}
        selected={selectedRowCount} />

      <div className={`ag-theme-quartz ${styles.managerTable}`}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          rowSelection={rowSelection}
          onStateUpdated={onStateUpdated}
          ref={gridRef}
          onRowDoubleClicked={onRowDoubleClicked}
        />
      </div>

      <TableFooter selected={selectedRowCount} totalRows={totalRows} itemSource={itemSource} />

      <WEModal isOpen={modalState} toggle={toggleModal}>
        <LiquorDetail data={modalData} toggle={toggleModal} />
      </WEModal>

    </div>
  );
};

export default ManagerBody;