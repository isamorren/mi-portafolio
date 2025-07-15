import React from 'react';

const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-[#6667AB] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E4C7D6]"
    >
      Saltar al contenido principal
    </a>
  );
};

export default SkipToContent;