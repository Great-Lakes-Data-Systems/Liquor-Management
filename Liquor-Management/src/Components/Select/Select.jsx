/* eslint-disable react/display-name */
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import Display from './Components/Display';
import DropDown from './Components/DropDown';
import SelectToggle from './Components/SelectToggle';
import styles from './select.module.css';
import Option from './Components/Option';
import TagItem from './Components/TagItem';
import { use } from 'react';


const Select = forwardRef(({ options=[],value,onChange,placeholder,multiSelect=false,...props },ref) => {
  const [isToggled,setIsToggled] = useState(false);
  const [_,setReRender] = useState(false);
  const valueRef = useRef(value);
  const valueArrayRef = useRef(value);

  const setRefs = () => {
    valueRef.current = value;
    valueArrayRef.current = value instanceof String ? [] : value;
  };
  setRefs();

  const renderDisplay = useCallback(() => {
    try {

      if (multiSelect){
        
        
        if (valueArrayRef.current.length === 0) return '';
        

        return (
          <div className={styles.tags}>
            {valueArrayRef.current.map(v => {
              return (
                <TagItem key={v} value={v} text={options.filter(o => o.value.toString() === v)[0].label} onClick={() => {}} />
              );
            })}
          </div>
        );
            
      }

      let filterResults = options.filter(o => o.value === valueRef.current);
      if (filterResults.length > 0){
        return filterResults[0].label;
      }
      return '';
    } catch (error) {
      console.error(error.message);
    }
  },[options,multiSelect]);

  const toggleSelectClickEvent = (e) => {
    e.preventDefault();
    try {
      setIsToggled(!isToggled);
    } catch (error) {
      console.error(error.message);
    }
  };

  const onOptionClickEvent = useCallback((e,value) => {    
    if (multiSelect){
      
      let selectedItems = valueArrayRef.current;
      let index = selectedItems.findIndex(v => v == value);
      if (index > -1){
        let unselectedItems = selectedItems.splice(index,1);
        valueArrayRef.current = [...selectedItems];  
        setReRender(!_);
        return;
      }
      selectedItems.push(value.toString());
      valueArrayRef.current = [...selectedItems];
      // setIsToggled(false);
      onChange && onChange({target: {value:valueArrayRef.current,name:props.name}});
      setReRender(!_);
      return;
    }
    
    if (valueRef.current === value) {
      valueRef.current = undefined;
      setIsToggled(false);      
      return;
    }
    valueRef.current = value;
    onChange && onChange({target: {value:valueRef.current,name:props.name}});
    setIsToggled(false);    
  },[onChange,multiSelect]);

  const isSelected = (value) => {
    if (multiSelect) {
      let results = valueArrayRef.current.filter(v => v.toString() === value.toString());
      if (results.length > 0){
        return true;
      }
      return false;
    }
    if (valueRef.current === value) {
      return true;
    }
    return false;
  };

  const renderOptions = useCallback(() => {    
    if (options.length > 0){
      return options.map(option => {
        return (
          <Option key={option.id} onClick={onOptionClickEvent} isSelected={isSelected(option.value)} value={option.value}>
            {option.label}
          </Option>          
        );        
      });
    }
    return <div>No Options</div>;
  },[options,onOptionClickEvent]);


  return (
    <div ref={ref} data-input="select" className={`${styles.blah} ${multiSelect ? styles.multi : ''}`}>

      <div tabIndex='0' className={styles.select_input} onClick={toggleSelectClickEvent}>
        <Display value={renderDisplay()}  placeholder={placeholder}/>
        <SelectToggle />
      </div>
       
      <DropDown isActive={isToggled}>
        {renderOptions()}
      </DropDown>

    </div>
  );
});

export default Select;