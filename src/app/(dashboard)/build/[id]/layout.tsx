import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex w-full flex-grow mx-auto">{children}</section>
  );
};

export default layout;
