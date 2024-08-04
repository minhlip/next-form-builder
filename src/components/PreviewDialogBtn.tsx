import React from 'react';
import { Button } from './ui/button';
import { View } from 'lucide-react';

const PreviewDialogBtn = () => {
  return (
    <Button variant={'outline'} className="gap-2 ">
      <View className="h-6 w-6" />
      Preview
    </Button>
  );
};

export default PreviewDialogBtn;
