import React from "react";

const NewsLetterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center">
      <p className="font-medium text-gray-800 text-2xl">
        Subscribe now & get 20% off
      </p>
      <p className="mt-3 text-gray-400">
        Get E-mail updates about our latest shop and
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="flex items-center gap-3 mx-auto my-6 pl-3 border w-full sm:w-1/2"
      >
        <input
          className="flex-1 px-4 outline-none w-full"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="bg-black px-10 py-4 text-white text-xs"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
