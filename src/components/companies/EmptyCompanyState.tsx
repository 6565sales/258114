
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EmptyCompanyStateProps {
  canCreate: boolean;
  onCreateCompany: () => void;
}

export const EmptyCompanyState = ({ canCreate, onCreateCompany }: EmptyCompanyStateProps) => {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <p className="text-gray-500">Nenhuma empresa encontrada.</p>
        {canCreate && (
          <Button onClick={onCreateCompany} className="mt-4">
            Criar Sua Primeira Empresa
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
