import React from 'react';

export const ToastCompanent = () => {
  return (
    <div className="toast-container position-absolute top-0 end-0 p-3">
      <div
        id="myToastEl"
        className="toast text-white bg-danger align-items-center"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">
            Hello, world! This is a toast message.
          </div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
};
