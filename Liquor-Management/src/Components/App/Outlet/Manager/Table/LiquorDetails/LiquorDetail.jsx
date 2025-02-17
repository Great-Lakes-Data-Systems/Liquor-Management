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
    <div>
      <h2 className={styles.item_details_header} onClick={() => console.log(data)}>Item Details</h2>
      <div>
        <div>UPC: {data.UPC}</div>
        <div>Brand: {data.brand}</div>
        <div>Vendor: {data.vendor}</div>
        <div>ada Name: {data.adaName}</div>
        <div>ada Number: {data.adaNumber}</div>
        <div>Type: {data.type}</div>
        <div>Proof: {data.proof}</div>
        <div>Size: {data.size}</div>
      </div>
      <div>
        <div>Cost Change: {USDollar.format(data.CostChange.dollar)} %{data.CostChange.percent}</div>
        <div>Price Change: {USDollar.format(data.MsrpChange.dollar)} %{data.MsrpChange.percent}</div>
        <div>Cost: {USDollar.format(data.cost)}</div>
        <div>MSRP: {USDollar.format(data.MSRP)}</div>
        <div>Margin: {USDollar.format(data.Margin.dollar)} %{data.Margin.percent}</div>
        <div>Liquor Code: {data.liquorCode}</div>
        <div>Pack Size: {+data.packSize}</div>
        <div>Effective Date: {formatDate(data.effectiveDate)}</div>
        <div>Custom Price: {USDollar.format(data.custom)}</div>
      </div>
      <button onClick={() => toggle()} className={styles.lm_button}>Close</button>
    </div>
  );
};

export default LiquorDetail;