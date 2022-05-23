import React, { useState } from "react";
import Header, { IPAddressInterface } from "../components/Header";
import Map from "../components/Map";

const HomePage = () => {
  const [ipAddress, setIPAddress] = useState<IPAddressInterface | undefined>(
    undefined
  );

  return (
    <>
      <header></header>
      <main className="h-screen font-sans">
        <Header setIPAddress={setIPAddress}></Header>
        <Map ipAddress={ipAddress}></Map>
      </main>
      <footer></footer>
    </>
  );
};

export default HomePage;
