import React, { useState } from "react";
import { signin, authenticate } from "../auth/index";
import { Link, useNavigate } from "react-router-dom";
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
    setValues({
      ...values,
      loading: true});

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
  const showError = () => {
    return (
      <p
        className="bg-red-500 text-center text-red-100 text-lg w-[80%] mx-auto mt-1 rounded-md"
        style={{ display: error ? "block" : "none" }}
      >
        {error}
      </p>
    );
  };
  const showLoading = () => {
    if (loading) {
      return (
        <p
        className="bg-yellow-500 text-center text-yellow-100 w-[80%] mx-auto mt-1 rounded-md text-lg"
        style={{ display: loading ? "block" : "none" }}
      >
        Loading...Please wait
      </p>
      );
    }
  };


  return (
    <section className="">
      {showError()}
          {showLoading()}
        <div className="flex justify-center items-center h-[90vh] w-full">
          <div className="rounded-lg shadow-xl justify-self-center p-4 bg-slate-200 min-w-[300px] max-w-[500px]">
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
                disabled={loading}
                className="w-full bg-indigo-500 rounded-md my-3 justify-self-center text-white hover:bg-indigo-700 h-10 text-xl"
              >
                Login
              </button>
              <center className="text-slate-600">Don't have an account? <Link to="/signup">Signup</Link></center>
            </form>
          </div>
        </div>
      {RedirectUser()}
    </section>
  );
}

export default Signin;
