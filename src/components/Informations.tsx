import React from "react";
import { IPAddressInterface } from "./Header";
import InformationItemCard from "./UI/InformationItemCard";

interface InformationsProps {
  ipAddress?: IPAddressInterface;
  isLoading: boolean;
}

const Informations: React.FC<InformationsProps> = ({
  ipAddress,
  isLoading,
}) => {
  const location = `${ipAddress?.location.city}, ${ipAddress?.location.country} ${ipAddress?.location.region}`;

  const timezone = `UTC ${ipAddress?.location.timezone}`;

  return (
    <>
      <div className="absolute left-1/2 translate-y-[-50%] translate-x-[-50%] bg-white rounded-lg shadow-md w-3/4">
        <div className="md:p-8 p-6">
          <div className="grid lg:grid-cols-4 grid-flow-row md:gap-18 gap-4">
            <InformationItemCard heading={"IP ADDRESS"}>
              <h3 className="lg:text-2xl text-xl font-medium">
                {isLoading ? "Loading..." : ipAddress?.ip || "Enter valid IP"}
              </h3>
            </InformationItemCard>
            <InformationItemCard heading={"LOCATION"}>
              <h3 className="lg:text-2xl text-xl font-medium">
                {!ipAddress || isLoading ? "" : location}
              </h3>
            </InformationItemCard>
            <InformationItemCard heading={"TIMEZONE"}>
              <h3 className="lg:text-2xl text-xl font-medium">
                {!ipAddress || isLoading ? "" : timezone}
              </h3>
            </InformationItemCard>
            <div className="pl-4 pr-4 flex flex-col lg:items-start items-center gap-2">
              <h2 className="text-xs text-darkGray font-medium tracking-widest">
                ISP
              </h2>
              <h3 className="lg:text-2xl text-xl font-medium">
                {isLoading ? "" : ipAddress?.isp}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Informations;
