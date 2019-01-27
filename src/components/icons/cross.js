import React from 'react';

export default ({ height, width, fill }) => (
  <svg
    className="feather feather-x"
    height={height}
    width={width}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>cross</title>
    <g fill="none" stroke={fill} strokeLinecap="round" strokeWidth="2">
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </g>
  </svg>
);
