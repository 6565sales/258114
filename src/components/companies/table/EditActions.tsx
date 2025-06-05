
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit2, Save, X, Trash2, Loader2 } from 'lucide-react';
import { Company } from '../../../types/company';
import { useAuth } from '../../../contexts/AuthContext';

interface EditActionsProps {
  company: Company;
  editingId: string | null;
  saving?: boolean;
  onEdit: (company: Company) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: (id: string) => void;
}

export const EditActions = ({ 
  company, 
  editingId, 
  saving = false,
  onEdit, 
  onSave, 
  onCancel, 
  onDelete 
}: EditActionsProps) => {
  const { user } = useAuth();

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir esta empresa?')) {
      onDelete(company.id);
    }
  };

  return (
    <div className="flex justify-center space-x-1">
      {editingId === company.id ? (
        <>
          <Button 
            size="sm" 
            onClick={onSave} 
            disabled={saving}
            className="h-6 w-6 p-0"
          >
            {saving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onCancel}
            disabled={saving}
            className="h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </>
      ) : (
        <>
          <Button size="sm" variant="outline" onClick={() => onEdit(company)} className="h-6 w-6 p-0">
            <Edit2 className="h-3 w-3" />
          </Button>
          {user?.role === 'root' && (
            <Button size="sm" variant="destructive" onClick={handleDelete} className="h-6 w-6 p-0">
              <Trash2 className="h-3 w-3" />
            </Button>
          )}
        </>
      )}
    </div>
  );
};
