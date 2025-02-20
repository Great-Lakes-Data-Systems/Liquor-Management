import styles from './LiquorDetails.module.css';

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

const LiquorDetail = ({ data, toggle }) => {
  return (
    <div className={styles.item_details_container}>
      <h2 className={styles.item_details_header} onClick={() => console.log(data)}>Item Details</h2>
      <div className={styles.details_container}>

        <div className={styles.details_column}>
          <div className={styles.individual_detail}>UPC: {data.UPC}</div>
          <div className={styles.individual_detail}>Brand: {data.brand}</div>
          <div className={styles.individual_detail}>Vendor: {data.vendor}</div>
          <div className={styles.individual_detail}>ada Name: {data.adaName}</div>
          <div className={styles.individual_detail}>ada Number: {data.adaNumber}</div>
          <div className={styles.individual_detail}>Type: {data.type}</div>
          <div className={styles.individual_detail}>Proof: {data.proof}</div>
          <div className={styles.individual_detail}>Size: {data.size}</div>
          <div className={styles.individual_detail}>Pack Size: {+data.packSize}</div>
        </div>
        <div>
          <div className={`${styles.grid_container} `}>
            <div></div>
            <div className={`${styles.grid_header}`}>dollar</div>
            <div className={`${styles.grid_header}`}>percent</div>
            {/* TODO: Show direction of change */}
            <div className={`${styles.individual_detail}`}>Cost Change:</div>
            <div className={`${styles.individual_detail}`}>{USDollar.format(data.CostChange.dollar)}</div>
            <div className={`${styles.individual_detail}`}>%{data.CostChange.percent}</div>
            <div className={`${styles.individual_detail}`}>Price Change:</div>
            <div className={`${styles.individual_detail}`}>{USDollar.format(data.MsrpChange.dollar)}</div>
            <div className={`${styles.individual_detail}`}>%{data.MsrpChange.percent}</div>
            <div className={`${styles.individual_detail}`}>Margin:</div>
            <div className={`${styles.individual_detail}`}>{USDollar.format(data.Margin.dollar)}</div>
            <div className={`${styles.individual_detail}`}>%{data.Margin.percent}</div>
          </div>
          <div className={styles.individual_detail}>Cost: {USDollar.format(data.cost)}</div>
          <div className={styles.individual_detail}>MSRP: {USDollar.format(data.MSRP)}</div>
          <div className={styles.individual_detail}>Liquor Code: {data.liquorCode}</div>
          <div className={styles.individual_detail}>Effective Date: {formatDate(data.effectiveDate)}</div>
          <div className={styles.individual_detail}>Custom Price: {USDollar.format(data.custom)}</div>
        </div>
      </div>
      <div className={styles.details_container}>
        <button onClick={() => toggle()} className={`${styles.lm_button} ${styles.no_print}`}>Close</button>
        <button className={`${styles.lm_button} ${styles.no_print}`} onClick={() => window.print()}>Print</button>
      </div>
    </div>
  );
};
// TODO: Add print label
export default LiquorDetail;