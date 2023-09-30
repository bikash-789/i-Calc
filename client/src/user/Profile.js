import React from "react";
import { isAuthenticated } from "../auth";
import user_picture from "../images/user-picture.png";
function Profile() {
  const { name, email, profession, role } = isAuthenticated().user;
  return (
    <div className="grid grid-cols-1 grid-rows-1 my-4 px-2 md:px-0">
      <div className="flex flex-col rounded-lg shadow-lg justify-self-center bg-slate-200 p-2 w-7/12 sm:w-6/12 md:w-4/12 lg:w-3/12">
        <div className="h-36  flex items-center justify-center">
          <div className="bg-white rounded-full h-24 w-24">
            <img
              src={user_picture}
              style={{
                backgroundPosition: "center",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
              }}
              alt="user"
            />
          </div>
        </div>
        <div className="h-36 text-center">
          <h1 className="text-xl font-semibold">~{name}</h1>
          <p>{email}</p>
          <p>{profession}</p>
          <p>{role === 1 ? "𝙰𝚍𝚖𝚒𝚗" : "𝚄𝚜𝚎𝚛"}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
