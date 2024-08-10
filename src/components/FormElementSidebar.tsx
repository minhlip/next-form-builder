import React from 'react';
import SidebarBtnElement from './SidebarBtnElement';
import { FormElements } from './FormElement';

const FormElementSidebar = () => {
  return (
    <div>
      {' '}
      Element
      <SidebarBtnElement formElement={FormElements.TextField} />
    </div>
  );
};

export default FormElementSidebar;
