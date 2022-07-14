import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/index";
function Header() {
  const navigate = useNavigate();
  const btn = () => {
    return (
      <>
        {isAuthenticated() && (
          <li
            className="ml-4 px-2 mr-1  hover:cursor-pointer hover:text-orange-200"
            onClick={() => {
              signout(() => {
                navigate("/signin", { replace: true });
              });
            }}
          >
            Signout
          </li>
        )}
        {!isAuthenticated() && (
          <li className="ml-4 px-2 mr-1 hover:text-orange-400 hover:cursor-pointer rounded-lg">
            <Link to="/signin">Login</Link>
          </li>
        )}
      </>
    );
  };
  return (
    <div className="bg-black h-10 flex items-center py-4 shadow-xl">
      {/* logo */}
      <div>
        {/* <img width="100px" height="100px" src="" /> */}
        <h1 className="py-2 px-4 md:text-2xl text-orange-500">iCal-C</h1>
      </div>

      {/* navs */}
      <div className="ml-auto">
        <ul type="none" className="flex text-white">
          <li className="hover:cursor-pointer px-2 hover:text-orange-200">
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated() && (
            <li className="hover:cursor-pointer px-2 hover:text-orange-200">
              <Link to="/user/profile">Dashboard</Link>
            </li>
          )}
          {isAuthenticated() && (
            <li className="hover:cursor-pointer px-2 hover:text-orange-200">
              <Link to="/user/record">Record</Link>
            </li>
          )}
          {btn()}
        </ul>
      </div>
    </div>
  );
}

export default Header;
