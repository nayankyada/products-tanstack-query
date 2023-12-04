import React from "react";

/*
 * Modal component
 * This component is used to display the modal
 * @param {boolean} isOpen - The state of the modal
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setOpenModal - The state setter function
 * @param {JSX.Element} children - The children of the modal
 * @returns {JSX.Element} - The modal component
 */
export function Footer() {
  return (
    <footer aria-labelledby="footer-heading" className="bg-gray-50 w-full mt-8">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 py-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} My Store, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
