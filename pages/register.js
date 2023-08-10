import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    wallet_address: "",
    message: "",
  });

  const handleSubmit = async () => {
    const data = {
      Name: userData.name,
      Email: userData.email,
      Wallet_Address: userData.wallet_address,
      Message: userData.message,
    };
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_SHEET_URI}`, data);
      router.push("/");
    } catch (err) {
      console.log(err, "data submit error line:27");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className=" relative mx-auto my-6 w-96 sm:w-72 mt-16">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1 outline-none focus:outline-none">
          <div className="relative p-6 flex-auto">
            <div>
              <label
                htmlFor="name"
                className="text-black dark:text-white text-sm font-bold leading-tight tracking-normal"
              >
                Name
              </label>
              <div className="relative mb-3 mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={userData.name}
                  onChange={handleInputChange}
                  className="text-white focus:outline-none focus:border focus:border-yellow-700 font-normal w-full h-10 flex items-center pl-3 pr-10 text-sm border-gray-300 rounded border"
                  placeholder="Enter your name"
                />
              </div>
              <label
                htmlFor="personEmail"
                className="text-black dark:text-white text-sm font-bold leading-tight tracking-normal"
              >
                Email
              </label>
              <div className="relative mb-3 mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="text-white focus:outline-none focus:border focus:border-yellow-700 font-normal w-full h-10 flex items-center pl-3 pr-10 text-sm border-gray-300 rounded border"
                  placeholder="Enter your email"
                />
              </div>
              <label
                htmlFor="wallet_address"
                className="text-black dark:text-white text-sm font-bold leading-tight tracking-normal"
              >
                Wallet Address
              </label>
              <div className="relative mb-3 mt-2">
                <input
                  id="wallet_address"
                  name="wallet_address"
                  type="text"
                  value={userData.wallet_address}
                  onChange={handleInputChange}
                  className="text-white focus:outline-none focus:border focus:border-yellow-700 font-normal w-full h-10 flex items-center pl-3 pr-10 text-sm border-gray-300 rounded border"
                  placeholder="Enter your address"
                />
              </div>
              <label
                htmlFor="message"
                className="text-black dark:text-white text-sm font-bold leading-tight tracking-normal"
              >
                Message
              </label>
              <div className="relative mb-3 mt-2">
                <input
                  id="message"
                  name="message"
                  type="text"
                  value={userData.message}
                  onChange={handleInputChange}
                  className="text-white focus:outline-none focus:border focus:border-yellow-700 font-normal w-full h-10 flex items-center pl-3 pr-10 text-sm border-gray-300 rounded border"
                  placeholder="Enter message"
                />
              </div>

              <div className="flex justify-between items-center gap-4">
                <button
                  onClick={handleSubmit}
                  className={`nft-gradient mt-2 text-sm minlg:text-lg px-6 minlg:px-8  font-semibold text-white rounded-lg w-full py-2.5`}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
