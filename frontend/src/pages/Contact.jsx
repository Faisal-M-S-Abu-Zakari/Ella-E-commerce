import React from "react";
import Title from "./../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const Contact = () => {
  return (
    <div>
      <div className="pt-10 border-t text-2xl text-center">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="flex md:flex-row flex-col justify-center gap-10 my-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-gray-700 text-xl">OUR STORE</p>
          <p className="text-muted">
            Istanbul, <br /> Türkiye
          </p>
          <p className="text-muted">
            Tel: 123-458-3698
            <br />
            Email: Ella@gmail.com
          </p>
          <p className="font-semibold text-gray-700 text-xl">
            CAREERS AT FOREVER
          </p>
          <p className="text-muted">
            Learn more about my teams and job openings.
          </p>
          <button className="hover:bg-primary px-8 py-4 border border-border hover:text-white text-sm transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default Contact;
