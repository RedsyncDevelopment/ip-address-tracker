import axios from "axios";
import React, { useEffect, useState } from "react";
import bgimage from "../images/pattern-bg.png";
import Informations from "./Informations";

// IP-API Interface for used values
export interface IPAddressInterface {
  query: string;
  status: string;
  continent: string;
  countryCode: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
}

// Header componenent interface - passing ipAddress to "HomePage" component so "Map" component can use it
interface HeaderProps {
  setIPAddress: (setIPAddress: IPAddressInterface | undefined) => void;
}

const Header: React.FC<HeaderProps> = ({ setIPAddress }) => {
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [ipAddress, setIpAddress] = useState<IPAddressInterface | undefined>(
    undefined
  );

  // getting value from input field
  const handleInput = (e: React.SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;
    setInput(target.value);
  };

  // if an user presses "Enter"
  const handleEnterPress = (e: React.KeyboardEvent): void => {
    let key = e.key;
    if (key === "Enter") {
      handleSearch(e);
    }
  };

  // handle what to do when user search for an IP Address or domain
  const handleSearch = async (e: React.SyntheticEvent) => {
    setLoading(true);
    try {
      // if there is no IP address in input field
      if (input === "") {
        throw new Error("No Entry Data");
      }
      // API Request for IP address
      const response = await axios.get(`http://ip-api.com/json/${input}`);
      // If there are no records for specific IP Address
      if (response.data.status === "fail") {
        setIPAddress(undefined);
        throw new Error("Invalid Query");
      }
      // Setting up IP Address if API responded with "success"
      if (response.data.status === "success") {
        setIpAddress(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // passing object to parent component every time user sends new request
  useEffect(() => {
    setIPAddress(ipAddress);
  }, [ipAddress]);

  return (
    <>
      <div className="relative z-10">
        <img
          src={bgimage}
          alt="Background"
          className="w-full h-72 object-cover"
        />
        <div className="absolute top-0 left-1/2 translate-x-[-50%] w-full flex items-center justify-center">
          <h1 className="lg:text-4xl text-2xl text-white font-medium lg:pt-8 pt-3">
            IP Address Tracker
          </h1>
        </div>
        <div className="absolute lg:top-[40%] top-[20%] left-1/2 translate-x-[-50%] xl:w-1/3 lg:w-1/2 w-3/4">
          <label htmlFor="search" className="relative flex">
            <input
              id="search"
              placeholder="Search for any IP Address or Domain"
              type="text"
              className="w-full pt-3 pb-3 pr-6 pl-6 rounded-tl-lg rounded-bl-lg"
              onChange={handleInput}
              onKeyDown={handleEnterPress}
            ></input>
            <button
              className="pl-4 pr-4 bg-black rounded-tr-lg rounded-br-lg"
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                className="h-5 w-5 fill-white"
              >
                <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
              </svg>
            </button>
          </label>
        </div>
        <Informations isLoading={loading} ipAddress={ipAddress}></Informations>
      </div>
    </>
  );
};

export default Header;
