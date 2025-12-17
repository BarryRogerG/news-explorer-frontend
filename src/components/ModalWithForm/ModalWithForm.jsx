import { useEffect } from "react";

import "./ModalWithForm.css";

function ModalWithForm({
  isOpen,
  onClose = () => {},
  name,
  title,
  buttonText,
  onSubmit,
  children,
  linkText,
  onLinkClick,
  isValid = true,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.classList.add("modal-open");

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.classList.remove("modal-open");
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit(e);
  };

  // ✅ single early return
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          type="button"
          className="modal__close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <h2 id="modal-title" className="modal__title">
          {title}
        </h2>

        <form
          className="modal__form"
          name={name}
          onSubmit={handleSubmit}
        >
          {children}
          <button
            type="submit"
            className={`modal__submit-button ${
              !isValid ? "modal__submit-button_disabled" : ""
            }`}
            disabled={!isValid}
          >
            {buttonText}
          </button>
        </form>

        {linkText && onLinkClick && (
          <div className="modal__footer">
            <span className="modal__footer-text">or </span>
            <button
              type="button"
              className="modal__footer-link"
              onClick={onLinkClick}
            >
              {linkText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalWithForm;
