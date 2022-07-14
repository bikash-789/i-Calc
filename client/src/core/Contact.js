import React, { useState } from "react";

function Contact() {
  const [values, setValues] = useState({
    fname: "",
    email: "",
    phone: "",
    query: "",
  });
  const { fname, email, phone, query } = values;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(values);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 md:px-0">
      <div className="h-96 md:h-screen flex flex-col first-col justify-start items-center"></div>
      <div className="bg-indigo-200 flex justify-center items-center h-full lg:h-screen">
        <div className="rounded-lg shadow-xl p-4 bg-slate-200 w-9/12 sm:w-6/12 md:w-7/12 h-80">
          <form>
            <h1 className="text-slate-500 text-center text-xl">Contact Form</h1>
            <input
              type="text"
              name="fname"
              placeholder="Full Name"
              className="input-box"
              value={fname}
              autoComplete="off"
              onChange={handleChange}
            />
            <br />
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
              type="tel"
              name="phone"
              placeholder="Phone"
              className="input-box"
              value={phone}
              autoComplete="off"
              onChange={handleChange}
            />
            <br />
            <textarea
              name="query"
              placeholder="Query/Feedback"
              className="input-box"
              rows="4"
              cols="50"
              value={query}
              onChange={handleChange}
            />
            <br />
            <button
              onClick={handleSubmit}
              className="w-1/4 bg-indigo-500 rounded-md my-3 justify-self-center text-white hover:bg-indigo-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
