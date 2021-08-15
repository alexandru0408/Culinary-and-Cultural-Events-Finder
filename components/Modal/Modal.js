import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { AiOutlineCloseSquare } from "react-icons/ai";

export default function Modal({ show, onClose, children, title }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const modal = show ? (
    <div className="backdrop">
      <div className="modal">
        <header className="modal__header">
          <a href="#" onClick={handleClose} className="modal__close">
            <AiOutlineCloseSquare />
          </a>
        </header>
        {title && <div>{title}</div>}
        <div className="modal__body">{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(modal, document.getElementById("modal-root"));
  } else {
    return null;
  }
}
