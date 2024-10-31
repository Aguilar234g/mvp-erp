import React, { useState } from 'react';
import { FileText, DollarSign, Calendar, Plus, Search, Filter, Download } from 'lucide-react';
import { Factura } from '../types';
import NuevaFactura from './NuevaFactura';

interface FacturacionListProps {
  facturas: Factura[];
  onNuevaFactura: (factura: Omit<Factura, 'id'>) => void;
}

const FacturacionList: React.FC<FacturacionListProps> = ({ facturas, onNuevaFactura }) => {
  const [showNuevaFactura, setShowNuevaFactura] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState<string>('');
  const [busqueda, setBusqueda] = useState('');

  const facturasFiltradas = facturas.filter(factura => {
    const cumpleBusqueda = 
      factura.numero.toLowerCase().includes(busqueda.toLowerCase()) ||
      String(factura.total).includes(busqueda);
    const cumpleEstado = !filtroEstado || factura.estado === filtroEstado;
    return cumpleBusqueda && cumpleEstado;
  });

  const totalFacturado = facturasFiltradas.reduce((sum, factura) => sum + factura.total, 0);
  const totalPendiente = facturasFiltradas
    .filter(f => f.estado === 'pendiente')
    .reduce((sum, factura) => sum + factura.total, 0);

  const getEstadoColor = (estado: string) => {
    const colores = {
      pendiente: 'bg-yellow-100 text-yellow-800',
      pagada: 'bg-green-100 text-green-800',
      vencida: 'bg-red-100 text-red-800',
      anulada: 'bg-gray-100 text-gray-800'
    };
    return colores[estado as keyof typeof colores] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header y Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Facturado</p>
              <p className="text-2xl font-bold text-gray-900">${totalFacturado.toFixed(2)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pendiente de Cobro</p>
              <p className="text-2xl font-bold text-gray-900">${totalPendiente.toFixed(2)}</p>
            </div>
            <Calendar className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Facturas Emitidas</p>
              <p className="text-2xl font-bold text-gray-900">{facturas.length}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar facturas..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="pagada">Pagada</option>
            <option value="vencida">Vencida</option>
            <option value="anulada">Anulada</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowNuevaFactura(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nueva Factura
          </button>
        </div>
      </div>

      {/* Lista de Facturas */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Número
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vencimiento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {facturasFiltradas.map((factura) => (
                <tr key={factura.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{factura.numero}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Cliente #{factura.clienteId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(factura.fecha).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(factura.fechaVencimiento).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${factura.total.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoColor(factura.estado)}`}>
                      {factura.estado.charAt(0).toUpperCase() + factura.estado.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => {/* Implementar vista/descarga */}}
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showNuevaFactura && (
        <NuevaFactura
          onClose={() => setShowNuevaFactura(false)}
          onSubmit={onNuevaFactura}
        />
      )}
    </div>
  );
};

export default FacturacionList;