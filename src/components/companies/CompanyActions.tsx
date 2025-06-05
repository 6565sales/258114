
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Company } from '../../types/company';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface CompanyActionsProps {
  company: Company;
  onEdit: (company: Company) => void;
  onDelete: (id: string) => void;
}

export const CompanyActions = ({ company, onEdit, onDelete }: CompanyActionsProps) => {
  const { user } = useAuth();

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir esta empresa?')) {
      onDelete(company.id);
    }
  };

  return (
    <div className="flex space-x-2 ml-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onEdit(company)}
        className="flex items-center space-x-1"
      >
        <Edit className="w-4 h-4" />
        <span>Editar</span>
      </Button>
      {user?.role === 'root' && (
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          className="flex items-center space-x-1"
        >
          <Trash2 className="w-4 h-4" />
          <span>Excluir</span>
        </Button>
      )}
    </div>
  );
};
