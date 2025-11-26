import React from 'react';

export default function Layout({ children }) {
  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Aubrey&display=swap');
        
        * {
          font-family: 'Aubrey', cursive !important;
        }
      `}</style>
      {children}
    </div>
  );
}