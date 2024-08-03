import { Globe, View } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';

const PublishFormBtn = () => {
  return (
    <Button
      variant={'outline'}
      className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400 "
    >
      <Globe className="h-4 w-4" />
      Publish
    </Button>
  );
};

export default PublishFormBtn;
