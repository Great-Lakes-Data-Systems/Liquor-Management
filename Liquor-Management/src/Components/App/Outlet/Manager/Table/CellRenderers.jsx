import { useState } from 'react';

// Money Formatter
const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const MarginCellRenderer = (params) => {
  const [show, setShow] = useState(true);
  return (
    <div onClick={() => setShow(!show)}>
      {
        show ? 
          <span>%{params.value.percent}</span> :
          USDollar.format(params.value.dollar)
      }
    </div>
  );
};

export const ChangeCellRenderer = (params) => {
  const [show, setShow] = useState(true);
  return (
    <div onClick={() => setShow(!show)}>
      {
        show ? 
          USDollar.format(params.value.dollar):
          <span>%{params.value.percent}</span> 
      }
    </div>
  );
};