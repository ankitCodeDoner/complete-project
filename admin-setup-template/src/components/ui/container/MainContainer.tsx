import React from "react";

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-1 h-full overflow-auto">{children}</div>;
};

export default MainContainer;
