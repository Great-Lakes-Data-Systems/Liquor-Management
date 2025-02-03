/* eslint-disable react/display-name */

import { forwardRef } from 'react';
import Select from '../../Components/Select/Select';


const AsyncSelect = forwardRef(({placeholder,value,onChange,query,...props},ref) => {
  const {status,data} = query();  
  const platforms = !status.isLoading ? data.map(d=> ({value:d.id,label:d.name})) : [];
  return (
    <Select ref={ref} value={value} onChange={onChange} options={platforms} placeholder={placeholder} {...props} />
  );
});

export default AsyncSelect;