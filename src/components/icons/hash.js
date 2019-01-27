import React from 'react';

export default ({ height, width, fill }) => (
  <svg
    className="feather feather-hash"
    height={height}
    width={width}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>hash</title>
    <g fill="none" stroke={fill} strokeLinecap="round" strokeWidth="2">
      <path d="M4 9h16" />
      <path d="M4 15h16" />
      <path d="M10 3L8 21" />
      <path d="M16 3l-2 18" />
    </g>
  </svg>
);
