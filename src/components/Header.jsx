import React from 'react';

const Header = () => {
  return (
    <div className="bg-gradient-to-b from-yellow-400 to-amber-500 text-gray-900 p-4 relative overflow-hidden">
      {/* Beer Bubbles Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-30 animate-bounce"
            style={{
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 80 + 10}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${Math.random() * 2 + 3}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10">
        <h1 className="text-lg sm:text-2xl font-bold text-center drop-shadow-md">
          BEERMINTON SPORTSDAY 2025
        </h1>
        <p className="text-center text-xs sm:text-sm mt-1 drop-shadow">
          Saturday 15 November 2025 at Guy Badminton
        </p>
      </div>
    </div>
  );
};

export default Header;