import React from "react";
import { IPAddressInterface } from "./Header";

interface InformationsProps {
  ipAddress?: IPAddressInterface;
  isLoading: boolean;
}

const Informations: React.FC<InformationsProps> = ({
  ipAddress,
  isLoading,
}) => {
  const location = `${ipAddress?.city}, ${ipAddress?.countryCode} ${ipAddress?.zip}`;

  return (
    <>
      <div className="absolute left-1/2 translate-y-[-50%] translate-x-[-50%] bg-white rounded-lg shadow-md w-3/4">
        <div className="md:p-8 p-6">
          <div className="grid lg:grid-cols-4 grid-flow-row md:gap-18 gap-4">
            <div className="flex flex-col lg:items-start items-center gap-2">
              <h2 className="text-xs text-darkGray font-medium tracking-widest">
                IP ADDRESS
              </h2>
              <h3 className="lg:text-2xl text-xl font-medium">
                {isLoading ? (
                  <span>Loading...</span>
                ) : (
                  ipAddress?.query || <span>Enter valid IP</span>
                )}
              </h3>
            </div>
            <div className="flex flex-col lg:items-start items-center gap-2">
              <h2 className="text-xs text-darkGray font-medium tracking-widest">
                LOCATION
              </h2>
              <h3 className="lg:text-2xl text-xl font-medium">
                {!ipAddress?.city || isLoading ? "" : location}
              </h3>
            </div>
            <div className="flex flex-col lg:items-start items-center gap-2">
              <h2 className="text-xs text-darkGray font-medium tracking-widest">
                TIMEZONE
              </h2>
              <h3 className="lg:text-2xl text-xl font-medium">
                {isLoading ? "" : ipAddress?.timezone}
              </h3>
            </div>
            <div className="flex flex-col lg:items-start items-center gap-2">
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
