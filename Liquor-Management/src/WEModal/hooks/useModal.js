import { useState, useRef } from "react";


const useModal = () => {
  const [coordinates, setCoordinates] = useState({ top: 0, left: 0 });
  const [modalState, setModalState] = useState(false);

  const anchorRef = useRef(null);

  const toggleModal = (next) => {
    if (next) {
      setModalState(next);
      return;
    }
    if (modalState) {
      setModalState(false);
      return;
    }
    setModalState(true);
  }
  return { modalState, coordinates, toggleModal }
}

export default useModal;