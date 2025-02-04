import { useState, useMemo, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the Data Grid
import { columnDefinitions } from './managerHooks';
import styles from './manager.module.css';
import TableHeader from './TableHeader/TableHeader';
// TODO: Get PriceBook from database
import webData from './Data/webData';
import TableFooter from './TableFooter';
import WEModal from '../../../../../WEModal/WEModal';
import useModal from '../../../../../WEModal/hooks/useModal';
import ModalData from './ModalData';

const ManagerBody = () => {

  const gridRef = useRef();
  const [selectedRowCount, setSelectedRowCount] = useState();
  const [itemSource, setItemSource] = useState('PriceBook');
  const [totalRows, setTotalRows] = useState(0);
  const { modalState, toggleModal } = useModal();
  const [modalData, setModalData] = useState();

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState(webData);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs,] = useState(columnDefinitions);

  // Default Column Definitions
  const defaultColDef = useMemo(() => {
    return {
      filterParams: {
        // TODO: Decide if we want this functionality
        maxNumConditions: 1
      }
    };
  }, []);

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
    const selectedAndDisplayedRows = params.api.getSelectedNodes().filter((node) => node.displayed);
    setSelectedRowCount(selectedAndDisplayedRows.length); // Setting the number of selected and displayed rows to be shown in the footer
    setTotalRows(params.api.getDisplayedRowCount());
  }, []);

  // Search Functionality
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setGridOption(
      'quickFilterText',
      document.getElementById('filter-text-box').value,
    );
  }, []);

  // Row Data Modal Functionality
  const onRowDoubleClicked = (e) => {
    toggleModal();
    setModalData(<ModalData data={e.data} />);
  };

  //gridRef?.current?.api.addEventListener('filterOpened', (e) => filterOpenedHandler(e, gridRef.current.api));

  return (
    <div className={styles.managerBody}>

      <TableHeader
        onFilterTextBoxChanged={onFilterTextBoxChanged}
        setRowData={setRowData}
        setItemSource={setItemSource}
        itemSource={itemSource}
        currentGrid={gridRef?.current?.api} />

      <div className={`ag-theme-quartz ${styles.managerTable}`}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          rowSelection={rowSelection}
          onStateUpdated={onStateUpdated}
          ref={gridRef}
          onRowDoubleClicked={onRowDoubleClicked}
        />
      </div>

      <TableFooter selected={selectedRowCount} totalRows={totalRows} itemSource={itemSource} />

      {/* TODO: Fix close button */}
      <WEModal isOpen={modalState} toggle={toggleModal}>
        {modalData}
      </WEModal>

    </div>
  );
};

export default ManagerBody;