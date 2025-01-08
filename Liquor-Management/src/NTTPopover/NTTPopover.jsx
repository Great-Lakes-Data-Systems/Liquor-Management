import { Children,cloneElement,useRef } from 'react';
import * as positionValues from './positions/positions';
import usePopover from './hooks/usePopover';
import useOnClickOutside from './hooks/useOnClickOutside';
import usePopoverPosition from './hooks/usePopoverPosition';

import styles from './nttPopover.module.css';



const defaultConfig = {
  position: positionValues.BOTTOM_CENTER,
  gap: 8,
  mode: "popover"
}

const opacityMode = (mode) => {  
  switch (mode) {
    case "popover":
      return "0.0";  
    default:
      return "0.2";
  }
}


const NTTPopover = ({children,close,open,show,popover,config={...defaultConfig}},...props) => {
  const {position,updatePosition} = usePopoverPosition(config);
  const childArray = Children.toArray(children);  
 
  const popoverConfig = {...defaultConfig,...config}

  const popoverModalRef = useRef(null);

  useOnClickOutside(popoverModalRef,() => close())

  const onClickHandler = (e,onClick) => {    
    e.preventDefault();    
    onClick(e);
    updatePosition(e.currentTarget,popoverModalRef.current.parentElement);    
    open();
  }

  
  return (
    <div className={styles.popover} style={props.style}>

      <div className={`${styles.popover_modal} ${show ? styles.showing : ""}`} style={{"--background-opacity":opacityMode(popoverConfig.mode)}}>
        <div ref={popoverModalRef} className={styles.modal_popover} style={{ position: "absolute", ...position }}>
          {popover}         
        </div>
      </div>
      

      {Children.map(childArray,(child) => {
        let childOnClickEvent = child.props.onClick;
        let onClick = (e) => onClickHandler(e,childOnClickEvent);
        
        return cloneElement(child,{onClick},child.props.children);
      })}
    </div>
  );
}

export {NTTPopover as default,positionValues as positions,usePopover};