import { HTMLAttributes, MouseEvent, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { cleanClasses } from "../utils/helpers";

const modalRoot = document.getElementById("modal");

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose, ...props }: Props) => {
  const { className, ...rest } = props;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!modalRoot) return <div className="bg-red-500">Modal not found.</div>;
  return createPortal(
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div {...rest} className={className}>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
