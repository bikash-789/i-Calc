import React, { useEffect, useState } from "react";
import { getRecords, deleteRecord, recordById, interestCalc } from "./index";
import loadingImg from "../images/loadingImage.svg";
import { useNavigate } from "react-router-dom";
import { addRecord } from "../record/index";

function Record() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  let netPrincipal = 0;
  let netInterest = 0;
  let netAmnt = 0;
  const [loading, setLoading] = useState(false);
  const populateRecords = async () => {
    setLoading(true);
    const res = await getRecords();
    setLoading(false);
    setRecords(res.records);
  };
  useEffect(() => {
    populateRecords();
  }, []);

  const dateManipulator = (date) => {
    return date.substr(0, 10);
  };
  const handleEdit = async (recordId) => {
    const res = await recordById(recordId);
    navigate("/viewEdit", { state: res });
  };
  function commaAddAndRemove(amount, symbol) {
    amount = parseInt(amount);
    if (symbol === 1) {
      amount = amount.toString();
      let c = amount.length - 1;
      let result = [];

      if (c >= 3) {
        result.unshift(amount[c--]);
        result.unshift(amount[c--]);
        result.unshift(amount[c--]);
        result.unshift(",");

        for (let i = 1; c >= 0; i++) {
          if (i % 2 === 0 && c > 0) {
            result.unshift(amount[c--]);
            result.unshift(",");
          } else result.unshift(amount[c--]);
        }
        amount = result.join("");
      }
    } else if (symbol === 0) {
      let arr = amount.split(",");
      arr = arr.join("");
      amount = arr;
      amount = parseInt(amount);
    }
    return amount;
  }

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

  const delRecord = async (key) => {
    await deleteRecord(key);
    await populateRecords();
  };

  function AddRecord() {
    const [error, setError] = useState("");
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
      } else {
        setValues({
          principalAmount: "",
          date: "",
          rate: "",
          comment: "",
        });
        await populateRecords();
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
        <div className="rounded-lg shadow-lg justify-self-center p-4 bg-slate-200 w-9/12 sm:w-6/12 md:w-7/12 h-90 my-10">
          {showError()}
          <br />
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
      </>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-2 lg:grid-rows-1">
        <div className="h-full lg:h-screen bg-gray-300 flex justify-center items-center">
          {AddRecord()}
        </div>
        <div className="bg-gray-200 flex flex-col justify-start items-center px-2 overflow-scroll sm:text-sm md:text-lg">
          <table class="table-fixed bg-white p-4 mt-2 border border-collapse border-slate-400 shadow-lg">
            <thead>
              <tr>
                <th className="border border-slate-300 p-1 lg:p-2 text-slate-500">
                  #
                </th>
                <th className="border border-slate-300 p-1 lg:p-2 text-slate-500">
                  Principal Amount(Rs.)
                </th>
                <th className="border border-slate-300 p-1 lg:p-2 text-slate-500">
                  Rate(%)
                </th>
                <th className="border border-slate-300 p-1 lg:p-2 text-slate-500">
                  Date
                </th>
                <th className="border border-slate-300 p-1 lg:p-2 text-slate-500">
                  Interest Amount(Rs.)
                </th>
                <th className="border border-slate-300 p-1 lg:p-2 text-slate-500">
                  Remarks
                </th>
                <th className="border border-slate-300 p-1 lg:p-2 text-slate-500">
                  Delete
                </th>
                <th className="border border-slate-300 p-1 lg:p-2 text-slate-500">
                  Modify
                </th>
              </tr>
            </thead>
            <tbody>
              {records.length > 0 &&
                records.map((record, index) => {
                  netPrincipal =
                    parseInt(netPrincipal) + parseInt(record.principalAmount);
                  netInterest =
                    parseInt(netInterest) +
                    parseInt(
                      interestCalc(
                        record.principalAmount,
                        record.rate,
                        record.date
                      )
                    );
                  netAmnt = parseInt(netPrincipal) + parseInt(netInterest);
                  return (
                    <tr key={record._id}>
                      <td className="text-center border border-slate-300 text-gray-600 text-sm">
                        {index + 1}
                      </td>
                      <td className="text-center border border-slate-300 text-gray-600 text-sm">
                        {commaAddAndRemove(record.principalAmount, 1)}
                      </td>
                      <td className="text-center border border-slate-300 text-gray-600 text-sm">
                        {record.rate}
                      </td>
                      <td className="text-center border border-slate-300 text-gray-600 text-sm">
                        {dateManipulator(record.date)}
                      </td>
                      <td className="text-center border border-slate-300 text-gray-600 text-sm">
                        {commaAddAndRemove(
                          interestCalc(
                            record.principalAmount,
                            record.rate,
                            record.date
                          ),
                          1
                        )}
                      </td>
                      <td className="text-center border border-slate-300 text-gray-600 text-sm">
                        {record.comment.length > 10
                          ? record.comment.substr(0, 10) + "..."
                          : record.comment}
                      </td>

                      <td className="text-center border border-slate-300 py-3">
                        <button
                          className="bg-red-500 text-red-50 px-3 rounded-sm shadow-md text-sm"
                          onClick={() => delRecord(record._id)}
                        >
                          D
                        </button>
                      </td>
                      <td className="text-center border border-slate-300 py-3">
                        <button
                          className="bg-blue-500 text-blue-50 px-3 ml-auto rounded-sm shadow-md text-sm"
                          onClick={() => {
                            handleEdit(record._id);
                          }}
                        >
                          M
                        </button>
                      </td>
                    </tr>
                  );
                })}
              <tr className="text-green-300 bg-black">
                <td className="text-center px-2">Net</td>
                <td className="text-center">
                  {commaAddAndRemove(netPrincipal, 1)}
                </td>
                <td></td>
                <td></td>
                <td className="text-center">
                  {commaAddAndRemove(netInterest, 1)}
                </td>
                <td className="text-center">{commaAddAndRemove(netAmnt, 1)}</td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          {!loading && records.length === 0 && (
            <h1 className="text-center text-2xl text-red-100 mt-10">
              No records available!
            </h1>
          )}
          {showLoading()}
        </div>
      </div>
    </>
  );
}

export default Record;
