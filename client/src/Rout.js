import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import Header from "./core/Header";
import PrivateRoute from "./auth/PrivateRoute";
import Profile from "./user/Profile";
import Record from "./record/Record";
import ViewEdit from "./record/ViewEdit";
//IN react-router-dom@v6 'switch' is replaced by 'Routes'
function Rout() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/signin" exact element={<Signin />} />
        <Route path="/viewEdit" exact element={<ViewEdit />} />

        <Route
          path="/user/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/record"
          element={
            <PrivateRoute>
              <Record />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default Rout;
