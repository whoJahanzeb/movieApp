import React from "react";
import { Spinner } from "flowbite-react";
const Loader = () => {
  return (
    <Spinner
      aria-label="Default status example"
      className="text-white h-16 w-16"
    />
  );
};

export default Loader;
