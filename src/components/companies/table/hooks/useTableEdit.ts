
import { useState } from 'react';
import { Company } from '../../../../types/company';
import { useCompanies } from '../../../../contexts/CompanyContext';

export const useTableEdit = () => {
  const { updateCompany } = useCompanies();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Company>>({});
  const [saving, setSaving] = useState(false);

  const handleEdit = (company: Company) => {
    console.log('Iniciando edição da empresa:', company);
    setEditingId(company.id);
    setEditData({ ...company });
  };

  const handleSave = async () => {
    if (!editingId || !editData) return;
    
    console.log('Salvando dados:', { editingId, editData });
    setSaving(true);
    
    try {
      await updateCompany(editingId, editData);
      setEditingId(null);
      setEditData({});
      console.log('Dados salvos com sucesso');
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    console.log('Cancelando edição');
    setEditingId(null);
    setEditData({});
  };

  return {
    editingId,
    editData,
    saving,
    setEditData,
    handleEdit,
    handleSave,
    handleCancel
  };
};
