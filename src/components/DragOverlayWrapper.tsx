import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React from 'react';
import { SidebarBtnElementDragOverlay } from './SidebarBtnElement';
import { ElementsType, FormElements } from './FormElement';

const DragOverlayWrapper = () => {
  const [draggedItem, setDraggedItem] = React.useState<Active | null>(null);

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
  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
