import { React, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { updateRecord } from "../record/index";

function ViewEdit() {
  const [redirect, setRedirect] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { principalAmount, date, rate, comment } = location.state.record;
  const [values, setValues] = useState({
    principalAmount: "",
    date: "",
    rate: "",
    comment: "",
  });
  // eslint-disable-next-line
  useEffect(() => {
    setValues({
      principalAmount: principalAmount,
      date: date,
      rate: rate,
      comment: comment,
    });
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line
    const res = await updateRecord(location.state.record._id, values);
    if (res.error) {
      setError(res.error);
    } else setRedirect(true);
  };
  const todayDate = () => {
    let date = new Date().toISOString();
    date = date.substr(0, 10);
    return date;
  };
  const clearAll = (e) => {
    e.preventDefault();
    setValues({
      principalAmount: "",
      date: todayDate(),
      rate: "",
      comment: "",
    });
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
  const dateManipulator = (date) => {
    return date.substr(0, 10);
  };
  const redirectUser = () => {
    if (redirect) {
      navigate("/user/record", { replace: true });
    }
  };

  return (
    <>
      {showError()}
      <div className="grid grid-cols-1 grid-rows-1 my-4 px-2 md:px-0">
        <div className="border-2 rounded-lg shadow-lg justify-self-center p-2 bg-slate-200 w-7/12 sm:w-6/12 md:w-4/12">
          <form>
            <h1 className="text-slate-500 text-center">View and Edit</h1>
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
              value={dateManipulator(values.date)}
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
              Submit
            </button>
            <button
              onClick={clearAll}
              className="w-1/4 bg-green-600 rounded-md my-3 ml-2 justify-self-center text-white hover:bg-green-700"
            >
              Clear
            </button>
          </form>
        </div>
        {redirectUser()}
      </div>
    </>
  );
}

export default ViewEdit;
