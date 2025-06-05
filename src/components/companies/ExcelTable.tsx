
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableFooter } from '@/components/ui/table';
import { TableHeaderComponent } from './table/TableHeader';
import { TableRowComponent } from './table/TableRowComponent';
import { useAuth } from '../../contexts/AuthContext';
import { useTableFilters } from './table/hooks/useTableFilters';
import { useTableEdit } from './table/hooks/useTableEdit';
import { Column, getVisibleColumns } from './table/utils/columnConfig';
import { TableFilters } from './table/TableFilters';
import { TableFooterComponent } from './table/TableFooter';

interface ExcelTableProps {
  companies: any[];
  onDelete: (id: string) => void;
}

export const ExcelTable = ({ companies, onDelete }: ExcelTableProps) => {
  const { user } = useAuth();
  const { filteredCompanies, filters, setFilters } = useTableFilters(companies);
  const { editingId, editData, saving, setEditData, handleEdit, handleSave, handleCancel } = useTableEdit();
  const [visibleColumns, setVisibleColumns] = useState<Column[]>([]);

  // Calcular colunas visíveis baseado no papel do usuário
  useEffect(() => {
    const columns = getVisibleColumns(user?.role || '', user?.sector);
    setVisibleColumns(columns);
  }, [user?.role, user?.sector]);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [tableWidths, setTableWidths] = useState<string[]>([]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const reorderedColumns = [...visibleColumns];
    const draggedColumn = reorderedColumns[draggedIndex];
    reorderedColumns.splice(draggedIndex, 1);
    reorderedColumns.splice(targetIndex, 0, draggedColumn);

    setVisibleColumns(reorderedColumns);
    setDraggedIndex(null);
  };

  const handleResizeStart = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    const startX = e.clientX;
    const initialWidth = parseInt(visibleColumns[index].width || '100', 10);

    const handleResizeMove = (moveEvent: MouseEvent) => {
      const width = initialWidth + (moveEvent.clientX - startX);
      const newWidths = [...tableWidths];
      newWidths[index] = `${width}px`;
      setTableWidths(newWidths);
    };

    const handleResizeStop = () => {
      window.removeEventListener('mousemove', handleResizeMove);
      window.removeEventListener('mouseup', handleResizeStop);

      const updatedColumns = visibleColumns.map((col, i) =>
        i === index ? { ...col, width: tableWidths[i] } : col
      );
      setVisibleColumns(updatedColumns);
    };

    window.addEventListener('mousemove', handleResizeMove);
    window.addEventListener('mouseup', handleResizeStop);
  };

  const canEdit = user?.role === 'root' || user?.role === 'manager';

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <TableFilters 
          onFiltersChange={setFilters}
          companies={companies}
          filteredCompanies={filteredCompanies}
        />
      </div>

      <div className="flex-1 overflow-auto">
        <Table className="min-w-full">
          <TableHeaderComponent
            columns={visibleColumns}
            canReorderColumns={user?.role === 'root'}
            canEdit={canEdit}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onResizeStart={handleResizeStart}
          />
          
          <TableBody>
            {filteredCompanies.map((company) => (
              <TableRowComponent
                key={company.id}
                company={company}
                columns={visibleColumns}
                editingId={editingId}
                saving={saving}
                editData={editData}
                setEditData={setEditData}
                canEdit={canEdit}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
                onDelete={onDelete}
              />
            ))}
          </TableBody>
          
          <TableFooterComponent
            companies={filteredCompanies} 
            columns={visibleColumns}
            canEdit={canEdit}
          />
        </Table>
      </div>
    </div>
  );
};
