import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => (
  <div className="text-center">
    <h4 className="mb-4 mt-5">Sorry, this page isn&apos;t available.</h4>
    <span>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      The link you followed may be broken, or the page may have been removed. <Link className="text-grey" to="/">Go back to Instagram.</Link>
    </span>
  </div>
);

export default NoMatch;
