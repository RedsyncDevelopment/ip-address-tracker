import axios from "axios";
import { useState } from "react";
import Header, { IPAddressInterface } from "../components/Header";
import Informations from "../components/Informations";
import Map from "../components/Map";

const HomePage = () => {
  const ipKey = process.env.REACT_APP_IP_API_KEY;
  const [ipAddress, setIpAddress] = useState<IPAddressInterface | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSearchHandler = async (input: string) => {
    setIsLoading(true);
    try {
      // if there is no IP address in input field
      if (input === "") {
        throw new Error("No Entry Data");
      }
      // API Request for IP address
      const response = await axios.get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${ipKey}&domain=${input}&ipAddress=${input}`
      );
      // Setting up IP Address if API responded with "success"
      setIpAddress(response.data);
      // passing ipAddress to parent
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header></header>
      <main className="h-screen font-sans relative">
        <Header onSearch={onSearchHandler} />
        <Informations ipAddress={ipAddress} isLoading={isLoading} />
        <Map ipAddress={ipAddress} />
      </main>
      <footer></footer>
    </>
  );
};

export default HomePage;
