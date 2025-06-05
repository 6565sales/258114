
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCompanies } from '../../contexts/CompanyContext';
import { Company } from '../../types/company';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Save, X, Trash2 } from 'lucide-react';

interface CompanyTableProps {
  companies: Company[];
  onDelete: (id: string) => void;
}

export const CompanyTable = ({ companies, onDelete }: CompanyTableProps) => {
  const { user } = useAuth();
  const { updateCompany } = useCompanies();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Company>>({});

  const canEdit = user?.role === 'root' || user?.role === 'manager';

  const handleEdit = (company: Company) => {
    setEditingId(company.id);
    setEditData({ ...company });
  };

  const handleSave = () => {
    if (editingId && editData) {
      updateCompany(editingId, editData);
      setEditingId(null);
      setEditData({});
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta empresa?')) {
      onDelete(id);
    }
  };

  const getComplexityColor = (complexity?: string) => {
    switch (complexity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getClientClassColor = (clientClass?: string) => {
    switch (clientClass) {
      case 'Diamond': return 'bg-purple-100 text-purple-800';
      case 'VIP': return 'bg-blue-100 text-blue-800';
      case 'Executive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Empresa</TableHead>
            <TableHead>CNPJ</TableHead>
            <TableHead>Segmento</TableHead>
            <TableHead>Responsável Fiscal</TableHead>
            <TableHead>Regime Tributário</TableHead>
            {canEdit && <TableHead>Complexidade</TableHead>}
            {canEdit && <TableHead>Classe</TableHead>}
            {canEdit && <TableHead className="text-right">Ações</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id} className="hover:bg-gray-50">
              <TableCell className="font-medium">
                {editingId === company.id ? (
                  <Input
                    value={editData.name || ''}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full"
                  />
                ) : (
                  company.name
                )}
              </TableCell>
              
              <TableCell>
                {editingId === company.id ? (
                  <Input
                    value={editData.taxId || ''}
                    onChange={(e) => setEditData({ ...editData, taxId: e.target.value })}
                    placeholder="00.000.000/0000-00"
                    className="w-full"
                  />
                ) : (
                  company.taxId
                )}
              </TableCell>
              
              <TableCell>
                {editingId === company.id ? (
                  <Input
                    value={editData.segment || ''}
                    onChange={(e) => setEditData({ ...editData, segment: e.target.value })}
                    className="w-full"
                  />
                ) : (
                  company.segment || '-'
                )}
              </TableCell>
              
              <TableCell>
                {editingId === company.id ? (
                  <Input
                    value={editData.sectorResponsibles?.fiscal || ''}
                    onChange={(e) => setEditData({ 
                      ...editData, 
                      sectorResponsibles: { 
                        ...editData.sectorResponsibles, 
                        fiscal: e.target.value 
                      } 
                    })}
                    className="w-full"
                  />
                ) : (
                  company.sectorResponsibles?.fiscal || '-'
                )}
              </TableCell>
              
              <TableCell>
                {editingId === company.id ? (
                  <Select
                    value={editData.taxRegime || ''}
                    onValueChange={(value) => setEditData({ ...editData, taxRegime: value as any })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Simples Nacional">Simples Nacional</SelectItem>
                      <SelectItem value="Lucro Presumido">Lucro Presumido</SelectItem>
                      <SelectItem value="Lucro Real">Lucro Real</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant="secondary">{company.taxRegime}</Badge>
                )}
              </TableCell>
              
              {canEdit && (
                <TableCell>
                  {editingId === company.id ? (
                    <Select
                      value={editData.complexityLevel || ''}
                      onValueChange={(value) => setEditData({ ...editData, complexityLevel: value as any })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Baixa</SelectItem>
                        <SelectItem value="Medium">Média</SelectItem>
                        <SelectItem value="High">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    company.complexityLevel ? (
                      <Badge className={getComplexityColor(company.complexityLevel)}>
                        {company.complexityLevel === 'Low' ? 'Baixa' : 
                         company.complexityLevel === 'Medium' ? 'Média' : 'Alta'}
                      </Badge>
                    ) : '-'
                  )}
                </TableCell>
              )}
              
              {canEdit && (
                <TableCell>
                  {editingId === company.id ? (
                    <Select
                      value={editData.clientClass || ''}
                      onValueChange={(value) => setEditData({ ...editData, clientClass: value as any })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Executive">Executivo</SelectItem>
                        <SelectItem value="VIP">VIP</SelectItem>
                        <SelectItem value="Diamond">Diamante</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    company.clientClass ? (
                      <Badge className={getClientClassColor(company.clientClass)}>
                        {company.clientClass === 'Executive' ? 'Executivo' : 
                         company.clientClass === 'VIP' ? 'VIP' : 'Diamante'}
                      </Badge>
                    ) : '-'
                  )}
                </TableCell>
              )}
              
              {canEdit && (
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    {editingId === company.id ? (
                      <>
                        <Button size="sm" onClick={handleSave} className="h-8 w-8 p-0">
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancel} className="h-8 w-8 p-0">
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="outline" onClick={() => handleEdit(company)} className="h-8 w-8 p-0">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        {user?.role === 'root' && (
                          <Button size="sm" variant="destructive" onClick={() => handleDelete(company.id)} className="h-8 w-8 p-0">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
