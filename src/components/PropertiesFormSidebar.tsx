import useDesigner from '@/hooks/useDesigner';
import React, { useContext } from 'react';
import { FormElements } from './FormElement';
import { Button } from './ui/button';
import { CircleX, X } from 'lucide-react';

const PropertiesFormSidebar = () => {
  const { selectedElement, setSelectedElement } = useDesigner();

  if (!selectedElement) {
    return null;
  }
  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;
  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center ">
        <p className="text-sm text-foreground/70">Element properties</p>
        <Button
          size={'icon'}
          variant={'ghost'}
          onClick={() => setSelectedElement(null)}
          className=""
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
};

export default PropertiesFormSidebar;
