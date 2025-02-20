import { IoIosCloseCircle } from "react-icons/io";
import { createPortal } from 'react-dom';

const Modal = ({ onClose, isOpen, children }) => {
  if (!isOpen) return null; // Prevent rendering if modal is closed

  return createPortal(
    <div className="fixed inset-0 z-40 flex justify-center items-center backdrop-blur-md bg-black/50">
      <div className="relative z-50 min-w-[400px] max-w-[100%] bg-green-300 px-4 py-4 rounded-md shadow-lg">
        <div className="flex justify-end">
          <IoIosCloseCircle onClick={onClose} className="text-3xl cursor-pointer text-blue-950" />
        </div>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root") // Ensure this exists in index.html
  );
};

export default Modal;
