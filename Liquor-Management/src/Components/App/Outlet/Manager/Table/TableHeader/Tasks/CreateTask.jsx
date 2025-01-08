import styles from './tasks.module.css';
import { jsxFilter }from './FilterLogHook';

const CreateTask = ({ currentGrid, taskName, setTaskName, saveFilterState }) => {
  return (
    <>
      <input type="text" placeholder='Task Name' value={taskName} onChange={(e) => setTaskName(e.target.value)} />
      <div className={styles.actionsAndFilterStateContainer}>
        <div>
          <h4>Actions</h4>
          <input type="number" placeholder='$'/>
          <input type="number" placeholder='%'/>
        </div>
        <div>
          {jsxFilter(currentGrid.getFilterModel())}
        </div>
      </div>
      <div>
        <button className={styles.taskTab}><h3>Apply</h3></button>
        <button onClick={saveFilterState} className={styles.taskTab}><h3>Save</h3></button>
      </div>
    </>
  );
};

export default CreateTask;