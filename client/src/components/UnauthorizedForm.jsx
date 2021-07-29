import React from 'react';

export const UnauthorizedForm = ({
  changeFormHandler,
  registerHandler,
  loginHandler,
  loading,
}) => {
  return (
    <div className="card text-white bg-primary my-5">
      <div className="card-header">
        <h2>Authorization</h2>
      </div>
      <div className="card-body">
        <h5 className="card-title">Welcome on site</h5>
        <p className="card-text">Login or register to be Authorized!</p>
        <div>
          <div className="input-group mb-3">
            <input
              id="email"
              name="email"
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={changeFormHandler}
            />
            <span className="input-group-text" id="inputGroup-sizing-default">
              Email
            </span>
          </div>
          <div className="input-group mb-3">
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-default"
              onChange={changeFormHandler}
            />
            <span className="input-group-text" id="inputGroup-sizing-default">
              Password
            </span>
          </div>
          <div className="text-end">
            <button
              className="btn btn-dark"
              onClick={loginHandler}
              disabled={loading}
            >
              Login
            </button>
            <button
              className="btn btn-dark ms-3"
              onClick={registerHandler}
              disabled={loading}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
