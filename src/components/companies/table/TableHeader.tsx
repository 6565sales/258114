
import React from 'react';
import { TableHead, TableHeader as TableHeaderUI, TableRow } from '@/components/ui/table';
import { GripVertical } from 'lucide-react';
import { Column } from './utils/columnConfig';

interface TableHeaderProps {
  columns: Column[];
  canReorderColumns: boolean;
  canEdit: boolean;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, index: number) => void;
  onResizeStart?: (e: React.MouseEvent, index: number) => void;
}

export const TableHeaderComponent = ({ 
  columns, 
  canReorderColumns, 
  canEdit, 
  onDragStart, 
  onDragOver, 
  onDrop,
  onResizeStart
}: TableHeaderProps) => {
  return (
    <TableHeaderUI>
      <TableRow className="bg-gray-100">
        {columns.map((column, index) => (
          <TableHead
            key={column.key}
            className={`relative border-r border-gray-200 last:border-r-0 ${canReorderColumns ? 'cursor-move' : ''}`}
            style={{ width: column.width, minWidth: column.width }}
            draggable={canReorderColumns}
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, index)}
          >
            <div className="flex items-center justify-between pr-2">
              <div className="flex items-center space-x-2">
                {canReorderColumns && <GripVertical className="w-3 h-3 text-gray-400" />}
                <span className="font-semibold text-xs uppercase tracking-wide">
                  {column.label}
                </span>
              </div>
              
              {/* Resize handle - área maior e mais visível */}
              <div
                className="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-blue-400 transition-colors group"
                onMouseDown={(e) => onResizeStart?.(e, index)}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-0.5 h-4 bg-gray-300 group-hover:bg-blue-500 transition-colors"></div>
                </div>
              </div>
            </div>
          </TableHead>
        ))}
        {canEdit && (
          <TableHead className="w-24 text-center">Ações</TableHead>
        )}
      </TableRow>
    </TableHeaderUI>
  );
};
