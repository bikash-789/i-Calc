import { isAuthenticated } from "../auth";

//add record
export const addRecord = async (data) => {
  if (isAuthenticated()) {
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    return fetch(`http://localhost:8000/record/add/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }
};

//get records
export const getRecords = async (req, res) => {
  try {
    if (isAuthenticated()) {
      const userId = isAuthenticated().user._id;
      const token = isAuthenticated().token;
      const records = await fetch(`http://localhost:8000/records/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        return response.json();
      });
      return records;
    }
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

//delete record
export const deleteRecord = (recordId) => {
  if (isAuthenticated()) {
    return fetch(`http://localhost:8000/record/del/${recordId}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  }
};

//get record by id
export const recordById = async (recordId) => {
  try {
    if (isAuthenticated()) {
      const record = await fetch(`http://localhost:8000/record/${recordId}`, {
        method: "GET",
      }).then((response) => {
        return response.json();
      });
      return record;
    }
  } catch (error) {
    console.log(error);
  }
};

//update record by id
export const updateRecord = async (recordId, data) => {
  const response = await fetch(
    `http://localhost:8000/record/update/${recordId}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
    .then((res) => res.json())
    .then((data) => data);
  return response;
};

//interest calculator
export const interestCalc = (principalAmount, rate, date) => {
  let modifiedDate = new Date(date.substr(0, 10));
  let difference = new Date().getTime() - modifiedDate.getTime();
  let noOfDays = Math.ceil(difference / (1000 * 3600 * 24));

  //now calculate interest
  let Amount = (principalAmount, noOfDays, rate) => {
    let A = principalAmount * Math.pow(1 + rate / 100, noOfDays / 365);
    return parseInt(A);
  };

  let interestAmount =
    Amount(parseInt(principalAmount), noOfDays, rate) -
    parseInt(principalAmount);
  return parseInt(interestAmount).toFixed(2);
};
