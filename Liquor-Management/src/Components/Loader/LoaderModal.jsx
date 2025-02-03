import { CSSTransition } from "react-transition-group";
import WEPortal from "../WEModal/WEPortal";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from './loader.module.css';
import useEventListener from "../../hooks/useEventListener";
import { publish, subscribe, unsubscribe } from "../../events";


const defaultConfig = {
  portalWrapperId: "loader_portal",
  transition: {
    timeout: {entry:0,exit:500},
    unmountOnExit: true,
    classNames: "we-modal__container-scale-in-left"
  },
  showCloseButton: true

}


const loader = {
  loading(){
    publish('startloading')
  },
  loaded(){
    publish('endloading');
  }
}


const LoaderModal = ({  config }) => {
  const [showLoading,setShowLoading] = useState(false);
  

  const modalConfig = {...defaultConfig,...config};

  const modalRef = useRef(null);

  const toggleLoader = (e) => {
    setShowLoading(!showLoading);
  }

  useEffect(() => {
    subscribe('startloading',toggleLoader);
    subscribe('endloading',toggleLoader);
    return () => {
      unsubscribe('startloading',toggleLoader)
      unsubscribe('endloading',toggleLoader)
    }
  })

  


  return (
    <WEPortal portalWrapperId={modalConfig.portalWrapperId}>   
      <CSSTransition
        nodeRef={modalRef}
        in={showLoading}
        timeout={{ entry: 5000, exit: 5000 }}
        // mountOnEnter
        unmountOnExit
        classNames={{
          enter: styles.myEnter,
          enterActive: styles.myEnterActive,
          enterDone: styles.myEnterDone,
          exit: styles.myExit,
          exitActive: styles.myExitActive,
          exitDone: styles.myExitDone
        }}
      >
        <div className={styles.loader} ref={modalRef}>
              <div className={styles.spinner}></div>
            </div>

        {/* <div className={`${styles.modal_container} ${styles.scale_in} ${styles.center}`} style={{...props.style}} ref={modalRef}>  

          

        </div> */}

      </CSSTransition>

    </WEPortal>
  );
}

export { LoaderModal, loader };