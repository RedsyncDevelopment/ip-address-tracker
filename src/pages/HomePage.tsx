import { useState } from "react";
import Header, { IPAddressInterface } from "../components/Header";
import Map from "../components/Map";

const HomePage = () => {
  const [ipAddress, setIpAddress] = useState<IPAddressInterface | undefined>(
    undefined
  );

  const onSearchHandler = (ipAddress: IPAddressInterface | undefined) => {
    setIpAddress(ipAddress);
  };

  return (
    <>
      <header></header>
      <main className="h-screen font-sans">
        <Header onSearch={onSearchHandler}></Header>
        <Map ipAddress={ipAddress}></Map>
      </main>
      <footer></footer>
    </>
  );
};

export default HomePage;
