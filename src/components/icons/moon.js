import React from 'react';

export default ({ height, width, fill, title }) => (
  <svg
    className="feather feather-moon"
    height={height}
    width={width}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{title}</title>
    <g fill="none" stroke={fill} strokeLinecap="round" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </g>
  </svg>
);
