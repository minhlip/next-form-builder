'use client';

import { Text } from 'lucide-react';
import { ElementsType, FormElement, FormElementInstance } from '../FormElement';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

const type: ElementsType = 'TextField';

const extraAttributes = {
  label: 'Text field',
  helperText: 'Helper text',
  required: false,
  placeHolder: 'value here...',
};

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: Text,
    label: 'Text Field',
  },
  designerComponent: DesignerComponent,
  formComponent: () => <div>Form Component</div>,
  propertiesComponent: () => <div>Properties Component</div>,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, helperText, required, placeHolder } = element.extraAttributes;
  return (
    <div className="flex flex-col w-full gap-4">
      <Label>
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <Input readOnly disabled placeholder={placeHolder} />
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
}
