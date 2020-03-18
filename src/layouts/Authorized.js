import React from "react";
import AccountWidget from "../components/AccountWidget/AccountWidget";
import db from "../firebaseDb";

const Authorized = () => {
  return (
    <>
      <AccountWidget />
    </>
  );
};

export default Authorized;
