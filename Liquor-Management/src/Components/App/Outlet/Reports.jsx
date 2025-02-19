import styles from './outlet.module.css';
import Select from '../../../Components/Select/Select';
import { useState } from 'react';
const allLiquorSizes = ['50 ML', '100 ML', '200 ML', '375 ML', '700 ML', '750 ML', '1000 ML', '1750 ML'];

function Reports() {
  const [allcheckedSizes, setAllCheckedSizes] = useState([]);

  function handleCheckboxChange(e) {
    // debugger;
    if (e.target.checked) {
      setAllCheckedSizes([...allcheckedSizes, allLiquorSizes[e.target.dataset.index]]);

    } else {
      setAllCheckedSizes(allcheckedSizes.filter(item => item !== allLiquorSizes[e.target.dataset.index]));
    }
  }

  const handler = (e) => {
    console.log(e);
  };
  return (
    <div className={styles.page}>
      <h1 className={styles.center}>Reports</h1>
      <Select onChange={handler} value={allcheckedSizes.join(',')} placeholder="Select Size">
        { allLiquorSizes.map( (size, index) => {
          return(
            <Select.CheckboxOption id={index} key={size} onChange={handleCheckboxChange}>
              {size}
            </Select.CheckboxOption>
          );
        }) }
      </Select>
    </div>
  );
}

export default Reports;