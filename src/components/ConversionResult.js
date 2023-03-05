import React from "react";
import { useSelector } from "react-redux";

function ConversionResult() {
  const { romanNumber } = useSelector((state) => state?.conversion);

  return <div>{romanNumber}</div>;
}

export default ConversionResult;
