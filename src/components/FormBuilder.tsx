'use client';

import { Form } from '@prisma/client';
import React from 'react';
import PreviewDialogBtn from './PreviewDialogBtn';
import PublishFormBtn from './PublishFormBtn';
import SaveFormBtn from './SaveFormBtn';
import { DotBackground } from './DotBackground';
import Designer from './Designer';
import DotPattern from './magicui/dot-pattern';
import { cn } from '@/lib/utils';
import { DndContext } from '@dnd-kit/core';
import DragOverlayWrapper from './DragOverlayWrapper';

const FormBuilder = ({ form }: { form: Form }) => {
  return (
    <DndContext>
      <main className="flex flex-col h-full w-full relative">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormBtn />
                <PublishFormBtn />
              </>
            )}
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto">
          <DotPattern className="absolute inset-0 z-0" />
          <div className="relative z-10 w-full h-full">
            <Designer />
          </div>
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
