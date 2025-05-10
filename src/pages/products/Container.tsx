import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="container-product mx-auto p-0 md:p-6">
      <div className="flex flex-col lg:flex-row">{children}</div>
    </div>
  );
};

export default Container;
