import { useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { createPortal } from "react-dom";

const Drawer = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    } else {
      document.removeEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  return isOpen
    ? createPortal(
        <div className={`fixed inset-0 flex justify-start z-50 backdrop-filter backdrop-blur-lg bg-opacity-25 transition delay-200 duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0"}`}>
          <div className="h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition delay-200 duration-300 ease-in-out">
            <div className="flex items-center justify-between p-4">
              <HiX className="w-8 h-8 text-gray-600 cursor-pointer" onClick={onClose} />
            </div>
            <div className="flex flex-col items-center justify-center h-48 mt-20">
              <a href="/categories" className="text-lg hover:text-blue-600 dark:hover:text-blue-400 mb-4">Categories</a>
              <a href="/supplies" className="text-lg hover:text-blue-600 dark:hover:text-blue-400 mb-4">Supplies</a>
              <a href="/about" className="text-lg hover:text-blue-600 dark:hover:text-blue-400 mb-4">About</a>
              <a href="/contact" className="text-lg hover:text-blue-600 dark:hover:text-blue-400">Contact</a>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default Drawer;
