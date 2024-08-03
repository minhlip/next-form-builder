import { Loader } from 'lucide-react';
import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Loader className="animate-spin h-10 w-10" />
    </div>
  );
};

export default Loading;
