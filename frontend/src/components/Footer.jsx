import { assets } from "./../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col gap-14 sm:grid grid-cols-[3fr_1fr_1fr] my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Ella Store is an online clothing brand dedicated to delivering
            stylish, high-quality apparel for women, men, and kids. We offer a
            diverse collection designed to suit every taste and occasion, all
            while ensuring a smooth and enjoyable shopping experience. With fast
            and reliable shipping, along with a supportive customer service team
            always ready to assist, Ella Store is committed to making fashion
            accessible, effortless, and enjoyable for everyone.
          </p>
        </div>
        <div>
          <p className="mb-5 font-medium text-xl">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="mb-5 font-medium text-xl">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+90 534 259 48 19</li>
            <li>ellashahba@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025@ Ella Store - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
