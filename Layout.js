import React from 'react';

export default function Layout({ children }) {
  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Ribeye&display=swap');
        
        * {
          font-family: 'Ribeye', cursive !important;
        }
      `}</style>
      {children}
    </div>
  );
}