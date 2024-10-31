import React, { useState } from 'react';
import { ShoppingCart, Plus, X } from 'lucide-react';
import { Compra } from '../types';

interface ComprasListProps {
  compras: Compra[];
  onNuevaCompra: (compra: Omit<Compra, 'id'>) => void;
}

const ComprasList: React.FC<ComprasListProps> = ({ compras, onNuevaCompra }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    proveedor: '',
    productos: [],
    total: 0,
    estado: 'pendiente' as Compra['estado'],
    fechaEntrega: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNuevaCompra({
      ...formData,
      fecha: new Date().toISOString()
    });
    setShowForm(false);
    setFormData({
      proveedor: '',
      productos: [],
      total: 0,
      estado: 'pendiente',
      fechaEntrega: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Órdenes de Compra</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nueva Orden
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {compras.map((compra) => (
          <div key={compra.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{compra.proveedor}</h3>
                <p className="text-sm text-gray-500">Orden #{compra.id}</p>
              </div>
              <ShoppingCart className="h-6 w-6 text-blue-500" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Fecha:</span>
                <span>{new Date(compra.fecha).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Entrega:</span>
                <span>{new Date(compra.fechaEntrega).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total:</span>
                <span className="font-semibold">${compra.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                compra.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                compra.estado === 'aprobada' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {compra.estado.charAt(0).toUpperCase() + compra.estado.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Nueva Orden de Compra</h3>
              <button onClick={() => setShowForm(false)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Proveedor</label>
                <input
                  type="text"
                  value={formData.proveedor}
                  onChange={e => setFormData(prev => ({ ...prev, proveedor: e.target.value }))}
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Total</label>
                <input
                  type="number"
                  value={formData.total}
                  onChange={e => setFormData(prev => ({ ...prev, total: Number(e.target.value) }))}
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha de Entrega</label>
                <input
                  type="date"
                  value={formData.fechaEntrega}
                  onChange={e => setFormData(prev => ({ ...prev, fechaEntrega: e.target.value }))}
                  className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Crear Orden
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComprasList;