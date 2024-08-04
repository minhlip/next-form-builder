import React, { ElementType } from 'react';
import DesignerSidebar from './DesignerSidebar';
import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';
import { cn, idGenerator } from '@/lib/utils';
import { ElementsType, FormElementInstance, FormElements } from './FormElement';
import useDesigner from '@/hooks/useDesigner';

const Designer = () => {
  const { elements, addElements } = useDesigner();

  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      console.log('DRAG END', event);
      const { active, over } = event;

      if (!active || !over) return;

      const isDesignerBtnElement = active?.data?.current?.isDesignerBtnElement;

      if (isDesignerBtnElement) {
        const type = active?.data?.current?.type;

        const newElements = FormElements[type as ElementsType].construct(
          idGenerator()
        );
        addElements(0, newElements);
        console.log('NEW ELEMENTS', newElements);
      }
    },
  });

  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full ">
        <div
          ref={droppable.setNodeRef}
          className={cn(
            'bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto border-2 border-solid border-slate-300',
            droppable.isOver && ' border-slate-400'
          )}
        >
          {!droppable.isOver && !elements.length && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop here
            </p>
          )}
          {droppable.isOver && (
            <div className="w-full p-4">
              <div className="h-[120px] rounded-md bg-slate-200/20 border-dashed border-2 border-primary/20">
                {}
              </div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col text-background w-full gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSidebar />
    </div>
  );
};

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const { type } = element;
  const DesignerComponent = FormElements[type]
    .designerComponent as React.ElementType;
  return <DesignerComponent />;
}

export default Designer;
