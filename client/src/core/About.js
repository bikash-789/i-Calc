import React from "react";
import AboutImg from "../images/about.svg";

function About() {
  return (
    <>
      <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-2">
        <div className="md:flex-col  md:flex p-20 max-w-screen-sm">
          <img src={AboutImg} alt="about" className="object-cover" />
        </div>
        <div className="p-3">
          <h1 className="text-5xl sm:text-8xl ">What's our aim?</h1>
          <br />
          <br />
          <h2 className="text-2xl sm:text-3xl text-gray-500">
            Our main objective is to solve people's problem.
          </h2>
          <br />
          <h2 className="text-2xl sm:text-3xl text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
            dolor, nulla perspiciatis veritatis, nihil explicabo laboriosam, ex
            nisi beatae reprehenderit blanditiis rem? Voluptate ipsum labore
            quae placeat ad! Officia, sequi!
          </h2>
        </div>
      </div>
    </>
  );
}

export default About;
