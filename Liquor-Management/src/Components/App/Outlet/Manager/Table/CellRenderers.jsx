import { useState } from 'react';
import CaretDownFillIcon from '../../../../../assets/icons/CaretDownFillIcon';
import CaretUpFillIcon from '../../../../../assets/icons/CaretUpFillIcon';

// Money Formatter
const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const MarginCellRenderer = (params) => {
  const [show, setShow] = useState(true);
  return (
    <div onClick={() => setShow(!show)} style={{display: 'flex', alignItems: 'center', color: 'green'}}>
      <CaretUpFillIcon color='green'/>
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
    <div onClick={() => setShow(!show)} style={{display: 'flex', alignItems: 'center', color: params.value.direction ? 'green' : 'red'}}>
      {
        params.value.direction ? 
          <CaretUpFillIcon color='green'/> :
          <CaretDownFillIcon color='red'/>
      }
      {
        show ? 
          USDollar.format(params.value.dollar):
          <span>%{params.value.percent}</span> 
      }
    </div>
  );
};

export const CustomPriceCellRenderer = (params) => {
  const [show, setShow] = useState(true);
  return (
    <div onClick={() => {setShow(!show); console.log('params', params);}}>
      {
        show ?
          params.value && USDollar.format(params.value) :
          ''
      }
    </div>
  );
};