import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../auth/index";

function Signup() {
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    profession: "",
    password: "",
  });
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
    const user = await signup(values);
    if (user.error) {
      setError(user.error);
    } else setRedirect(true);
  };
  const redirectUser = () => {
    if (redirect) {
      navigate("/signin", { replace: true });
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
    <div className="h-screen bg-gray-400">
      {showError()}
      <div className="grid grid-cols-1 grid-rows-1 px-2 py-4 md:px-0">
        <div className="border-2 rounded-lg shadow-lg justify-self-center p-4 bg-slate-200 w-7/12 sm:w-6/12 md:w-4/12">
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
              onClick={handleSubmit}
              className="w-full bg-indigo-500 rounded-md my-3 justify-self-center text-white hover:bg-indigo-700 h-10 text-xl"
            >
              Sign up
            </button>
          </form>
        </div>
        {redirectUser()}
      </div>
    </div>
  );
}

export default Signup;
