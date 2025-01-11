import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableGameWrapperProps {
  id: number;
  isEditing?: boolean;
  children: React.ReactNode;
}

export const SortableGameWrapper: React.FC<SortableGameWrapperProps> = ({
  id,
  isEditing,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: String(id),
    disabled: !isEditing,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isEditing ? 'grab' : 'pointer',
    touchAction: 'none',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};
