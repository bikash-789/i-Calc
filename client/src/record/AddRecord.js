import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addRecord } from "../record/index";

function AddRecord() {
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [values, setValues] = useState({
    principalAmount: "",
    date: "",
    rate: "",
    comment: "",
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
    // eslint-disable-next-line
    const res = await addRecord(values);
    if (res.error) {
      setError(res.error);
    } else setRedirect(true);
  };

  const redirectUser = () => {
    if (redirect) {
      navigate("/user/record", { replace: true });
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
      <div className="rounded-lg shadow-lg justify-self-center p-4 bg-slate-200 w-9/12 sm:w-6/12 md:w-7/12 h-90">
        <form>
          <h1 className="text-slate-500 text-center text-xl">Add Record</h1>
          <input
            type="number"
            min="0"
            step=".01"
            name="principalAmount"
            placeholder="Principal amount"
            className="input-box-ve"
            value={values.principalAmount}
            autoComplete="off"
            required
            onChange={handleChange}
          />
          <br />
          <input
            type="date"
            name="date"
            placeholder="Date"
            className="input-box-ve"
            value={values.date}
            autoComplete="off"
            required
            onChange={handleChange}
          />
          <br />
          <input
            type="number"
            min="0"
            step=".01"
            name="rate"
            placeholder="Rate"
            className="input-box-ve"
            value={values.rate}
            autoComplete="off"
            required
            onChange={handleChange}
          />
          <br />
          <textarea
            name="comment"
            placeholder="Remarks..."
            className="input-box-ve"
            rows="5"
            cols="50"
            required
            value={values.comment}
            onChange={handleChange}
          />
          <br />
          <button
            onClick={handleSubmit}
            className="w-1/4 bg-indigo-500 rounded-md my-3 justify-self-center text-white hover:bg-indigo-700"
          >
            Add
          </button>
        </form>
      </div>
      {redirectUser()}
    </>
  );
}

export default AddRecord;
