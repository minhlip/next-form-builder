import React from 'react';
import { Button } from './ui/button';
import { Save } from 'lucide-react';

const SaveFormBtn = () => {
  return (
    <Button className="gap-2" variant={'outline'}>
      <Save className="h-6 w-6" />
      Save
    </Button>
  );
};

export default SaveFormBtn;
