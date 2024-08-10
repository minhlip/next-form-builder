import React from 'react';
import { FormElements } from './FormElement';
import SidebarBtnElement from './SidebarBtnElement';
import useDesigner from '@/hooks/useDesigner';
import FormElementSidebar from './FormElementSidebar';
import PropertiesFormSidebar from './PropertiesFormSidebar';

const DesignerSidebar = () => {
  const { selectedElement, setSelectedElement } = useDesigner();

  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      {selectedElement ? <PropertiesFormSidebar /> : <FormElementSidebar />}
    </aside>
  );
};

export default DesignerSidebar;
