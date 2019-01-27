import React from 'react';

export default ({ height, width, fill }) => (
  <svg
    className="feather feather-share"
    height={height}
    width={width}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>share</title>
    <g fill="none" stroke={fill} strokeLinecap="round" strokeWidth="2">
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M16 6l-4-4-4 4" />
      <path d="M12 2v13" />
    </g>
  </svg>
);
