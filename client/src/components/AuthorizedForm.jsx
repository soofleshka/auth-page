import React from 'react';

export const AuthorizedForm = ({ logoutHandler, loading, userId }) => {
  return (
    <div className="card text-white bg-primary my-5">
      <div className="card-header">
        <h2>You are authorized</h2>
      </div>
      <div className="card-body">
        <h5 className="card-title">Welcome {userId}</h5>
        <p className="card-text">Logout to be unAuthorized!</p>
        <div className="text-end">
          <button
            className="btn btn-dark"
            onClick={logoutHandler}
            disabled={loading}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
