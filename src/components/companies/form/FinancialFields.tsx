
import React from 'react';

interface FinancialFieldsProps {
  formData: any;
  setFormData: (data: any) => void;
  billingGroups: any[];
  canEditFinancialFields: boolean;
}

export const FinancialFields = ({ 
  formData, 
  setFormData, 
  billingGroups, 
  canEditFinancialFields 
}: FinancialFieldsProps) => {
  // Componente removido - funcionalidade de grupos de cobrança foi removida
  return null;
};
