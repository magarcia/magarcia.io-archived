import React from 'react';

export default ({ height, width, fill }) => (
  <svg
    className="feather feather-rss"
    height={height}
    width={width}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>rss</title>
    <g fill="none" stroke={fill} strokeLinecap="round" strokeWidth="2">
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" />
    </g>
  </svg>
);
