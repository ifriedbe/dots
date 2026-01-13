
import React from 'react';

interface HeaderProps {
  title: string;
  percentage: string;
}

const Header: React.FC<HeaderProps> = ({ title, percentage }) => {
  const [whole, decimal] = percentage.split('.');

  return (
    <div className="w-full flex justify-between items-end mb-4 px-2 sm:px-10">
      <div className="flex flex-col">
        <h1 className="text-2xl sm:text-4xl font-light tracking-[0.2em] text-white/95 uppercase">
          {title}
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-white/40 to-transparent mt-2" />
      </div>
      <div className="text-3xl sm:text-5xl font-extralight text-white/90 tabular-nums">
        <span>{whole}</span>
        <span className="text-lg sm:text-2xl text-white/40">.{decimal}</span>
        <span className="text-lg sm:text-2xl ml-1 text-white/20">%</span>
      </div>
    </div>
  );
};

export default Header;
