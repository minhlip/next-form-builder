'use client';

import { createContext, useState } from 'react';
import { FormElementInstance } from '../FormElement';

type DesignerContexType = {
  elements: FormElementInstance[];
  addElements: (index: number, elements: FormElementInstance) => void;
};

export const DesignerContex = createContext<DesignerContexType | null>(null);

export default function DesignerContexProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);

  const addElements = (index: number, elements: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, elements);
      return newElements;
    });
  };

  return (
    <DesignerContex.Provider
      value={{
        elements,
        addElements,
      }}
    >
      {children}
    </DesignerContex.Provider>
  );
}
