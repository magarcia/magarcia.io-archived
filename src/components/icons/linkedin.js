import React from 'react';

export default ({ height, width, fill, title }) => (
  <svg
    className="feather feather-linkedin"
    height={height}
    width={width}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{title}</title>
    <g fill="none" stroke={fill} strokeLinecap="round" strokeWidth="2">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <path d="M2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </g>
  </svg>
);
