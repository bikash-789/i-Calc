import React, { useState } from "react";
import { signin, authenticate } from "../auth/index";
import { useNavigate } from "react-router-dom";
import loadingImg from "../images/loadingImage.svg";
import login from "../images/login.jpeg";
function Signin() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectTo: false,
  });
  // eslint-disable-next-line
  const { email, password, loading, error, redirectTo } = values;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      error: "",
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
          redirectTo: false,
        });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            loading: true,
            redirectTo: true,
          });
        });
      }
    });
  };

  const RedirectUser = () => {
    const Navigate = useNavigate();
    if (redirectTo) {
      setValues({ ...values, loading: false });
      return Navigate("/user/profile");
    }
  };
  const showLoading = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center mt-52">
          <img
            src={loadingImg}
            width="200px"
            height="200px"
            alt="loading"
            className="bg-white"
          />
        </div>
      );
    }
  };
  const showError = () => {
    return (
      <h1
        className="bg-red-400 text-center text-white text-lg"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </h1>
    );
  };
  return (
    <>
      {showError()}
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 md:px-0">
        <div className="h-108 md:h-screen">
          <img
            src={login}
            style={{
              width: "100%",
              height: "100%",
              backgroundPosition: "center",
            }}
            alt="login"
          />
        </div>
        <div className="bg-gray-400 flex justify-center items-center">
          <div className="border-2 rounded-lg shadow-xl justify-self-center p-4 bg-slate-200 w-9/12 sm:w-6/12 md:w-7/12 h-48">
            <form>
              <h1 className="text-slate-500 text-center text-xl">Login</h1>

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input-box"
                value={email}
                autoComplete="off"
                onChange={handleChange}
              />
              <br />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input-box"
                value={password}
                autoComplete="off"
                onChange={handleChange}
              />
              <br />

              <button
                onClick={handleSubmit}
                className="w-full bg-indigo-500 rounded-md my-3 justify-self-center text-white hover:bg-indigo-700 h-10 text-xl"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      {RedirectUser()}
      {showLoading()}
    </>
  );
}

export default Signin;
