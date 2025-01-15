import styles from './tasks.module.css';

const TaskList = ({ filterStates, currentGrid, setDisplayTasks }) => {

  const loadFilter = (task) => {
    const filterState = JSON.parse(task.filterState);
    const columnState = JSON.parse(task.columnState);
    currentGrid.setFilterModel(filterState);
    currentGrid.applyColumnState({state: columnState, applyOrder: true});
    setDisplayTasks(false);
  };

  return (
    <div>
      <ul>
        {filterStates.map((task, index) => {
          return (
            <li key={index}>
              <button className={styles.taskButton} onClick={() => loadFilter(task)}>
                {task.taskName  || 'Unnamed Task'}
              </button>
            </li>
          );
        })}
      </ul>
      <button className={styles.taskTab}><h3>Apply</h3></button>
    </div>
  );
};

export default TaskList;