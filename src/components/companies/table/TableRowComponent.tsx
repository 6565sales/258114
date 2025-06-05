
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Company } from '../../../types/company';
import { Column } from './utils/columnConfig';
import { CellRenderer } from './CellRenderer';
import { EditActions } from './EditActions';

interface TableRowComponentProps {
  company: Company;
  columns: Column[];
  canEdit: boolean;
  editingId: string | null;
  saving?: boolean;
  editData: Partial<Company>;
  setEditData: (data: Partial<Company>) => void;
  onEdit: (company: Company) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
}

export const TableRowComponent = ({
  company,
  columns,
  canEdit,
  editingId,
  saving = false,
  editData,
  setEditData,
  onEdit,
  onSave,
  onCancel,
  onDelete
}: TableRowComponentProps) => {
  const isEditing = editingId === company.id;

  return (
    <TableRow 
      className="hover:bg-gray-50 border-b border-gray-100"
      onDoubleClick={() => canEdit && !saving && onEdit(company)}
    >
      {columns.map((column) => (
        <TableCell
          key={`${company.id}-${column.key}`}
          className="p-2 border-r border-gray-100 last:border-r-0"
          style={{ width: column.width, minWidth: column.width }}
        >
          <CellRenderer
            company={company}
            column={column}
            isEditing={isEditing}
            editData={editData}
            setEditData={setEditData}
          />
        </TableCell>
      ))}
      {canEdit && (
        <TableCell className="p-2 text-center">
          <EditActions
            company={company}
            editingId={editingId}
            saving={saving}
            onEdit={onEdit}
            onSave={onSave}
            onCancel={onCancel}
            onDelete={onDelete}
          />
        </TableCell>
      )}
    </TableRow>
  );
};
