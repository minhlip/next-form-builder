import React, { ElementType, useState } from 'react';
import DesignerSidebar from './DesignerSidebar';
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import { cn, idGenerator } from '@/lib/utils';
import { ElementsType, FormElementInstance, FormElements } from './FormElement';
import useDesigner from '@/hooks/useDesigner';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';

const Designer = () => {
  const { elements, addElements, setSelectedElement, selectedElement } =
    useDesigner();

  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;

      if (!active || !over) return;

      const isDesignerBtnElement = active?.data?.current?.isDesignerBtnElement;

      if (isDesignerBtnElement) {
        const type = active?.data?.current?.type;

        const newElements = FormElements[type as ElementsType].construct(
          idGenerator()
        );
        addElements(0, newElements);
      }
    },
  });

  console.log(elements);

  return (
    <div className="flex w-full h-full">
      <div
        className="p-4 w-full"
        onClick={() => {
          if (selectedElement) {
            setSelectedElement(null);
          }
        }}
      >
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
          {droppable.isOver && elements.length === 0 && (
            <div className="w-full p-4">
              <div className="h-[120px] rounded-md bg-slate-200/20 border-dashed border-2 border-primary/20">
                {}
              </div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-4">
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
  const draggable = useDraggable({
    id: element.id,
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  const DesignerElement = FormElements[element.type].designerComponent;

  const [isMouseOver, setIsMouseOver] = useState(false);

  const { removeElement, selectedElement, setSelectedElement } = useDesigner();

  const topHalf = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + '-bottom',
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative w-full h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      onClick={(event) => {
        event.stopPropagation();
        setSelectedElement(element);
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className={cn('absolute w-full h-1/2 rounded-t-md')}
      ></div>
      <div
        ref={bottomHalf.setNodeRef}
        className={cn('absolute bottom-0 w-full h-1/2 rounded-b-md')}
      ></div>
      {isMouseOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              className="h-full flex justify-center bg-red-500 !rounded-l-none rounded-md border z-10
              "
              size="icon"
              variant={'outline'}
              onClick={(event) => {
                event.stopPropagation();
                removeElement(element.id);
              }}
            >
              <Trash2 className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute animate-pulse top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <p className="">Click for properties or drag to move</p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-b-none h-[7px] bg-primary " />
      )}
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-t-none h-[7px] bg-white " />
      )}
      <div
        className={cn(
          'flex w-full h-[120px] items-center justify-center border-2 bg-accent/40 px-4 py-2 pointer-events-none border-solid  rounded-md',
          isMouseOver && 'opacity-30'
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  );
}

export default Designer;
