import React, { ReactNode } from "react";

interface InformationItemCardProps {
  children: ReactNode;
  heading: string;
}

const InformationItemCard: React.FC<InformationItemCardProps> = ({
  children,
  heading,
}) => {
  return (
    <div className="pl-4 pr-4 flex flex-col lg:items-start items-center gap-2 lg:border-r-2 lg:border-lightGray">
      <h2 className="text-xs text-darkGray font-medium tracking-widest">
        {heading}
      </h2>
      {children}
    </div>
  );
};

export default InformationItemCard;
