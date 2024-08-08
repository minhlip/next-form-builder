import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React from 'react';
import { SidebarBtnElementDragOverlay } from './SidebarBtnElement';
import { ElementsType, FormElements } from './FormElement';
import useDesigner from '@/hooks/useDesigner';

const DragOverlayWrapper = () => {
  const [draggedItem, setDraggedItem] = React.useState<Active | null>(null);

  const { elements } = useDesigner();

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
      console.log('DRAG ITEM', event);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let node = <div>No drag Overlay</div>;
  const isSidebarBtnElement = draggedItem?.data?.current?.isDesignerBtnElement;

  if (isSidebarBtnElement) {
    const type = draggedItem?.data?.current?.type as ElementsType;
    node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />;
  }

  const isDesignerElemt = draggedItem?.data?.current?.isDesignerElement;

  if (isDesignerElemt) {
    const elementId = draggedItem?.data?.current?.elementId;
    const element = elements.find((el) => el.id === elementId);
    if (!element) {
      return <div>Element not found</div>;
    } else {
      const DesignerElementComponent =
        FormElements[element.type].designerComponent;
      node = (
        <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80 pointer-events-none">
          <DesignerElementComponent elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
