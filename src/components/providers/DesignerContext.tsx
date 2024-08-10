'use client';

import { createContext, Dispatch, SetStateAction, useState } from 'react';
import { FormElementInstance } from '../FormElement';

type DesignerContexType = {
  elements: FormElementInstance[];
  addElements: (index: number, elements: FormElementInstance) => void;
  removeElement: (id: string) => void;
  selectedElement: FormElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;
  updateElement: (id: string, element: FormElementInstance) => void;
};

export const DesignerContex = createContext<DesignerContexType | null>(null);

export default function DesignerContexProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null);

  const addElements = (index: number, elements: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, elements);
      return newElements;
    });
  };

  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  };

  const updateElement = (id: string, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      const index = newElements.findIndex((el) => el.id === id);
      newElements[index] = element;
      console.log('newElements', newElements);
      return newElements;
    });
  };

  return (
    <DesignerContex.Provider
      value={{
        selectedElement,
        setSelectedElement,
        removeElement,
        elements,
        addElements,
        updateElement,
      }}
    >
      {children}
    </DesignerContex.Provider>
  );
}
