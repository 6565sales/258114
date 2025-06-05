
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface BillingGroupManagementProps {
  onClose: () => void;
}

export const BillingGroupManagement = ({ onClose }: BillingGroupManagementProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-gray-500">Funcionalidade de grupos de cobrança foi removida do sistema.</p>
        </CardContent>
      </Card>
    </div>
  );
};
