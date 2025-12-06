import React from "react";
import Title from "./../components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "./../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div className="pt-8 border-t text-2xl text-center">
        <Title text1={"ABOUT"} text2={"me"} />
      </div>
      <div className="flex md:flex-row flex-col gap-16 my-10">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            I was created with a purpose — to make online shopping easier,
            faster, and more enjoyable. I began as a simple idea, but I grew
            into a platform where you can explore, discover, and purchase a wide
            range of products from the comfort of your home. My mission is to
            bring you convenience, trust, and a smooth shopping experience every
            time you visit me.
          </p>
          <p>
            Since the day I launched, I’ve been devoted to offering a
            thoughtfully curated collection of stylish, high-quality clothing
            for women, men, and kids. Every piece I provide is selected with
            care, sourced from trusted suppliers to ensure variety, comfort, and
            modern style — all gathered for you in one place.
          </p>
          <b className="text-gray-800">my Mission</b>
          <p>
            My mission is to empower you with choice, convenience, and
            confidence. I’m committed to giving you a smooth, enjoyable shopping
            experience that goes beyond expectations — from the moment you start
            browsing, to placing your order, receiving your delivery, and
            everything that comes after.
          </p>
        </div>
      </div>
      <div className="py-4 text-xl">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex md:flex-row flex-col mb-20 text-sm">
        <div className="flex flex-col gap-5 px-10 md:px-16 py-8 sm:py-20 border">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            I meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>
        <div className="flex flex-col gap-5 px-10 md:px-16 py-8 sm:py-20 border">
          <b>Convenience: </b>
          <p className="text-gray-600">
            With my user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>
        <div className="flex flex-col gap-5 px-10 md:px-16 py-8 sm:py-20 border">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            I'm supported by a dedicated team that’s always here to help, making
            sure your experience is effortless and your satisfaction always
            comes first.
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;
