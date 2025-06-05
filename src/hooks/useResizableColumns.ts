
import { useState, useCallback } from 'react';
import { Column } from '../components/companies/table/utils/columnConfig';

export const useResizableColumns = (initialColumns: Column[]) => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [isResizing, setIsResizing] = useState(false);
  const [resizingColumn, setResizingColumn] = useState<number | null>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent, columnIndex: number) => {
    e.preventDefault();
    setIsResizing(true);
    setResizingColumn(columnIndex);

    const startX = e.clientX;
    const currentWidth = columns[columnIndex].width || '150px';
    const startWidth = parseInt(currentWidth.replace('px', ''));

    const handleMouseMove = (e: MouseEvent) => {
      const diff = e.clientX - startX;
      const newWidth = Math.max(80, startWidth + diff); // Largura mínima de 80px
      
      setColumns(prev => prev.map((col, index) => 
        index === columnIndex 
          ? { ...col, width: `${newWidth}px` }
          : col
      ));
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizingColumn(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [columns]);

  return {
    columns,
    setColumns,
    isResizing,
    resizingColumn,
    handleMouseDown
  };
};
