'use client';

import { Text } from 'lucide-react';
import { ElementsType, FormElement } from '../FormElement';

const type: ElementsType = 'TextField';

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: 'Text field',
      helperText: 'Helper text',
      required: false,
      placeHolder: 'value here...',
    },
  }),
  designerBtnElement: {
    icon: Text,
    label: 'Text Field',
  },
  designerComponent: () => <div className="text-white">Designer component</div>,
  formComponent: () => <div>Form Component</div>,
  propertiesComponent: () => <div>Properties Component</div>,
};
