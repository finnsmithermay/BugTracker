import React, { Fragment } from "react";
import spinner from "./Spinner3.gif";
import { FaSpinner } from "react-icons/fa";

export default () => (
  <Fragment>
    {/* <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    /> */}
    {window.innerWidth > 900 ? (
      <img
        src={spinner}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    ) : null}
  </Fragment>
);
