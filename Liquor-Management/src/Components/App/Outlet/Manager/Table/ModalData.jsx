const ModalData = ({ data }) => {
  // TODO: Add proper css
  return (
    <div style={{color: 'red'}}>
      <div>Liquor Code: {data.liquorCode}</div>
      <div>Brand: {data.brand}</div>
      <div>ada Number: {data.adaNumber}</div>
      <div>ada Name: {data.adaName}</div>
      <div>Vendor: {data.vendor}</div>
      <div>Type: {data.type}</div>
      <div>Proof: {data.proof}</div>
      <div>Size: {data.size}</div>
      <div>Pack Size: {data.packSize}</div>
      <div>Cost: {data.cost}</div>
      <div>MSRP: {data.MSRP}</div>
      <div>UPC: {data.UPC}</div>
      <div>Effective Date: {data.effectiveDate}</div>
    </div>
  );
};

export default ModalData;