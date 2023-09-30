import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../auth/index";

function Signup() {
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    profession: "",
    loading: false,
    password: "",
  });
  const {loading} = values;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({
      ...values,
      loading: true
    })
    const user = await signup(values);
    if (user.error) {
      setValues({
        ...values,
        loading: false
      })
      setError(user.error);
    } else {
      setRedirect(true);
    }
  };
  const redirectUser = () => {
    if (redirect) {
      navigate("/signin", { replace: true });
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
    <div className="">
      {showError()}
      {showLoading()}
      <div className="h-[90vh] flex px-2 py-4 justify-center items-center w-full">
        <div className="border-2 rounded-lg shadow-lg p-4 bg-slate-200 max-w-[600px]">
          <form>
            <h1 className="text-slate-500 text-center text-lg">Sign up</h1>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input-box"
              value={values.name}
              autoComplete="off"
              onChange={handleChange}
            />
            <br />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input-box"
              value={values.email}
              autoComplete="off"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input-box"
              value={values.password}
              autoComplete="off"
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              name="profession"
              placeholder="Profession"
              className="input-box"
              value={values.profession}
              autoComplete="off"
              onChange={handleChange}
            />
            <br />
            <br />
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-indigo-500 rounded-md my-3 justify-self-center text-white hover:bg-indigo-700 h-10 text-xl"
            >
              Sign up
            </button>
            <center className=" text-slate-600">Already have an account? <Link to="/signin">Login</Link></center>
          </form>
          
        </div>
        {redirectUser()}
      </div>
    </div>
  );
}

export default Signup;
