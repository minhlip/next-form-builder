'use client';

import { DesignerContex } from '@/components/providers/DesignerContext';
import React, { useContext } from 'react';

const useDesigner = () => {
  const context = useContext(DesignerContex);

  if (!context) {
    throw new Error(
      'useDesigner must be used within a DesignerContextProvider'
    );
  }

  return context;
};

export default useDesigner;
